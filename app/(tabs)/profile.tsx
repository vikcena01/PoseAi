import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, LogOut, ChevronRight, Bell, Image as ImageIcon, Key, CircleHelp as HelpCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

// Sample user profile data
const USER_PROFILE = {
  name: 'Emma Johnson',
  email: 'emma.johnson@example.com',
  profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  photosCount: 48,
  proMember: true,
};

// Settings menu items
const SETTINGS_MENU = [
  {
    id: 'account',
    title: 'Account Settings',
    icon: <User size={20} color="#2296F3" />,
    hasToggle: false,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: <Bell size={20} color="#2296F3" />,
    hasToggle: true,
    toggled: true,
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: <Key size={20} color="#2296F3" />,
    hasToggle: false,
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: <ImageIcon size={20} color="#2296F3" />,
    hasToggle: false,
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: <HelpCircle size={20} color="#2296F3" />,
    hasToggle: false,
  },
  {
    id: 'logout',
    title: 'Log Out',
    icon: <LogOut size={20} color="#F44336" />,
    hasToggle: false,
    danger: true,
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [settingsMenu, setSettingsMenu] = useState(SETTINGS_MENU);

  const handleToggle = (id: string, value: boolean) => {
    setSettingsMenu(
      settingsMenu.map((item) =>
        item.id === id ? { ...item, toggled: value } : item
      )
    );
  };

  const renderSettingItem = ({ item }: { item: typeof SETTINGS_MENU[0] }) => (
    <TouchableOpacity 
      style={[
        styles.settingItem, 
        { borderBottomColor: colors.gray[200] }
      ]}
    >
      <View style={styles.settingItemLeft}>
        {item.icon}
        <Text 
          style={[
            styles.settingItemText, 
            { color: item.danger ? colors.error : colors.text }
          ]}
        >
          {item.title}
        </Text>
      </View>
      {item.hasToggle ? (
        <Switch
          value={item.toggled}
          onValueChange={(value) => handleToggle(item.id, value)}
          trackColor={{ false: colors.gray[300], true: colors.primary + '70' }}
          thumbColor={item.toggled ? colors.primary : colors.gray[100]}
        />
      ) : (
        <ChevronRight size={20} color={colors.gray[400]} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: USER_PROFILE.profileImage }}
          style={styles.profileImage}
          contentFit="cover"
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {USER_PROFILE.name}
          </Text>
          <Text style={[styles.profileEmail, { color: colors.gray[600] }]}>
            {USER_PROFILE.email}
          </Text>
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {USER_PROFILE.photosCount}
              </Text>
              <Text style={[styles.statLabel, { color: colors.gray[600] }]}>Photos</Text>
            </View>
            {USER_PROFILE.proMember && (
              <View 
                style={[
                  styles.proBadge, 
                  { backgroundColor: colors.accent + '20' }
                ]}
              >
                <Text style={[styles.proBadgeText, { color: colors.accent }]}>PRO</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
        <FlatList
          data={settingsMenu}
          keyExtractor={(item) => item.id}
          renderItem={renderSettingItem}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.versionInfo}>
        <Text style={[styles.versionText, { color: colors.gray[500] }]}>
          PoseAI v1.0.0
        </Text>
      </View>
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.l,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: Layout.spacing.m,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  proBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  proBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  settingsSection: {
    flex: 1,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: Layout.spacing.m,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: Layout.spacing.m,
  },
  versionInfo: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});