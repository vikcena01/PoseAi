import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, BookmarkCheck } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

// Sample data for poses
const POSE_CATEGORIES = [
  { id: 'portrait', name: 'Portrait', active: true },
  { id: 'fashion', name: 'Fashion', active: false },
  { id: 'casual', name: 'Casual', active: false },
  { id: 'couple', name: 'Couples', active: false },
  { id: 'group', name: 'Group', active: false },
  { id: 'business', name: 'Business', active: false },
];

const POSES = [
  {
    id: '1',
    title: 'Natural Portrait',
    imageUrl: 'https://images.pexels.com/photos/2709386/pexels-photo-2709386.jpeg',
    category: 'portrait',
    likes: 289,
    difficulty: 'Easy',
  },
  {
    id: '2',
    title: 'Urban Style',
    imageUrl: 'https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg',
    category: 'fashion',
    likes: 532,
    difficulty: 'Medium',
  },
  {
    id: '3',
    title: 'Classic Pose',
    imageUrl: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg',
    category: 'portrait',
    likes: 421,
    difficulty: 'Easy',
  },
  {
    id: '4',
    title: 'Casual Look',
    imageUrl: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg',
    category: 'casual',
    likes: 178,
    difficulty: 'Easy',
  },
  {
    id: '5',
    title: 'Editorial Fashion',
    imageUrl: 'https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg',
    category: 'fashion',
    likes: 673,
    difficulty: 'Advanced',
  },
  {
    id: '6',
    title: 'Studio Portrait',
    imageUrl: 'https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg',
    category: 'portrait',
    likes: 345,
    difficulty: 'Medium',
  },
];

export default function PosesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [categories, setCategories] = useState(POSE_CATEGORIES);
  const [filteredPoses, setFilteredPoses] = useState(POSES);
  const [selectedCategory, setSelectedCategory] = useState('portrait');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCategories(
      categories.map((cat) => ({
        ...cat,
        active: cat.id === categoryId,
      }))
    );
    
    if (categoryId === 'all') {
      setFilteredPoses(POSES);
    } else {
      setFilteredPoses(POSES.filter((pose) => pose.category === categoryId));
    }
  };

  const renderPoseItem = ({ item }: { item: typeof POSES[0] }) => (
    <TouchableOpacity style={styles.poseCard}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.poseImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.poseInfo}>
        <Text style={styles.poseTitle}>{item.title}</Text>
        <View style={styles.poseDetails}>
          <Text style={styles.poseCategory}>{item.category}</Text>
          <Text style={styles.poseDifficulty}>{item.difficulty}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bookmarkButton}>
        <BookmarkCheck size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Pose Library</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.gray[200] }]}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.gray[200] }]}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                item.active && [styles.activeCategoryButton, { backgroundColor: colors.primary }],
              ]}
              onPress={() => handleCategorySelect(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  item.active && styles.activeCategoryText,
                  { color: item.active ? '#FFFFFF' : colors.text },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <FlatList
        data={filteredPoses}
        keyExtractor={(item) => item.id}
        renderItem={renderPoseItem}
        numColumns={2}
        contentContainerStyle={styles.posesGrid}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.posesRow}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.s,
  },
  categoriesContainer: {
    marginBottom: Layout.spacing.m,
  },
  categoryList: {
    paddingHorizontal: Layout.spacing.l,
  },
  categoryButton: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: 20,
    marginRight: Layout.spacing.s,
  },
  activeCategoryButton: {
    backgroundColor: '#2296F3',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  posesGrid: {
    paddingHorizontal: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl,
  },
  posesRow: {
    justifyContent: 'space-between',
  },
  poseCard: {
    width: '48%',
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: Layout.spacing.m,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  poseImage: {
    width: '100%',
    height: 200,
  },
  poseInfo: {
    padding: Layout.spacing.m,
  },
  poseTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  poseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  poseCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textTransform: 'capitalize',
  },
  poseDifficulty: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});