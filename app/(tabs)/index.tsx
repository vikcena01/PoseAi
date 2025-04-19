import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp as TrendUp, Award, Camera, Lightbulb, ChevronRight, Sparkles } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Link } from 'expo-router';

const SHOWCASE_PHOTOS = [
  {
    id: '1',
    title: 'Golden Hour Portrait',
    url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    category: 'Portrait',
  },
  {
    id: '2',
    title: 'Urban Fashion',
    url: 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg',
    category: 'Fashion',
  },
  {
    id: '3',
    title: 'Natural Pose',
    url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    category: 'Casual',
  },
];

const FEATURES = [
  {
    id: '1',
    title: 'Pose Guidance',
    description: 'Get real-time suggestions for perfect poses',
    icon: <Camera size={24} color="#FFFFFF" />,
    route: '/camera',
  },
  {
    id: '2',
    title: 'Browse Poses',
    description: 'Find inspiration for your next photoshoot',
    icon: <TrendUp size={24} color="#FFFFFF" />,
    route: '/poses',
  },
  {
    id: '3',
    title: 'AI Enhancement',
    description: 'Transform your photos with one-tap editing',
    icon: <Sparkles size={24} color="#FFFFFF" />,
    route: '/editor',
  },
  {
    id: '4',
    title: 'Tips & Tricks',
    description: 'Learn photography skills from professionals',
    icon: <Lightbulb size={24} color="#FFFFFF" />,
    route: '/tips',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('For You');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>PoseAI</Text>
          <View style={styles.headerBadge}>
            <Award size={14} color={colors.accent} />
            <Text style={[styles.headerBadgeText, { color: colors.accent }]}>PRO</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {['For You', 'Trending', 'New'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && [styles.activeTab, { backgroundColor: colors.primary }],
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                { color: activeTab === tab ? '#FFFFFF' : colors.text },
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Inspiration</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.showcaseContainer}
        >
          {SHOWCASE_PHOTOS.map((photo) => (
            <TouchableOpacity key={photo.id} style={styles.showcaseItem}>
              <Image
                source={{ uri: photo.url }}
                style={styles.showcaseImage}
                contentFit="cover"
                transition={300}
              />
              <View style={styles.showcaseOverlay}>
                <Text style={styles.showcaseTitle}>{photo.title}</Text>
                <Text style={styles.showcaseCategory}>{photo.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresContainer}>
          {FEATURES.map((feature) => (
            <Link key={feature.id} href={feature.route as any} asChild>
              <TouchableOpacity
  style={[
    styles.featureCard,
    { backgroundColor: colorScheme === 'dark' ? colors.gray[800] : colors.gray[100] },
  ]}
>
  <View style={styles.featureLeft}>
    <View style={[styles.featureIconContainer, { backgroundColor: colors.primary }]}>
      {feature.icon}
    </View>

    <View style={styles.featureContent}>
      <View style={styles.featureTitleRow}>
        <Text
          style={[styles.featureTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {feature.title}
        </Text>
        <ChevronRight
          size={16}
          color={colors.gray[400]}
          style={styles.featureChevron}
        />
      </View>

      <Text
        style={[styles.featureDescription, { color: colors.gray[600] }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {feature.description}
      </Text>
    </View>
  </View>
</TouchableOpacity>

            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.l,
    paddingBottom: Layout.spacing.m,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  headerBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
    flexWrap: 'nowrap',
  },
  tab: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: 20,
    marginRight: Layout.spacing.s,
    flexShrink: 1,
  },
  activeTab: {
    backgroundColor: '#2296F3',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  showcaseContainer: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
  },
  showcaseItem: {
    width: 280,
    height: 180,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    marginRight: Layout.spacing.m,
  },
  showcaseImage: {
    width: '100%',
    height: '100%',
  },
  showcaseOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.m,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  showcaseTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  showcaseCategory: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    opacity: 0.8,
  },
  featuresContainer: {
    paddingHorizontal: Layout.spacing.m,
    paddingBottom: Layout.spacing.s,
  },
  featureCard: {
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.s,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // wraps icon + content
  featureLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Layout.spacing.s,
  },
  
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.s,
  },
  
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  
  featureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: 4,
    marginTop: 4
  },
  
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    flexShrink: 2,
  },
  
  featureChevron: {
    marginLeft: 7,
    flexShrink: 0,
    alignSelf: 'center',
    marginTop: 3
  },
  
  featureDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  
});
