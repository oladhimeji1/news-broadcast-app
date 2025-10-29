import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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
  loading?: boolean;
  onPress?: () => void;
}

const NowPlaying: React.FC<Props> = ({ data, loading, onPress }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { marginBottom: 5 }]}>Now Playing</Text>
    {loading ? (
      <View style={styles.nowPlayingCard}>
        <View style={styles.nowPlayingSkeletonImage} />
        <View style={styles.nowPlayingSkeletonInfoContainer}>
          <View style={styles.nowPlayingInfo}>
            <View style={styles.nowPlayingSkeletonTitle} />
            <View style={styles.nowPlayingSkeletonSubtitle} />
            <View style={styles.showInfo}>
              <View style={styles.nowPlayingSkeletonShow} />
              <View style={styles.nowPlayingSkeletonHost} />
            </View>
          </View>
        </View>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.nowPlayingCard}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Image source={{ uri: data.image }} style={styles.nowPlayingImage} />
        <View style={styles.nowPlayingOverlay}>
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingTitle}>{data.title}</Text>
            <Text style={styles.nowPlayingSubtitle}>{data.subtitle}</Text>
            <View style={styles.showInfo}>
              <Text style={styles.showText}>{data.show}</Text>
              <Text style={styles.hostText}>• {data.host}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )}
  </View>
);

export default NowPlaying;