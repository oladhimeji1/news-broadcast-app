import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import {
  // Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// const { width } = Dimensions.get('window');

const IMPACT_STATS = [
  { icon: 'radio', number: '50K+', label: 'Daily Listeners' },
  { icon: 'globe', number: '25+', label: 'Countries Reached' },
  { icon: 'heart', number: '1000+', label: 'Lives Touched Monthly' },
  { icon: 'calendar', number: '24/7', label: 'Broadcasting Hours' },
];

const DonationSelection = ({ 
  onDonate 
}: {
  onDonate: () => void;
}) => {
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://d4mt18vwj73wk.cloudfront.net/trackImage/338tFBQ0gaoR9mVlTuYdrIDKtSV-2025-09-24T10:40:40Z-512x512.jpg" }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Support RefWord FM</Text>
        <Text style={styles.subtitle}>
          Your generosity keeps Christian broadcasting alive and reaches hearts worldwide
        </Text>
      </View>

      {/* Impact Section */}
      <View style={styles.impactSection}>
        <Text style={styles.impactTitle}>Your Impact</Text>
        <View style={styles.statsGrid}>
          {IMPACT_STATS.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Ionicons name={stat.icon as any} size={24} color="#007AFF" />
              <Text style={styles.statNumber}>{stat.number}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* How Donations Help */}
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>How Your Donations Help</Text>
        <View style={styles.helpItems}>
          <View style={styles.helpItem}>
            <View style={styles.helpIcon}>
              <Ionicons name="radio" size={20} color="#4CAF50" />
            </View>
            <View style={styles.helpText}>
              <Text style={styles.helpItemTitle}>Broadcast Operations</Text>
              <Text style={styles.helpItemDesc}>Keep our transmitters running 24/7</Text>
            </View>
          </View>
          
          <View style={styles.helpItem}>
            <View style={styles.helpIcon}>
              <Ionicons name="mic" size={20} color="#FF9800" />
            </View>
            <View style={styles.helpText}>
              <Text style={styles.helpItemTitle}>Quality Programming</Text>
              <Text style={styles.helpItemDesc}>Support our hosts and content creation</Text>
            </View>
          </View>
          
          <View style={styles.helpItem}>
            <View style={styles.helpIcon}>
              <Ionicons name="people" size={20} color="#9C27B0" />
            </View>
            <View style={styles.helpText}>
              <Text style={styles.helpItemTitle}>Community Outreach</Text>
              <Text style={styles.helpItemDesc}>Extend our ministry to new communities</Text>
            </View>
          </View>
          
          <View style={styles.helpItem}>
            <View style={styles.helpIcon}>
              <Ionicons name="construct" size={20} color="#F44336" />
            </View>
            <View style={styles.helpText}>
              <Text style={styles.helpItemTitle}>Equipment & Maintenance</Text>
              <Text style={styles.helpItemDesc}>Upgrade and maintain broadcast equipment</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Donate Button */}
      <TouchableOpacity 
        style={styles.donateButton}
        onPress={onDonate}
      >
        <Ionicons name="heart" size={20} color="#fff" style={styles.donateIcon} />
        <Text style={styles.donateButtonText}>
          Make a Donation
        </Text>
      </TouchableOpacity>

      {/* Trust Indicators */}
      <View style={styles.trustSection}>
        <View style={styles.trustItem}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <Text style={styles.trustText}>Secure Payment</Text>
        </View>
        <View style={styles.trustItem}>
          <Ionicons name="lock-closed" size={20} color="#4CAF50" />
          <Text style={styles.trustText}>SSL Encrypted</Text>
        </View>
        <View style={styles.trustItem}>
          <Ionicons name="receipt" size={20} color="#4CAF50" />
          <Text style={styles.trustText}>Tax Deductible Receipt</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and running over.&rdquo; - Luke 6:38
        </Text>
        <Text style={styles.contactText}>
          Questions? Contact us at donations@refwordfm.com
        </Text>
      </View>
    </ScrollView>
  );
};

const DonationWebView = ({ onBack }: { onBack: () => void }) => {
  return (
    <View style={styles.webViewContainer}>
      <View style={styles.webViewHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: 'https://refword.net/donation/' }}
        style={styles.webView}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading donation page...</Text>
          </View>
        )}
      />
    </View>
  );
};

export default function DonationApp() {
  const [showWebView, setShowWebView] = useState(false);

  const handleDonate = () => {
    setShowWebView(true);
  };

  const handleBack = () => {
    setShowWebView(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {showWebView ? (
        <DonationWebView onBack={handleBack} />
      ) : (
        <DonationSelection onDonate={handleDonate} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header Styles
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Impact Section
  impactSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  // Help Section
  helpSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  helpItems: {
    gap: 15,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  helpText: {
    flex: 1,
  },
  helpItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  helpItemDesc: {
    fontSize: 12,
    color: '#666',
  },

  // Donate Button
  donateButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  donateIcon: {
    marginRight: 8,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  // Trust Section
  trustSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  trustText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
    lineHeight: 20,
  },
  contactText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

  // WebView Styles
  webViewContainer: {
    flex: 1,
  },
  webViewHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 5,
    fontWeight: '600',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});