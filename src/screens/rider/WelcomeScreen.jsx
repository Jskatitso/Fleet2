import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Fast & Reliable\nDelivery',
    subtitle: 'Get your packages delivered quickly and safely across the city.',
    image: require('../../../assets/logo.png'),
  },
  {
    id: '2',
    title: 'Top Restaurants as\nPickup Points',
    subtitle: 'Conveniently drop off or pick up your packages at top-rated local restaurants nearest within 100m.',
    image: require('../../../assets/logo.png'),
  },
  {
    id: '3',
    title: 'Secure Payments &\nLive Tracking',
    subtitle: 'Enjoy peace of mind with real-time package updates and highly secure, seamless payment options.',
    image: require('../../../assets/logo.png'),
  },
];

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('UserType');
    }
  };

  const handleSkip = () => {
    navigation.replace('UserType');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      {/* Illustration area */}
      <View style={styles.illustrationBox}>
        <Image source={item.image} style={styles.illustration} resizeMode="contain" />
      </View>

      {/* Text */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={styles.flatList}
      />

      {/* Bottom area */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipBtn: {
    position: 'absolute',
    top: 52,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  illustrationBox: {
    width: width * 0.75,
    height: width * 0.65,
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  illustration: {
    width: '60%',
    height: '60%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
    gap: 20,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#0F172A',
  },
  nextBtn: {
    width: '100%',
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default WelcomeScreen;