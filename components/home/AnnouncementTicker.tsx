import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface Props {
  text: string;
}

const AnnouncementTicker: React.FC<Props> = ({ text }) => (
  <View style={styles.tickerContainer}>
    <View style={styles.tickerContent}>
      <Ionicons name="megaphone" size={16} color="#FF3B30" style={styles.tickerIcon} />
      <Text style={styles.tickerText}>{text}</Text>
    </View>
  </View>
);

export default AnnouncementTicker;
