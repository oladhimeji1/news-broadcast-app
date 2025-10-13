import AudioWaves from '@/components/wave';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface NowPlayingData {
  title: string;
  subtitle?: string;
  image?: string;
  isLive?: boolean;
  show?: string;
  host?: string;
  listeners?: string;
  description?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  data: NowPlayingData;
  isPlaying: boolean;
  isMuted: boolean;
  isConnected: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onInfo: () => void;
}

const NowPlayingModal: React.FC<Props> = ({
  visible,
  onClose,
  data,
  isPlaying,
  isMuted,
  isConnected,
  onTogglePlay,
  onToggleMute,
  onInfo,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Background Image */}
        <Image
          source={{ uri: data.image || 'https://via.placeholder.com/400' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Blur Overlay */}
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

        {/* Optional dark overlay (for more contrast) */}
        <View style={styles.overlay} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>NOW PLAYING</Text>
            {data.isLive && (
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={onInfo} style={styles.closeButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Artwork */}
        <View style={styles.artworkContainer}>
          <Image
            source={{ uri: data.image || 'https://via.placeholder.com/400' }}
            style={styles.artwork}
            resizeMode="cover"
          />
        </View>

        {/* Song Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.songTitle} numberOfLines={2}>
              {data.title || 'No Title'}
            </Text>
          </View>

          <Text style={styles.artistName} numberOfLines={1}>
            {data.subtitle || data.show || 'RefWord FM'}
          </Text>

          {data.host && (
            <Text style={styles.hostName} numberOfLines={1}>
              Host: {data.host}
            </Text>
          )}
        </View>

        {/* Audio Waves */}
        <View style={styles.waveContainer}>{isPlaying && <AudioWaves />}</View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={onToggleMute} style={styles.smallButton}>
            <Ionicons
              name={isMuted ? 'volume-high' : 'volume-mute'}
              size={26}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onTogglePlay} style={styles.playButton}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onInfo} style={styles.smallButton}>
            <Ionicons
              name="information-circle-outline"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.9,
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 36, 52, 0.92)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
    marginBottom: 2,
  },
  liveDot: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
    marginRight: 4,
  },
  liveText: {
    color: '#FF3B30',
    fontSize: 10,
    fontWeight: '700',
  },
  artworkContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  artwork: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  infoContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  songTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
  },
  artistName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  hostName: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: '400',
  },
  waveContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  smallButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default NowPlayingModal;