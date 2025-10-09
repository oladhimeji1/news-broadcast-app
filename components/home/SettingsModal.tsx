import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
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

const SettingsModal: React.FC<Props> = ({ visible, onClose, notifications, backgroundPlay, onToggleNotifications, onToggleBackgroundPlay, onShare }) => (
  <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Settings</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.settingsList}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingSubtitle}>Get notified about new shows</Text>
          </View>
          <Switch value={notifications} onValueChange={onToggleNotifications} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={notifications ? '#007AFF' : '#f4f3f4'} />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Background Play</Text>
            <Text style={styles.settingSubtitle}>Continue playing when app is minimized</Text>
          </View>
          <Switch value={backgroundPlay} onValueChange={onToggleBackgroundPlay} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={backgroundPlay ? '#007AFF' : '#f4f3f4'} />
        </View>

  <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('About', 'RefWord FM v1.0\nChristian Broadcasting Network\n\nFor support, contact: info@refwordfm.com')}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>About RefWord FM</Text>
            <Text style={styles.settingSubtitle}>App info and support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={onShare}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Share App</Text>
            <Text style={styles.settingSubtitle}>Tell others about RefWord FM</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  </Modal>
);

export default SettingsModal;
