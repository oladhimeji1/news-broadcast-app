import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Podcast {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  streamUrl?: string;
  isLive?: boolean;
  host?: string;
}

interface Props {
  podcasts: Podcast[];
  onSelect: (streamUrl: string, podcast: any) => void;
}

const FeaturedPodcasts: React.FC<Props> = ({ podcasts, onSelect }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Featured Programs</Text>
      <TouchableOpacity>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.podcastGrid}>
      {podcasts.map((pod) => (
        <TouchableOpacity key={pod.id} style={styles.podcastItem} onPress={() => onSelect(pod.streamUrl || '', pod)}>
          <Image source={{ uri: pod.image }} style={styles.podcastImage} />
          <Text style={styles.podcastTitle}>{pod.title}</Text>
          <Text style={styles.podcastHost}>by {pod.host}</Text>
          {pod.isLive && (
            <View style={styles.liveIndicatorPodcast}>
              <Text style={styles.liveTextSmall}>LIVE</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default FeaturedPodcasts;
