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
  // onSetReminder: (program: Program) => void;
}

// Parsed schedule data from your broadcast document
const SCHEDULE_DATA: Program[] = [
  { id: 1, time: '6:00 AM', show: 'Renewing Your Mind', host: 'Dr. R.C. Sproul', duration: '35 min' },
  { id: 2, time: '6:35 AM', show: 'BreakPoint', host: 'John Stonestreet', duration: '5 min' },
  { id: 3, time: '6:40 AM', show: 'Grace To You', host: 'John MacArthur', duration: '30 min' },
  { id: 4, time: '7:10 AM', show: '5 Minutes In Church History', host: 'Dr. Stephen Nichols', duration: '5 min' },
  { id: 5, time: '7:15 AM', show: 'Morning & Evening', host: 'Charles Spurgeon', duration: '3 min' },
  { id: 6, time: '7:18 AM', show: 'You Think About That', host: 'Steve Brown', duration: '1 min' },
  { id: 7, time: '7:19 AM', show: 'Creation Moments', host: 'Ian Taylor', duration: '1 min' },
  { id: 8, time: '7:20 AM', show: 'Daily Devotion', host: 'Dr. Alistair Begg', duration: '5 min' },
  { id: 9, time: '7:25 AM', show: 'Ultimately', host: 'Dr. R.C. Sproul', duration: '5 min' },
  { id: 10, time: '7:30 AM', show: 'Things Unseen', host: 'Dr. Sinclair B. Ferguson', duration: '5 min' },
  { id: 11, time: '7:35 AM', show: 'Running To Win', host: 'Dr. Irwin Lutzer', duration: '30 min' },
  { id: 12, time: '8:05 AM', show: '5-Minute Edition Out of Arizona', host: 'E. Lawrence Williams', duration: '5 min' },
  { id: 13, time: '8:10 AM', show: 'Ask Ligonier', host: 'Dr. R.C. Sproul', duration: '5 min' },
  { id: 14, time: '8:15 AM', show: 'Bible Study Hall', host: 'Dr. R.C. Sproul', duration: '25 min' },
  { id: 15, time: '8:40 AM', show: 'Truth For Life', host: 'Dr. Alistair Begg', duration: '25 min' },
  { id: 16, time: '9:05 AM', show: 'Dr. Barnhouse & The Bible', host: 'Dr. Donald Grey Barnhouse', duration: '30 min' },
  { id: 17, time: '9:35 AM', show: 'Break Point', host: 'John Stonestreet', duration: '5 min' },
  { id: 18, time: '9:40 AM', show: 'Bible Class In Session', host: 'Dr. R.C. Sproul', duration: '30 min' },
  { id: 19, time: '10:10 AM', show: 'The Bible Study Hour', host: 'Dr. James Boice', duration: '30 min' },
  { id: 20, time: '10:40 AM', show: 'Bible Daily', host: 'David Cochran Heath', duration: '15 min' },
  { id: 21, time: '10:55 AM', show: 'Renewing Your Mind', host: 'Dr. R.C. Sproul', duration: '35 min' },
  { id: 22, time: '11:30 AM', show: 'The Way of Grace', host: 'Elder Matthew Statler', duration: '35 min' },
  { id: 23, time: '12:05 PM', show: 'Question & Answer', host: 'Sinclair B. Ferguson', duration: '1 min' },
  { id: 24, time: '12:06 PM', show: 'Grace To You', host: 'John MacArthur', duration: '28 min' },
  { id: 25, time: '12:34 PM', show: 'Focal Point', host: 'Mike Fabarez', duration: '1 min' },
  { id: 26, time: '12:35 PM', show: 'Light + Truth', host: 'Dr. John Piper', duration: '20 min' },
  { id: 27, time: '12:55 PM', show: 'Ultimately', host: 'Dr. R.C. Sproul', duration: '1 min' },
  { id: 28, time: '12:56 PM', show: 'Alpha & Omega (Title Cut)', host: 'Malcolm Hunter', duration: '8 min' },
  { id: 29, time: '1:04 PM', show: 'BreakPoint', host: 'John Stonestreet', duration: '6 min' },
  { id: 30, time: '1:10 PM', show: 'You Think About That', host: 'Dr. Steve Brown', duration: '1 min' },
  { id: 31, time: '1:11 PM', show: 'Creation Moments', host: 'Ian Taylor', duration: '19 min' },
  { id: 32, time: '1:30 PM', show: 'The Bible Study Hour', host: 'Dr. James Boice', duration: '35 min' },
  { id: 33, time: '2:05 PM', show: 'Morning & Evening', host: 'Dr. Charles Spurgeon', duration: '5 min' },
  { id: 34, time: '2:10 PM', show: 'Simply Put', host: 'Barry Cooper', duration: '5 min' },
  { id: 35, time: '2:15 PM', show: 'Fresh Bread', host: 'Dr. Harry Reeder', duration: '5 min' },
  { id: 36, time: '2:20 PM', show: 'Running To Win', host: 'Dr. Irwin Lutzer', duration: '10 min' },
];

// Alternate programming (2:30 PM - 4:45 PM)
const ALTERNATE_PROGRAMS = [
  'Whitehorse Inn - Michael Horton & Company',
  'Know What You Believe - Michael Horton',
  'Mortification of Spin - Carl & Todd',
  'A Word Fitly Spoken - Michelle Lesley & Amy Spreeman',
  'Bible Chat Central - Catherine Harmon',
  'Reformed Forum - Camden Bucey',
  'The Carson Center - A.D. Carson'
];

const ScheduleModal: React.FC<Props> = ({ visible, onClose }) => (
  <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Today&apos;s Schedule</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scheduleList}>
        <View style={styles.scheduleSectionHeader}>
          <Text style={styles.scheduleSectionTitle}>Regular Programming</Text>
          <Text style={styles.scheduleSectionSubtitle}>6:00 AM - 2:30 PM MST</Text>
        </View>

        {SCHEDULE_DATA.map((item) => (
          <View key={item.id} style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={styles.scheduleTimeText}>{item.time}</Text>
              <Text style={styles.scheduleDuration}>{item.duration}</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleShow}>{item.show}</Text>
              <Text style={styles.scheduleHost}>with {item.host}</Text>
            </View>
            {/* <TouchableOpacity onPress={() => onSetReminder(item)} style={styles.reminderButton}>
              <Ionicons name="notifications-outline" size={20} color="#007AFF" />
            </TouchableOpacity> */}
          </View>
        ))}

        <View style={styles.scheduleSectionHeader}>
          <Text style={styles.scheduleSectionTitle}>Alternate Programming</Text>
          <Text style={styles.scheduleSectionSubtitle}>2:30 PM - 4:45 PM MST</Text>
        </View>

        {ALTERNATE_PROGRAMS.map((program, index) => (
          <View key={`alt-${index}`} style={styles.alternateItem}>
            <Text style={styles.alternateText}>{program}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>All times in Mountain Standard Time (MST)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </Modal>
);
export default ScheduleModal;
