import React, { useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  onPress: () => void;
}

const imageUrls = [
  "https://refword.net/wp-content/uploads/2025/09/RENEWING.jpg",
  "https://refword.net/wp-content/uploads/2025/09/REEVES.jpeg",
  "https://refword.net/wp-content/uploads/2025/09/Creation-Moments.png",
  "https://refword.net/wp-content/uploads/2025/09/FRESH-BREAD.png",
  "https://refword.net/wp-content/uploads/2025/09/REFORMED-FORUM.jpg",
  "https://refword.net/wp-content/uploads/2025/09/DR-BARNHOUSE.jpg",
  "https://refword.net/wp-content/uploads/2025/09/TRUTH-FOR.jpg",
  "https://refword.net/wp-content/uploads/2025/09/THE-BIBLE-STUDY-HOUR.jpg",
  "https://refword.net/wp-content/uploads/2025/09/Sons-of-Purpose-Vol-2.2.png",
  "https://refword.net/wp-content/uploads/2025/09/CREDO.jpg",
  "https://refword.net/wp-content/uploads/2025/09/GTY.jpg",
  "https://refword.net/wp-content/uploads/2025/09/AWFS.png",
];

const getRandomImages = (count: number) => {
  const shuffled = [...imageUrls].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((url, i) => ({
    id: i + 1,
    image: url,
  }));
};

const RecentPlaylists: React.FC<Props> = ({ onPress }) => {
  const playlists = useMemo(() => getRandomImages(10), []); // 👈 only once

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.allSchedleTitle}>All Schedules</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {playlists.map((p) => (
          <View key={p.id} style={styles.playlistItem}>
            <Image
              source={{ uri: p.image }}
              style={styles.playlistImage}
              resizeMode="cover"
              onError={() => console.warn('Image failed to load:', p.image)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentPlaylists;
