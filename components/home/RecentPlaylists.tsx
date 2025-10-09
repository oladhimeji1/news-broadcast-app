import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Playlist {
  id: number;
  title: string;
  image: string;
  streamUrl: string;
  isLive?: boolean;
}

interface Props {
  playlists: Playlist[];
  // accept a broader type for items to match page data
  onSelect: (streamUrl: string, item: any) => void;
  onViewSchedule: () => void;
}

const RecentPlaylists: React.FC<Props> = ({ playlists, onSelect, onViewSchedule }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Recent Programs</Text>
      <TouchableOpacity onPress={onViewSchedule}>
        <Text style={styles.seeAll}>View Schedule</Text>
      </TouchableOpacity>
    </View>

    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      {playlists.map((p) => (
        <TouchableOpacity key={p.id} style={styles.playlistItem} onPress={() => onSelect(p.streamUrl, p)}>
          <Image source={{ uri: p.image }} style={styles.playlistImage} />
          <View style={styles.playlistInfo}>
            <Text style={styles.playlistTitle}>{p.title.length > 15 ? p.title.slice(0, 12) + '...' : p.title}</Text>
            {p.isLive && (
              <View style={styles.liveIndicatorSmall}>
                <Text style={styles.liveTextSmall}>LIVE</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default RecentPlaylists;
