import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  Pressable,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MovieItem } from "@/components/movie-item";
import { Movie } from "@/types/app-types";
import { usePopularStore } from "@/store/movie/popular";

export default function PopularScreen() {
  const router = useRouter();

  const { fetchNextPage, isPopularLoading, popularMovies } = usePopularStore();

  const loadMovies = useCallback(async () => {
    try {
      await fetchNextPage();
    } catch (e) {
      console.error("Error loading movies:", e);
    }
  }, [fetchNextPage]);

  React.useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const renderItem = React.useCallback(({ item }: { item: Movie }) => (
    <MovieItem movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
  ), [router]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4 pt-4">
      <View className="flex-row items-center mb-4">
        <Pressable
          onPress={() => router.back()}
          className="p-2 rounded-full bg-neutral-800 mr-2"
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text className="text-white text-2xl font-bold flex-1">
          Most Popular Movie
        </Text>
      </View>
      <FlatList
        data={popularMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isPopularLoading ? <ActivityIndicator size="large" color="#06b6d4" /> : null
        }
      />
    </SafeAreaView>
  );
}
