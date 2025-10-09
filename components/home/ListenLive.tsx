import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  isPlaying: boolean;
  listeners?: string;
  onTogglePlay: () => void;
}

const ListenLive: React.FC<Props> = ({ isPlaying, listeners = '0', onTogglePlay }) => (
  <View style={styles.listenLiveContainer}>
    <TouchableOpacity onPress={onTogglePlay} style={[styles.listenLiveButton, isPlaying && styles.listenLiveButtonActive]}>
      <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={32} color="#fff" style={styles.listenLiveIcon} />
      <View style={styles.listenLiveTextContainer}>
        <Text style={styles.listenLiveText}>{isPlaying ? 'LIVE NOW' : 'LISTEN LIVE'}</Text>
        <Text style={styles.listenLiveSubtext}>{listeners} listeners</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default ListenLive;
