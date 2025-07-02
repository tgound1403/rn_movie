import * as React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  IconComponent: React.ComponentType<any>;
};

export function HomeHeader({ IconComponent }: Props) {
  return (
    <View className="flex-row items-center justify-between mb-4 px-4">
      <View className="flex-row items-center">
        <View>
          <Text className="text-2xl font-semibold text-white">The Movie DB</Text>
          <Text className="text-md text-neutral-400">Let&apos;s find and save your favorite movie</Text>
        </View>
      </View>
    </View>
  );
} 