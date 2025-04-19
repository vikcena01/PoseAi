import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Upload, Check, Wand as Wand2, Sparkles as SparklesFilled, SquareSlash as SlashSquare, FileSliders as Sliders, Download, Share2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { BlurView } from 'expo-blur';

// Sample images for before/after demonstration
const SAMPLE_IMAGE = 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg';
const ENHANCED_IMAGE = 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg';

const ENHANCEMENT_OPTIONS = [
  {
    id: 'auto',
    name: 'Auto Enhance',
    icon: <Wand2 size={20} color="#FFFFFF" />,
    description: 'Automatically enhance your photo',
  },
  {
    id: 'retouch',
    name: 'Retouch',
    icon: <SparklesFilled size={20} color="#FFFFFF" />,
    description: 'Smooth skin and remove blemishes',
  },
  {
    id: 'background',
    name: 'Background',
    icon: <SlashSquare size={20} color="#FFFFFF" />,
    description: 'Blur or replace the background',
  },
  {
    id: 'adjust',
    name: 'Adjust',
    icon: <Sliders size={20} color="#FFFFFF" />,
    description: 'Fine-tune colors and lighting',
  },
];

export default function EditorScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);

  const handleUpload = () => {
    // In a real app, this would open the image picker
    setCurrentImage(SAMPLE_IMAGE);
    setEnhancedImage(null);
    setIsEnhanced(false);
  };

  const handleEnhance = (optionId: string) => {
    if (!currentImage) return;
    
    setSelectedOption(optionId);
    setIsEnhancing(true);
    
    // Simulate enhancement process
    setTimeout(() => {
      setEnhancedImage(ENHANCED_IMAGE);
      setIsEnhancing(false);
      setIsEnhanced(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>AI Photo Enhancer</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!currentImage ? (
          <View style={[styles.uploadContainer, { backgroundColor: colors.gray[100] }]}>
            <Upload size={48} color={colors.gray[400]} />
            <Text style={[styles.uploadText, { color: colors.text }]}>
              Upload a photo to enhance
            </Text>
            <TouchableOpacity
              style={[styles.uploadButton, { backgroundColor: colors.primary }]}
              onPress={handleUpload}
            >
              <Text style={styles.uploadButtonText}>Select Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editorContainer}>
            <View style={styles.imageContainer}>
              {isEnhancing ? (
                <View style={[styles.enhancingOverlay, { backgroundColor: colors.gray[100] }]}>
                  <Text style={[styles.enhancingText, { color: colors.text }]}>
                    Enhancing your photo...
                  </Text>
                  <View style={styles.loadingIndicator} />
                </View>
              ) : enhancedImage ? (
                <Image 
                  source={{ uri: enhancedImage }} 
                  style={styles.image}
                  contentFit="cover"
                />
              ) : (
                <Image 
                  source={{ uri: currentImage }} 
                  style={styles.image}
                  contentFit="cover"
                />
              )}
            </View>

            {isEnhanced && (
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                >
                  <Download size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                >
                  <Share2 size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Enhancement Options
            </Text>

            <View style={styles.optionsContainer}>
              {ENHANCEMENT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    { backgroundColor: colors.gray[100] },
                    selectedOption === option.id && { backgroundColor: colors.primary + '20' },
                  ]}
                  onPress={() => handleEnhance(option.id)}
                  disabled={isEnhancing}
                >
                  <View 
                    style={[
                      styles.optionIconContainer,
                      { backgroundColor: colors.primary },
                      selectedOption === option.id && { backgroundColor: colors.primary },
                    ]}
                  >
                    {option.icon}
                  </View>
                  <View style={styles.optionContent}>
                    <Text 
                      style={[
                        styles.optionTitle, 
                        { color: colors.text },
                        selectedOption === option.id && { color: colors.primary },
                      ]}
                    >
                      {option.name}
                    </Text>
                    <Text style={[styles.optionDescription, { color: colors.gray[600] }]}>
                      {option.description}
                    </Text>
                  </View>
                  {selectedOption === option.id && isEnhanced && (
                    <View style={styles.checkIndicator}>
                      <Check size={16} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.xl,
    padding: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.medium,
    height: 300,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
  },
  uploadButton: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  editorContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: Layout.spacing.m,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  enhancingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enhancingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: Layout.spacing.m,
  },
  loadingIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#2296F3',
    borderTopColor: 'transparent',
    animationName: 'spin',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.spacing.l,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    marginHorizontal: Layout.spacing.s,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: Layout.spacing.m,
  },
  optionsContainer: {
    marginBottom: Layout.spacing.xl,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  checkIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});