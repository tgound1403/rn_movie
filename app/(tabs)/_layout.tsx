import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import * as React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ICONS: { name: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { name: "home", label: "Home" },
  { name: "search", label: "Search" },
  { name: "heart", label: "Saved" },
];

function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="absolute left-4 right-4 flex-row justify-between items-center rounded-full bg-zinc-800 p-2 shadow-lg"
      style={{
        bottom: insets.bottom
      }}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = TAB_ICONS[index]?.name || "ellipse";
        const label = TAB_ICONS[index]?.label || route.name;
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            className={`flex-1 items-center justify-center py-2 rounded-full mx-1 ${isFocused ? "bg-cyan-500" : ""}`}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#fff" : "#a1a1aa"}
            />
            <Text
              className={`mt-0.5 text-xs ${isFocused ? "text-white font-bold" : "text-neutral-400"}`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
        <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
    </Tabs>
    </SafeAreaView>
  );
}
