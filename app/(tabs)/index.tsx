import { useAudioPlayer } from 'expo-audio';
import { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Share, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Presentational components
import AnnouncementTicker from '@/components/home/AnnouncementTicker';
import BottomPlayer from '@/components/home/BottomPlayer';
import FeaturedPodcasts from '@/components/home/FeaturedPodcasts';
import Header from '@/components/home/Header';
import ListenLive from '@/components/home/ListenLive';
import NowPlaying from '@/components/home/NowPlaying';
import RecentPlaylists from '@/components/home/RecentPlaylists';
import ScheduleModal from '@/components/home/ScheduleModal';
import SettingsModal from '@/components/home/SettingsModal';
import styles from '@/components/home/styles';
import useRadiocult from '@/hooks/useRadiocult';

interface DataType {
  id: number | string;
  title: string;
  image: string;
  streamUrl: string;
  subtitle: string;
  isLive: boolean;
  show: string;
  host: string;
  startTime?: string;
  endTime?: string;
}

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
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [notifications, setNotifications] = useState(true);
  const [backgroundPlay, setBackgroundPlay] = useState(true);

  const player = useAudioPlayer(currentStream);

  // Radiocult hook
  const { data: rcData, error: rcError } = useRadiocult('refwordfm', {
    apiKey: "pk_11730d4c647a423bb05f8080a8088c6c"
  });

  const [recentPlaylists, setRecentPlaylists] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Map rcData to our state
  useEffect(() => {
    if (!rcData) return;
    // console.log('::::::::::::::::::::::::::::::::::::::::::::::::');
    // console.log("Newwwwww:", JSON.stringify(rcData, null, 2));

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
    }));

    // Build one-item playlist from schedule
    // const mapped = [{
    //   id: schedule.id,
    //   title: schedule.title,
    //   subtitle: metadata.title,
    //   image: metadata.artwork?.default || '',
    //   streamUrl,
    //   isLive: result.status === "schedule",
    //   show: schedule.entity || '',
    //   host: metadata.artist || '',
    //   startTime: schedule.startDateUtc,
    //   endTime: schedule.endDateUtc,
    // }];

    // setRecentPlaylists(mapped);

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

  // Cleanup
  useEffect(() => {
    return () => {
      if (player) {
        player.pause();
      }
    };
  }, [player]);

  // Play / Pause
  const handlePlayPause = async () => {
    try {
      if (!isPlaying) {
        await player.play();
        setIsPlaying(true);
      } else {
        await player.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.log("Stream error:", err);
      Alert.alert("Stream Error", "Unable to play stream. Please check your connection.");
      setIsConnected(false);
    }
  };

  // Mute toggle
  const handleVolumeToggle = async () => {
    if (!player) return;
    player.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Change stream
  const changeStream = async (streamUrl: string, title: DataType) => {
    try {
      if (isPlaying) {
        await player.pause();
        setIsPlaying(false);
      }
      setCurrentStream(streamUrl);
      setNowPlaying({
        ...title,
        listeners: (nowPlaying && (nowPlaying as any).listeners) || '0'
      });
    } catch (error) {
      console.error('changeStream error', error);
      Alert.alert("Error", "Unable to change stream");
    }
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

  // Reminder
  // const setReminder = (program: any) => {
  //   Alert.alert(
  //     "Reminder Set",
  //     `You'll be notified before "${program.show}" starts at ${program.time}`
  //   );
  // };

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
                (announcements[currentAnnouncementIndex].text ||
                  announcements[currentAnnouncementIndex].message ||
                  announcements[currentAnnouncementIndex].title)) ||
              ''
            }
          />
        ) : nowPlaying.description ? (
          <AnnouncementTicker text={nowPlaying.description} />
        ) : null}

        <ListenLive
          isPlaying={isPlaying}
          listeners={nowPlaying.listeners}
          onTogglePlay={handlePlayPause}
        />

        <RecentPlaylists onPress={() => { setShowSchedule(true); }} />

        <NowPlaying data={nowPlaying} />

        <FeaturedPodcasts />
      </ScrollView>

      <BottomPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        isConnected={isConnected}
        onTogglePlay={handlePlayPause}
        onToggleMute={handleVolumeToggle}
        onInfo={() => {
          const parts = [
            nowPlaying.show || nowPlaying.title || 'RefWord FM',
            nowPlaying.host ? `Host: ${nowPlaying.host}` : undefined,
            `Listeners: ${nowPlaying.listeners || '0'}`,
            nowPlaying.startTime ? `Start: ${nowPlaying.startTime}` : undefined,
            nowPlaying.endTime ? `End: ${nowPlaying.endTime}` : undefined,
          ].filter(Boolean).join('\n');

          Alert.alert('Station Info', parts);
        }}
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
