import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieItem } from '@/components/movie-item';
import { useTopRatedStore } from '@/store/movie/top-rated';
import { useCallback } from 'react';
import { Movie } from '@/types/app-types';

export default function TopRatedScreen() {
  const router = useRouter();

  const {fetchNextPage, isTopRatedLoading, topRatedMovies} = useTopRatedStore()

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

  const renderItem = ({ item, index }: { item: Movie, index: number }) => (
    <View className="mb-4 flex-row items-center justify-between gap-4">
      {index <= 9 && <Text className={`text-white text-2xl font-bold mr-4 mb-4`}>#{index + 1}</Text>}
      <MovieItem movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4 pt-4">
      <View className="flex-row items-center mb-4 sticky top-0 bg-neutral-900">
        <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-neutral-800 mr-2">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text className="text-white text-2xl font-bold flex-1">Top Rated Movies</Text>
      </View>
      <FlatList 
        data={topRatedMovies} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => isTopRatedLoading ? <ActivityIndicator size="large" color="#06b6d4" /> : null}
      />
    </SafeAreaView>
  );
}