
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  IconComponent: React.ComponentType<any>;
};

export function SectionHeader({ title, actionLabel, onActionPress, IconComponent }: Props) {
  return (
    <View className="flex-row items-center justify-between mt-2 mb-2">
      <Text className="text-white text-lg font-bold">{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onActionPress} accessibilityRole="button" className="flex-row items-center">
          <Text className="text-cyan-400 text-sm font-semibold mr-1">{actionLabel}</Text>
          <IconComponent name="chevron-forward" size={16} color="#06b6d4" />
        </Pressable>
      ) : null}
    </View>
  );
} 