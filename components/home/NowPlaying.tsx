import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

interface NowPlayingData {
  title: string;
  subtitle?: string;
  image?: string;
  isLive?: boolean;
  show?: string;
  host?: string;
  listeners?: string;
}

interface Props {
  data: NowPlayingData;
}

const NowPlaying: React.FC<Props> = ({ data }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { marginBottom: 5 }]}>Now Playing</Text>
    <View style={styles.nowPlayingCard}>
      <Image source={{ uri: data.image }} style={styles.nowPlayingImage} />
      <View style={styles.nowPlayingOverlay}>
        <View style={styles.nowPlayingHeader}>
          {data.isLive && (
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}
          <Text style={styles.listenerCount}>👥 {data.listeners}</Text>
        </View>
        <View style={styles.nowPlayingInfo}>
          <Text style={styles.nowPlayingTitle}>{data.title}</Text>
          <Text style={styles.nowPlayingSubtitle}>{data.subtitle}</Text>
          <View style={styles.showInfo}>
            <Text style={styles.showText}>{data.show}</Text>
            <Text style={styles.hostText}>• {data.host}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default NowPlaying;
