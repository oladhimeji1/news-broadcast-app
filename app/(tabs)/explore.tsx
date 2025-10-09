import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface DonationAmount {
  id: string;
  amount: number;
  label: string;
  description: string;
  popular?: boolean;
}

const DONATION_AMOUNTS: DonationAmount[] = [
  { id: '5', amount: 5, label: '$5', description: 'Support our daily broadcasts' },
  { id: '10', amount: 10, label: '$10', description: 'Help reach more listeners', popular: true },
  { id: '20', amount: 20, label: '$20', description: 'Fund weekly programming' },
  { id: '50', amount: 50, label: '$50', description: 'Monthly operations support' },
  { id: '100', amount: 100, label: '$100', description: 'Major ministry impact' },
  { id: 'custom', amount: 0, label: 'Custom', description: 'Choose your amount' },
];

const IMPACT_STATS = [
  { icon: 'radio', number: '50K+', label: 'Daily Listeners' },
  { icon: 'globe', number: '25+', label: 'Countries Reached' },
  { icon: 'heart', number: '1000+', label: 'Lives Touched Monthly' },
  { icon: 'calendar', number: '24/7', label: 'Broadcasting Hours' },
];

const DonationSelection = ({ 
  selectedAmount, 
  setSelectedAmount, 
  customAmount, 
  setCustomAmount, 
  onCheckout 
}: {
  selectedAmount: string;
  setSelectedAmount: (id: string) => void;
  customAmount: string;
  setCustomAmount: (amount: string) => void;
  onCheckout: (amount: number) => void;
}) => {
  
  const handleDonation = () => {
    const amount = selectedAmount === 'custom' 
      ? parseFloat(customAmount) 
      : DONATION_AMOUNTS.find(d => d.id === selectedAmount)?.amount || 0;
    
    if (amount < 1) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount.');
      return;
    }
    
    onCheckout(amount);
  };

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

      {/* Donation Amounts */}
      <View style={styles.amountSection}>
        <Text style={styles.amountTitle}>Choose Your Contribution</Text>
        <View style={styles.amountGrid}>
          {DONATION_AMOUNTS.map((donation) => (
            <TouchableOpacity
              key={donation.id}
              style={[
                styles.amountButton,
                selectedAmount === donation.id && styles.amountButtonSelected,
                donation.popular && styles.popularButton,
              ]}
              onPress={() => setSelectedAmount(donation.id)}
            >
              {donation.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>POPULAR</Text>
                </View>
              )}
              <Text style={[
                styles.amountLabel,
                selectedAmount === donation.id && styles.amountLabelSelected
              ]}>
                {donation.label}
              </Text>
              <Text style={[
                styles.amountDescription,
                selectedAmount === donation.id && styles.amountDescriptionSelected
              ]}>
                {donation.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Custom Amount Input */}
      {selectedAmount === 'custom' && (
        <View style={styles.customAmountSection}>
          <Text style={styles.customAmountLabel}>Enter Custom Amount</Text>
          <View style={styles.customAmountInput}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.textInput}
              value={customAmount}
              onChangeText={setCustomAmount}
              placeholder="0.00"
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        </View>
      )}

      {/* Donation Type Toggle */}
      <View style={styles.typeSection}>
        <Text style={styles.typeTitle}>Donation Type</Text>
        <View style={styles.typeButtons}>
          <TouchableOpacity style={[styles.typeButton, styles.typeButtonActive]}>
            <Ionicons name="calendar" size={20} color="#fff" />
            <Text style={styles.typeButtonText}>One-time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeButton}>
            <Ionicons name="refresh" size={20} color="#007AFF" />
            <Text style={styles.typeButtonTextInactive}>Monthly</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.typeNote}>
          Monthly donations help us plan better for ministry growth
        </Text>
      </View>

      {/* Donate Button */}
      <TouchableOpacity 
        style={[
          styles.donateButton,
          (!selectedAmount || (selectedAmount === 'custom' && !customAmount)) && styles.donateButtonDisabled
        ]} 
        onPress={handleDonation}
        disabled={!selectedAmount || (selectedAmount === 'custom' && !customAmount)}
      >
        <Ionicons name="heart" size={20} color="#fff" style={styles.donateIcon} />
        <Text style={styles.donateButtonText}>
          Donate {selectedAmount === 'custom' && customAmount ? `$${customAmount}` : selectedAmount !== 'custom' ? DONATION_AMOUNTS.find(d => d.id === selectedAmount)?.label : ''}
        </Text>
      </TouchableOpacity>

      {/* Trust Indicators */}
      <View style={styles.trustSection}>
        <View style={styles.trustItem}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <Text style={styles.trustText}>Secure Payment via Stripe</Text>
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

const ThankYouMessage = ({ 
  message, 
  amount 
}: { 
  message: string; 
  amount?: number;
}) => (
  <View style={styles.thankYouContainer}>
    <View style={styles.thankYouCard}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
      </View>
      
      <Text style={styles.thankYouTitle}>Thank You!</Text>
      {amount && (
        <Text style={styles.donationAmount}>Your ${amount} donation</Text>
      )}
      <Text style={styles.thankYouMessage}>{message}</Text>
      
      <View style={styles.nextSteps}>
        <Text style={styles.nextStepsTitle}>What happens next:</Text>
        <View style={styles.stepItem}>
          <Ionicons name="mail" size={16} color="#007AFF" />
          <Text style={styles.stepText}>Receipt sent to your email</Text>
        </View>
        <View style={styles.stepItem}>
          <Ionicons name="document" size={16} color="#007AFF" />
          <Text style={styles.stepText}>Tax deductible documentation</Text>
        </View>
        <View style={styles.stepItem}>
          <Ionicons name="heart" size={16} color="#007AFF" />
          <Text style={styles.stepText}>Your impact report monthly</Text>
        </View>
      </View>

      <View style={styles.shareSection}>
        <Text style={styles.shareTitle}>Spread the Word</Text>
        <Text style={styles.shareSubtitle}>Help others discover RefWord FM</Text>
        
        <View style={styles.shareButtons}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export default function DonationApp() {
  const [message, setMessage] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("10"); // Default to popular option
  const [customAmount, setCustomAmount] = useState("");
  const [donatedAmount, setDonatedAmount] = useState<number>();

  useEffect(() => {
    // Handle return from Stripe Checkout
    const urlCheck = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const query = new URLSearchParams(initialUrl.split("?")[1]);

        if (query.get("success")) {
          const amount = query.get("amount");
          setDonatedAmount(amount ? parseInt(amount) : undefined);
          setMessage("Your generous donation has been received! You will receive an email confirmation shortly. Thank you for supporting RefWord FM's ministry.");
        }
        if (query.get("canceled")) {
          setMessage("Donation was canceled. No worries - you can still support us anytime you're ready. Every contribution, big or small, makes a difference in our ministry.");
        }
      }
    };
    urlCheck();
  }, []);

  const handleCheckout = async (amount: number) => {
    try {
      // Call your backend to create a Checkout session
      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: 'usd',
          description: `Donation to RefWord FM - $${amount}`,
        }),
      });
      
      const data = await res.json();

      if (data.url) {
        await Linking.openURL(data.url); // Open Stripe Checkout in browser
      }
    } catch (err) {
      console.error("Checkout error:", err);
      Alert.alert(
        "Connection Error", 
        "Unable to process donation at this time. Please try again later or contact support."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {message ? (
        <ThankYouMessage message={message} amount={donatedAmount} />
      ) : (
        <DonationSelection 
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          onCheckout={handleCheckout}
        />
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

  // Amount Selection
  amountSection: {
    padding: 20,
  },
  amountTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  amountButton: {
    width: (width - 60) / 2,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  amountButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
  },
  popularButton: {
    borderColor: '#4CAF50',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  amountLabelSelected: {
    color: '#007AFF',
  },
  amountDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  amountDescriptionSelected: {
    color: '#007AFF',
  },

  // Custom Amount
  customAmountSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  customAmountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  customAmountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingHorizontal: 15,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 15,
    color: '#333',
  },

  // Donation Type
  typeSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  typeButtonTextInactive: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  typeNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },

  // Donate Button
  donateButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  donateButtonDisabled: {
    backgroundColor: '#ccc',
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

  // Thank You Styles
  thankYouContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  thankYouCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  successIcon: {
    marginBottom: 20,
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  donationAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 15,
  },
  thankYouMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  nextSteps: {
    alignSelf: 'stretch',
    marginBottom: 25,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  shareSection: {
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  shareSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  shareButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});