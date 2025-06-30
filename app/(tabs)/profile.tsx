import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#181825] pt-8">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Title */}
        <Text className="text-white text-xl font-bold text-center mb-6">Profile</Text>
        {/* User Info Card */}
        <View className="flex-row items-center bg-[#232136] rounded-2xl px-4 py-4 mx-4 mb-4">
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
            className="w-14 h-14 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">Tiffany</Text>
            <Text className="text-neutral-400 text-sm">Tiffanyjearsey@gmail.com</Text>
          </View>
        </View>
        {/* Account Section */}
        <View className="bg-[#232136] rounded-2xl px-4 py-4 mx-4 mb-4">
          <Text className="text-white text-base font-bold mb-4">Account</Text>
          <View className="border-b border-[#35344a] pb-3 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="color-palette" size={22} color="#a1a1aa" />
              <Text className="text-white ml-3">Theme</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#06b6d4" />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="language" size={22} color="#a1a1aa" />
              <Text className="text-white ml-3">Change Language</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#06b6d4" />
          </View>
        </View>
        
        {/* Logout Button */}
        <Pressable className="mx-4 mt-2 mb-8 py-4 rounded-full border border-cyan-400 items-center" accessibilityRole="button">
          <Text className="text-cyan-400 text-lg font-bold">Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
} 