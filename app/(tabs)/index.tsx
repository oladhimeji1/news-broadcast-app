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
  id: number;
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


// All UI data now comes from the Radiocult API via `useRadiocult`.

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
  // chat and volume not yet wired to UI components (kept for future use)
  const [notifications, setNotifications] = useState(true);
  const [backgroundPlay, setBackgroundPlay] = useState(true);

  const player = useAudioPlayer(currentStream);

  // Radiocult live metadata (attempt sync with web embed)
  // useRadiocult returns { data, loading, error, refresh }
  const { data: rcData, error: rcError } = useRadiocult('refwordfm', { apiKey: "pk_11730d4c647a423bb05f8080a8088c6c" });

  // keep a local recentPlaylists state populated from Radiocult API
  const [recentPlaylists, setRecentPlaylists] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Merge radiocult data into state when available
  useEffect(() => {
    if (!rcData) return;
    console.log('Radiocult data:', rcData);

    // if Radiocult provided a stream, update currentStream
    if (rcData.streamUrl) {
      setCurrentStream(rcData.streamUrl);
    }

    // update nowPlaying metadata (title/image/listeners) but preserve existing fields
    setNowPlaying((prev: any) => ({
      ...prev,
      title: rcData.title || rcData.name || prev.title,
      subtitle: rcData.subtitle || prev.subtitle,
      image: rcData.image || prev.image || '',
      streamUrl: rcData.streamUrl || prev.streamUrl || '',
      description: rcData.description || prev.description || '',
      listeners: rcData.listeners || prev.listeners,
    } as any));

    // Prefer playlists, otherwise channels
    const sourceItems = Array.isArray(rcData.playlists) && rcData.playlists.length > 0
      ? rcData.playlists
      : Array.isArray(rcData.channels) && rcData.channels.length > 0
        ? rcData.channels
        : [];

    if (sourceItems.length > 0) {
      const mapped = sourceItems.map((p: any, idx: number) => ({
        id: p.id || idx + 1000,
        title: p.title || p.name || p.show || `Program ${idx + 1}`,
        subtitle: p.subtitle || p.description || '',
        image: p.image || p.artwork || p.thumbnail || rcData.image || '',
        streamUrl: p.streamUrl || p.streamingUrl || p.stream_url || p.stream || rcData.streamUrl || currentStream,
        isLive: !!p.isLive || !!p.is_live || false,
        show: p.show || p.name || '',
        host: p.host || p.presenter || '',
        startTime: p.startTime || p.start_time || undefined,
        endTime: p.endTime || p.end_time || undefined,
      }));
      setRecentPlaylists(mapped as any);
    }

    // announcements may live on raw payload or top-level
    const rawAnnouncements = (rcData as any)?.raw?.announcements || (rcData as any)?.announcements || [];
    setAnnouncements(rawAnnouncements);
  }, [rcData, currentStream]);

  // Show fetch errors from useRadiocult
  useEffect(() => {
    if (rcError) {
      console.warn('useRadiocult error:', rcError);
      Alert.alert('Data Error', 'Unable to load station metadata. Some features may be unavailable.');
    }
  }, [rcError]);

  // Auto-scroll announcements (from API)
  useEffect(() => {
    if (!announcements || announcements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements]);

  // Clean up when unmounting
  useEffect(() => {
    return () => {
      if (player) {
        player.pause();
      }
    };
  }, [player]);

  // Handle play / pause
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

  // Handle mute / unmute
  const handleVolumeToggle = async () => {
    if (!player) return; // make sure player is loaded

      player.muted = !isMuted;

    setIsMuted(!isMuted);
  };

  // Handle stream change
  const changeStream = async (streamUrl: string, title: DataType) => {
    try {
      if (isPlaying) {
        await player.pause();
        setIsPlaying(false);
      }

      setCurrentStream(streamUrl);
      // preserve listeners if present in current state
      setNowPlaying({
        ...title,
        listeners: (nowPlaying && (nowPlaying as any).listeners) || '0'
      });

      // Alert.alert("Stream Changed", `Now tuned to: ${title.title}`);
    } catch (error) {
      console.error('changeStream error', error);
      Alert.alert("Error", "Unable to change stream");
    }
  };

  // Share functionality
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "🎶 Check out RefWord FM!\n\nListen live at: https://refwordfm.radiocult.fm/stream",
        url: "https://refwordfm.radiocult.fm/stream", // iOS uses url too
        title: "RefWord FM Radio",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with specific activity (e.g. WhatsApp, Twitter)
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

  // Set reminder for program
  const setReminder = (program: any) => {
    Alert.alert(
      "Reminder Set", 
      `You'll be notified before "${program.show}" starts at ${program.time}`
    );
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
        <Header greeting={rcData?.name || rcData?.title || 'RefWord FM'} onShare={handleShare} onOpenSettings={() => setShowSettings(true)} />

        {announcements && announcements.length > 0 ? (
          <AnnouncementTicker text={(announcements[currentAnnouncementIndex] && (announcements[currentAnnouncementIndex].text || announcements[currentAnnouncementIndex].message || announcements[currentAnnouncementIndex].title)) || ''} />
        ) : rcData?.description ? (
          <AnnouncementTicker text={rcData.description} />
        ) : null}

        <ListenLive isPlaying={isPlaying} listeners={nowPlaying.listeners} onTogglePlay={handlePlayPause} />

  <RecentPlaylists playlists={recentPlaylists} onSelect={changeStream} onViewSchedule={() => setShowSchedule(true)} />

        <NowPlaying data={nowPlaying} />

  <FeaturedPodcasts podcasts={recentPlaylists.slice(0, 4)} onSelect={changeStream} />
      </ScrollView>

      <BottomPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        isConnected={isConnected}
        onTogglePlay={handlePlayPause}
        onToggleMute={handleVolumeToggle}
        onInfo={() => {
          const parts = [
            rcData?.name || rcData?.title || 'RefWord FM',
            rcData?.edition ? `Edition: ${rcData.edition}` : undefined,
            rcData?.country ? `Country: ${Array.isArray(rcData.country) ? rcData.country.join(', ') : rcData.country}` : undefined,
            rcData?.donationLink ? `Donate: ${rcData.donationLink}` : undefined,
            rcData?.favouritedCount ? `Favorites: ${rcData.favouritedCount}` : undefined,
            rcData?.socials ? `Socials: ${JSON.stringify(rcData.socials)}` : undefined,
            `Now: ${nowPlaying.show || nowPlaying.title || ''}`,
            nowPlaying.host ? `Host: ${nowPlaying.host}` : undefined,
            `Listeners: ${nowPlaying.listeners || rcData?.listeners || '0'}`,
          ].filter(Boolean).join('\n');

          Alert.alert('Station Info', parts);
        }}
      />

  <ScheduleModal visible={showSchedule} onClose={() => setShowSchedule(false)} schedule={(rcData as any)?.raw?.schedule || (rcData as any)?.schedule || []} onSetReminder={setReminder} />

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