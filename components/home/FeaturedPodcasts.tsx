import { useState } from 'react';
import { Image, Text, View } from 'react-native';
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

const FALLBACK_IMAGE =
  'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/RefWord-Dot-NET-REF-RADIO.png?fit=300%2C300&ssl=1';

const featuredPodcasts: Podcast[] = [
  {
    id: 1,
    title: 'Renewing Your Mind',
    host: 'Dr. R.C. Sproul',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/RENEWING.jpg?fit=300%2C300&ssl=1',
    streamUrl: 'https://refword.fm/stream/renewingyourmind',
    isLive: false,
  },
  {
    id: 2,
    title: 'The John Reeves Hour',
    host: 'John Reeves',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/REEVES.jpeg?fit=300%2C300&ssl=1',
    streamUrl: 'https://refword.fm/stream/johnreeves',
  },
  {
    id: 3,
    title: 'Creation Moments',
    host: 'Ian Taylor',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/Creation-Moments.png?fit=300%2C300&ssl=1',
    streamUrl: 'https://refword.fm/stream/creationmoments',
  },
  {
    id: 4,
    title: 'Fresh Bread',
    host: 'Dr. Harry Reeder',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/FRESH-BREAD.png?fit=300%2C300&ssl=1',
    streamUrl: 'https://refword.fm/stream/freshbread',
    isLive: true,
  },
  {
    id: 5,
    title: 'Reformed Forum',
    host: 'Camden Bucey',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/REFORMED-FORUM.jpg?fit=300%2C300&ssl=1',
  },
  {
    id: 6,
    title: 'Dr. Barnhouse & the Bible',
    host: 'Dr. Donald Grey Barnhouse',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/DR-BARNHOUSE.jpg?fit=300%2C300&ssl=1',
  },
  {
    id: 7,
    title: 'Truth For Life',
    host: 'Dr. Alistair Begg',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/TRUTH-FOR.jpg?fit=300%2C300&ssl=1',
    isLive: true,
  },
  {
    id: 8,
    title: 'Grace To You',
    host: 'John MacArthur',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/GTY.jpg?fit=300%2C300&ssl=1',
    isLive: true,
  },
  {
    id: 9,
    title: 'The Worm’s Eye View',
    host: 'Michael Hall',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/THE-WORMS-EYE-VIEW-LOGO.png?fit=300%2C300&ssl=1',
  },
  {
    id: 10,
    title: 'A Word From the Spirit',
    host: 'Pastor John Doe',
    image: 'https://i0.wp.com/refword.net/wp-content/uploads/2025/09/AWFS.png?fit=300%2C300&ssl=1',
  },
];

const FeaturedPodcasts = () => {
  const [failedImages, setFailedImages] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <View style={styles.featureSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Programs</Text>
      </View>

      <View style={styles.podcastGrid}>
        {featuredPodcasts.map((pod) => {
          const imageUri = failedImages[pod.id] ? FALLBACK_IMAGE : pod.image;

          return (
            <View
              key={pod.id}
              style={styles.podcastItem}
              // onPress={() => onSelect(pod.streamUrl || '', pod)}
            >
              <Image
                source={{ uri: imageUri }}
                style={styles.podcastImage}
                onError={() => handleImageError(pod.id)}
              />
              <Text style={styles.podcastTitle}>{pod.title}</Text>
              {pod.host && <Text style={styles.podcastHost}>by {pod.host}</Text>}
              {pod.isLive && (
                <View style={styles.liveIndicatorPodcast}>
                  <Text style={styles.liveTextSmall}>LIVE</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FeaturedPodcasts;
