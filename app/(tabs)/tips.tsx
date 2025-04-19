import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Camera, Lightbulb, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

const TIPS = [
  {
    id: '1',
    title: 'Natural Light Photography',
    description: 'Learn to use natural light for stunning portraits',
    image: 'https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg',
    category: 'Lighting',
    readTime: '5 min',
  },
  {
    id: '2',
    title: 'Perfect Portrait Poses',
    description: 'Master the art of posing for portraits',
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
    category: 'Posing',
    readTime: '7 min',
  },
  {
    id: '3',
    title: 'Camera Settings Guide',
    description: 'Essential camera settings for portrait photography',
    image: 'https://images.pexels.com/photos/1793525/pexels-photo-1793525.jpeg',
    category: 'Technical',
    readTime: '10 min',
  },
];

const CATEGORIES = [
  {
    id: 'lighting',
    name: 'Lighting',
    icon: <Lightbulb size={20} color="#FFFFFF" />,
  },
  {
    id: 'posing',
    name: 'Posing',
    icon: <Camera size={20} color="#FFFFFF" />,
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: <BookOpen size={20} color="#FFFFFF" />,
  },
];

export default function TipsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Photography Tips</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: colors.primary }]}
            >
              <View style={styles.categoryIcon}>{category.icon}</View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Tips</Text>
        
        {TIPS.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            style={[styles.tipCard, { backgroundColor: colors.gray[100] }]}
          >
            <Image
              source={{ uri: tip.image }}
              style={styles.tipImage}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.tipContent}>
              <View style={styles.tipHeader}>
                <Text style={[styles.tipCategory, { color: colors.primary }]}>
                  {tip.category}
                </Text>
                <Text style={[styles.tipReadTime, { color: colors.gray[600] }]}>
                  {tip.readTime}
                </Text>
              </View>
              <Text style={[styles.tipTitle, { color: colors.text }]}>{tip.title}</Text>
              <Text style={[styles.tipDescription, { color: colors.gray[600] }]}>
                {tip.description}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} style={styles.tipArrow} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginHorizontal: Layout.spacing.xs,
  },
  categoryIcon: {
    marginBottom: Layout.spacing.s,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  tipCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
  },
  tipImage: {
    width: '100%',
    height: 200,
  },
  tipContent: {
    padding: Layout.spacing.m,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  tipCategory: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  tipReadTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: Layout.spacing.xs,
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  tipArrow: {
    position: 'absolute',
    right: Layout.spacing.m,
    bottom: Layout.spacing.m,
  },
});