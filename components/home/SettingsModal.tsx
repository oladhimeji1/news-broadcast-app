import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Linking, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  notifications: boolean;
  backgroundPlay: boolean;
  onToggleNotifications: (v: boolean) => void;
  onToggleBackgroundPlay: (v: boolean) => void;
  onShare: () => void;
}

const SettingsModal: React.FC<Props> = ({ 
  visible, 
  onClose, 
  notifications, 
  backgroundPlay, 
  onToggleNotifications, 
  onToggleBackgroundPlay, 
  onShare 
}) => {
  const openURL = async (url: string, platform: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${platform}`);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to open ${platform}`);
    }
  };

  const openWebsite = () => openURL('https://www.refword.net', 'website');
  const openFacebook = () => openURL('https://www.facebook.com/RefWord.fm', 'Facebook');
  const openTwitter = () => openURL('https://twitter.com/immeasurab52415', 'Twitter');
  // const openDonate = () => openURL('https://www.lmwgm.org', 'donation page');

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Settings</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.settingsList}>
          {/* Social Media Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Connect With Us</Text>
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={openWebsite}>
            <Ionicons name="globe-outline" size={24} color="#007AFF" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Website</Text>
              <Text style={styles.settingSubtitle}>www.refword.net</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={openFacebook}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Facebook</Text>
              <Text style={styles.settingSubtitle}>@RefWord.fm</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={openTwitter}>
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Twitter</Text>
              <Text style={styles.settingSubtitle}>@immeasurab52415</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          {/* Support Section */}
          {/* <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Support</Text>
          </View> */}

          {/* <TouchableOpacity style={styles.settingItem} onPress={openDonate}>
            <Ionicons name="heart-outline" size={24} color="#FF3B30" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Donate</Text>
              <Text style={styles.settingSubtitle}>Support our ministry</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity> */}

          {/* App Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>App</Text>
          </View>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => Alert.alert(
              'About RefWord FM', 
              'RefWord FM v1.0\nChristian Reformation Word Broadcasting Station 24/7\n\nFor support, contact: info@refwordfm.com'
            )}
          >
            <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>About RefWord FM</Text>
              <Text style={styles.settingSubtitle}>App info and support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={onShare}>
            <Ionicons name="share-social-outline" size={24} color="#007AFF" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Share App</Text>
              <Text style={styles.settingSubtitle}>Tell others about RefWord FM</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Broadcasting from the United States</Text>
            <Text style={styles.footerText}>Christian Reformation Word Broadcasting</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default SettingsModal;