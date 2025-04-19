import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import * as MediaLibrary from 'expo-media-library';
import { BlurView } from 'expo-blur';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Info, Image as ImageIcon, FlipHorizontal, Settings } from 'lucide-react-native';

export default function CameraScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [isPosing, setIsPosing] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      requestPermission();
      requestMediaPermission();
    }
  }, []);

  const toggleCameraFacing = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const togglePoseMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPosing(current => !current);
  };

  const takePicture = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (cameraRef.current !== null) {
      try {
        const photo = await (cameraRef.current as CameraView).takePictureAsync({ quality: 0.8 });
        if (photo) {
          setPreviewPhoto(photo.uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo.');
      }
    }
  };

  const savePreviewPhoto = async () => {
    try {
      if (previewPhoto) {
        const asset = await MediaLibrary.createAssetAsync(previewPhoto);
        let album = await MediaLibrary.getAlbumAsync('MyAppPhotos');

        if (!album) {
          album = await MediaLibrary.createAlbumAsync('MyAppPhotos', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
        }

        setLastPhotoUri(asset.uri);
        setPreviewPhoto(null);
        Alert.alert('Saved', 'Photo saved to MyAppPhotos album!');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not save the photo.');
    }
  };

  const openSystemGallery = () => {
    Alert.alert(
      'Open Photos App',
      'Do you want to view your photos in the Photos app?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => Linking.openURL('photos-redirect://') },
      ]
    );
  };

  if (previewPhoto) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: previewPhoto }} style={styles.previewImage} />
        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.previewButton} onPress={() => setPreviewPhoto(null)}>
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.previewButton} onPress={savePreviewPhoto}>
            <Text style={styles.previewButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.infoText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      >
        {isPosing && (
          <View style={styles.poseGuidanceContainer}>
            <BlurView intensity={40} style={styles.tipContainer} tint="dark">
              <Text style={styles.tipText}>
                Try turning slightly to the right and raising your chin
              </Text>
            </BlurView>
          </View>
        )}

        <SafeAreaView style={styles.topControls}>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
            <FlipHorizontal size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView style={styles.bottomControls}>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.thumbnailButton} onPress={openSystemGallery}>
              {lastPhotoUri ? (
                <Image source={{ uri: lastPhotoUri }} style={styles.thumbnailImage} />
              ) : (
                <ImageIcon size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sideButton, isPosing && styles.activeSideButton]}
              onPress={togglePoseMode}
            >
              <Info size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  infoText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16 },
  topControls: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 16,
  },
  iconButton: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', alignItems: 'center',
  },
  bottomControls: {
    position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 30,
  },
  actionButtons: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  },
  sideButton: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 16,
  },
  activeSideButton: { backgroundColor: 'rgba(34, 150, 243, 0.7)' },
  captureButton: {
    width: 70, height: 70, borderRadius: 35, borderWidth: 4, borderColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)',
  },
  captureButtonInner: {
    width: 54, height: 54, borderRadius: 27, backgroundColor: '#FFF',
  },
  thumbnailButton: {
    width: 50, height: 50, borderRadius: 8,
    overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.4)', marginHorizontal: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  thumbnailImage: { width: '100%', height: '100%', contentFit: 'cover' } as any,
  previewContainer: {
    flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center',
  },
  previewImage: { width: '100%', height: '80%', contentFit: 'contain' } as any,
  previewActions: {
    flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: 20,
  },
  previewButton: {
    paddingHorizontal: 24, paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12,
  },
  previewButtonText: { color: '#FFF', fontSize: 16 },
  poseGuidanceContainer: { position: 'absolute', top: 100, left: 0, right: 0, alignItems: 'center' },
  tipContainer: {
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10,
    marginBottom: 20, width: '90%', overflow: 'hidden',
  },
  tipText: { color: '#FFF', fontSize: 14, textAlign: 'center' },
});
