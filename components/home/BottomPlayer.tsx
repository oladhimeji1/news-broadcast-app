import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  isPlaying: boolean;
  isMuted: boolean;
  isConnected: boolean;
  isLoading?: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onInfo: () => void;
}

const BottomPlayer: React.FC<Props> = ({ isPlaying, isMuted, isConnected, isLoading, onTogglePlay, onToggleMute, onInfo }) => (
  <View style={styles.floatingContainer}>
    <BlurView intensity={50} tint="light" style={styles.bottomPlayer}>
      <View style={styles.playerControls}>
        <TouchableOpacity onPress={onToggleMute} style={styles.controlButton}>
          <Ionicons name={!isMuted ? 'volume-mute' : 'volume-high'} size={15} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onTogglePlay} style={[styles.playButton, isPlaying && styles.playButtonActive]} disabled={isLoading}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onInfo} style={styles.controlButton}>
          <Ionicons name="information-circle" size={15} color="#666" />
        </TouchableOpacity>
      </View>
    </BlurView>
  </View>
);

export default BottomPlayer;
