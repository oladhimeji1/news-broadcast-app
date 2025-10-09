import AudioWaves from '@/components/wave';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  isPlaying: boolean;
  isMuted: boolean;
  isConnected: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onInfo: () => void;
}

const BottomPlayer: React.FC<Props> = ({ isPlaying, isMuted, isConnected, onTogglePlay, onToggleMute, onInfo }) => (
  <View style={styles.bottomPlayer}>
    <View style={styles.playerControls}>
      <TouchableOpacity onPress={onToggleMute} style={styles.controlButton}>
        <Ionicons name={!isMuted ? 'volume-mute' : 'volume-high'} size={15} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onTogglePlay} style={[styles.playButton, isPlaying && styles.playButtonActive]}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onInfo} style={styles.controlButton}>
        <Ionicons name="information-circle" size={15} color="#666" />
      </TouchableOpacity>
    </View>
    <AudioWaves />
    <View style={styles.connectionStatus}>
      <View style={[styles.statusIndicator, { backgroundColor: isConnected ? '#4CD964' : '#FF3B30' }]} />
      <Text style={styles.statusText}>{isConnected ? 'Connected' : 'Disconnected'} • Stream Quality: High</Text>
    </View>
  </View>
);

export default BottomPlayer;
