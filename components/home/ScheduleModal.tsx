import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Program {
  id: number;
  time: string;
  show: string;
  host: string;
  duration: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  schedule: Program[];
  onSetReminder: (program: Program) => void;
}

const ScheduleModal: React.FC<Props> = ({ visible, onClose, schedule, onSetReminder }) => (
  <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Todays Schedule</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scheduleList}>
        {schedule.map((item) => (
          <View key={item.id} style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={styles.scheduleTimeText}>{item.time}</Text>
              <Text style={styles.scheduleDuration}>{item.duration}</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleShow}>{item.show}</Text>
              <Text style={styles.scheduleHost}>with {item.host}</Text>
            </View>
            <TouchableOpacity onPress={() => onSetReminder(item)} style={styles.reminderButton}>
              <Ionicons name="notifications" size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  </Modal>
);

export default ScheduleModal;
