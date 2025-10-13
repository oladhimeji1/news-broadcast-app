import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Share, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { MediaControls } from 'expo-media-controls';

// import { useAudioPlayer } from 'expo-audio';

// Presentational components
import AnnouncementTicker from '@/components/home/AnnouncementTicker';
import BottomPlayer from '@/components/home/BottomPlayer';
import FeaturedPodcasts from '@/components/home/FeaturedPodcasts';
import Header from '@/components/home/Header';
import NowPlaying from '@/components/home/NowPlaying';
import NowPlayingModal from '@/components/home/NowPlayingModal';
import RecentPlaylists from '@/components/home/RecentPlaylists';
import ScheduleModal from '@/components/home/ScheduleModal';
import SettingsModal from '@/components/home/SettingsModal';
import styles from '@/components/home/styles';
import useRadiocult from '@/hooks/useRadiocult';

const NewsApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentStream, setCurrentStream] = useState('https://refwordfm.radiocult.fm/stream');

  const EMPTY_NOW_PLAYING = {
    id: 0,
    title: '',
    subtitle: '',
    image: '',
    isLive: false,
    streamUrl: '',
    show: '',
    host: '',
    listeners: '0',
    description: '',
  } as any;

  const [nowPlaying, setNowPlaying] = useState<any>(EMPTY_NOW_PLAYING);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNowPlayingModal, setShowNowPlayingModal] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [notifications, setNotifications] = useState(true);
  const [backgroundPlay, setBackgroundPlay] = useState(true);

  // const player = useAudioPlayer(currentStream);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Radiocult hook
  const { data: rcData, error: rcError } = useRadiocult('refwordfm', {
    apiKey: "pk_11730d4c647a423bb05f8080a8088c6c"
  });

  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Map rcData to our state
  useEffect(() => {
    if (!rcData) return;

    const result = (rcData as any)?.raw?.result || {};
    const schedule = result.content || {};
    const metadata = result.metadata || {};

    // Stream URL fallback
    const streamUrl = rcData.streamUrl || 'https://refwordfm.radiocult.fm/stream';
    setCurrentStream(streamUrl);

    // nowPlaying info
    setNowPlaying((prev: any) => ({
      ...prev,
      title: metadata.title || schedule.title || prev.title,
      subtitle: metadata.album || prev.subtitle,
      image: metadata.artwork?.default || prev.image || '',
      streamUrl,
      description: metadata.filename || prev.description || '',
      listeners: rcData.listeners || prev.listeners,
      show: schedule.title || '',
      host: metadata.artist || '',
      startTime: schedule.startDateUtc,
      endTime: schedule.endDateUtc,
      isLive: result.status === "schedule",
    }));

    // announcements
    const rawAnnouncements =
      (rcData as any)?.raw?.announcements || (rcData as any)?.announcements || [];
    setAnnouncements(rawAnnouncements);
  }, [rcData]);

  // Show fetch errors
  useEffect(() => {
    if (rcError) {
      console.warn('useRadiocult error:', rcError);
      Alert.alert('Data Error', 'Unable to load station metadata. Some features may be unavailable.');
    }
  }, [rcError]);

  // Auto-scroll announcements
  useEffect(() => {
    if (!announcements || announcements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(
        (prev) => (prev + 1) % announcements.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements]);

  // Setup audio mode for background playback
  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    };
    setupAudio();
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        setIsPlaying(false);
      }
      // if (player) {
      //   player.pause();
      //   setIsPlaying(false);
      // }
    };
  }, []);

  // Play / Pause
  const handlePlayPause = async () => {
    try {
      if (!isPlaying) {
        if (!soundRef.current) {
          const { sound } = await Audio.Sound.createAsync(
            { uri: currentStream },
            { shouldPlay: true }
          );
          soundRef.current = sound;

          // Optional: listen for playback updates
          soundRef.current.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setIsPlaying(false);
              }
            } else if (status.error) {
              console.log(`Playback error: ${status.error}`);
              setIsConnected(false);
            }
          });
        } else {
          await soundRef.current.playAsync();
        }

        setShowNowPlayingModal(true);
        setIsPlaying(true);
      } else {
        if (soundRef.current) {
          await soundRef.current.pauseAsync();
        }
        setIsPlaying(false);
      }

      // if (!isPlaying) {
      //   await player.play();
      //   setShowNowPlayingModal(true);
      //   setIsPlaying(true);
      // } else {
      //   await player.pause();
      //   setIsPlaying(false);
      // }
    } catch (err) {
      console.log("Stream error:", err);
      Alert.alert("Stream Error", "Unable to play stream. Please check your connection.");
      setIsConnected(false);
    }
  };


  // Mute toggle
  const handleVolumeToggle = async () => {
    if (!soundRef.current) return;
    await soundRef.current.setIsMutedAsync(!isMuted);
    setIsMuted(!isMuted);

    // if (!player) return;
    // player.muted = !isMuted;
    // setIsMuted(!isMuted);
  };


  // Share
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "🎶 Check out RefWord FM!\n\nListen live at: https://refwordfm.radiocult.fm/stream",
        url: "https://refwordfm.radiocult.fm/stream",
        title: "RefWord FM Radio",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared via", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Show info
  const handleShowInfo = () => {
    const formatDate = (isoString: string): string => {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      });
    };

    const parts = [
      nowPlaying.show || nowPlaying.title || 'RefWord FM',
      nowPlaying.host ? `Host: ${nowPlaying.host}` : undefined,
      // `Listeners: ${nowPlaying.listeners || '0'}`,
      nowPlaying.startTime ? `Start: ${formatDate(nowPlaying.startTime)}` : undefined,
      nowPlaying.endTime ? `End: ${formatDate(nowPlaying.endTime)}` : undefined,
    ]
      .filter(Boolean)
      .join('\n');

    Alert.alert('Station Info', parts);
  };


  // Refresh
  const onRefresh = () => {
    setRefreshing(true);
    setIsConnected(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Header
          greeting='RefWord FM'
          onShare={handleShare}
          onOpenSettings={() => setShowSettings(true)}
        />

        {announcements && announcements.length > 0 ? (
          <AnnouncementTicker
            text={
              (announcements[currentAnnouncementIndex] &&
                (announcements[currentAnnouncementIndex].title ||
                  announcements[currentAnnouncementIndex].message ||
                  announcements[currentAnnouncementIndex].text)) ||
              ''
            }
          />
        ) : nowPlaying.description ? (
          <AnnouncementTicker text={nowPlaying.title} />
        ) : null}

        {/* <ListenLive
          isPlaying={isPlaying}
          listeners={nowPlaying.listeners}
          onTogglePlay={handlePlayPause}
        /> */}

        <RecentPlaylists onPress={() => { setShowSchedule(true); }} />

        <NowPlaying 
          data={nowPlaying} 
          onPress={() => setShowNowPlayingModal(true)}
        />

        <FeaturedPodcasts />
      </ScrollView>

      <BottomPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        isConnected={isConnected}
        onTogglePlay={handlePlayPause}
        onToggleMute={handleVolumeToggle}
        onInfo={handleShowInfo}
      />

      <NowPlayingModal
        visible={showNowPlayingModal}
        onClose={() => setShowNowPlayingModal(false)}
        data={nowPlaying}
        isPlaying={isPlaying}
        isMuted={isMuted}
        isConnected={isConnected}
        onTogglePlay={handlePlayPause}
        onToggleMute={handleVolumeToggle}
        onInfo={handleShowInfo}
      />

      <ScheduleModal
        visible={showSchedule}
        onClose={() => setShowSchedule(false)}
      />

      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        notifications={notifications}
        backgroundPlay={backgroundPlay}
        onToggleNotifications={setNotifications}
        onToggleBackgroundPlay={setBackgroundPlay}
        onShare={handleShare}
      />
    </SafeAreaView>
  );
};

export default NewsApp;