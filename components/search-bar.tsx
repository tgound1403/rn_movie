import * as React from 'react';
import { TextInput, View } from 'react-native';

type Props = {
  IconComponent: React.ComponentType<any>;
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ IconComponent, value, onChangeText }: Props) {
  return (
    <View className="flex-row items-center bg-neutral-800 rounded-full px-6 py-2 my-4">
      <IconComponent name="search" size={20} color="#a1a1aa" style={{ marginRight: 8 }} />
      <TextInput
        className="flex-1 text-white"
        placeholder="Search a title.."
        placeholderTextColor="#888"
        accessibilityLabel="Search movies"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
} 