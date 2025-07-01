import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

type Props = {
  IconComponent: React.ComponentType<any>;
};

export function HomeHeader({ IconComponent }: Props) {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          className="w-12 h-12 rounded-full mr-3"
          accessibilityLabel="User avatar"
        />
        <View>
          <Text className="text-lg font-semibold text-white">Hello, Smith</Text>
          <Text className="text-xs text-neutral-400">Let's stream your favorite movie</Text>
        </View>
      </View>
      <Pressable accessibilityRole="button" className="p-2 rounded-full bg-neutral-800">
        <IconComponent name="heart" size={24} color="#ef4444" />
      </Pressable>
    </View>
  );
} 