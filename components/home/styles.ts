import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  tagline: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
  },

  // Announcement Ticker
  tickerContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  tickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerIcon: {
    marginRight: 8,
  },
  tickerText: {
    flex: 1,
    fontSize: 14,
    color: '#D1940C',
    fontWeight: '500',
  },

  // Listen Live Button
  listenLiveContainer: {
    marginBottom: 25,
  },
  listenLiveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    width: '100%'
  },
  listenLiveButtonActive: {
    backgroundColor: '#FF3B30',
  },
  listenLiveIcon: {
    marginRight: 12,
  },
  listenLiveTextContainer: {
    flex: 1,
  },
  listenLiveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  listenLiveSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },

  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  playlistItem: {
    // marginRight: 5,
    alignItems: 'center',
    width: 90,
  },
  playlistImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 8,
  },
  playlistInfo: {
    alignItems: 'center',
  },
  playlistTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 2,
  },
  liveIndicatorSmall: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  liveTextSmall: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },

  // Now Playing Card
  nowPlayingCard: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 300,
    position: 'relative',
  },
  nowPlayingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nowPlayingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    padding: 15,
  },
  nowPlayingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveIndicator: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  liveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listenerCount: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  nowPlayingSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 5,
  },
  showInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  hostText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    marginLeft: 5,
  },

  // Featured Podcasts
  podcastGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  podcastItem: {
    width: (width - 60) / 2,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  podcastImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  podcastTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  podcastHost: {
    fontSize: 12,
    color: '#666',
  },
  liveIndicatorPodcast: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },

  // Bottom Player
  bottomPlayer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  controlButton: {
    width: 30,
    height: 30,
    backgroundColor: '#efeeeeff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.5,
    marginHorizontal: 15,
  },
  playButton: {
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  playButtonActive: {
    backgroundColor: '#0056b3',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  // Schedule Modal
  scheduleList: {
    flex: 1,
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  scheduleTime: {
    width: 80,
    marginRight: 12,
  },
  scheduleTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  scheduleDuration: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  scheduleInfo: {
    flex: 1,
    marginLeft: 15,
  },
  scheduleShow: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  scheduleHost: {
    fontSize: 14,
    color: '#666',
  },
  reminderButton: {
    padding: 8,
  },
  scheduleSectionHeader: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scheduleSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  allSchedleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#092bb3ff',
    marginBottom: 5,
  },
  scheduleSectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  alternateItem: {
    backgroundColor: '#f9f9f9',
  },
  alternateText: {
    color: '#666',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  // Settings Modal
  settingsList: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingInfo: {
    flex: 1,
    marginLeft: 7
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  // Chat Modal (kept for parity)
  chatMessages: {
    flex: 1,
    padding: 15,
  },
  chatMessage: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  chatUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  chatText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  chatTime: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  chatTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 5,
    resizeMode: 'cover',
  },
});

export default styles;
