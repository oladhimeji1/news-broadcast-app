import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  greeting: string;
  onShare: () => void;
  onOpenSettings: () => void;
}

const Header: React.FC<Props> = ({ greeting, onShare, onOpenSettings }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.tagline}>Christian Broadcasting Network</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={onShare} style={styles.headerButton}>
          <Ionicons name="share-social" size={22} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpenSettings} style={styles.headerButton}>
          <Ionicons name="settings" size={22} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
