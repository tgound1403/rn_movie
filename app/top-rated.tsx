import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieItem } from '@/components/movie-item';
import { useTmdb } from '@/hooks/useTmdb';

export default function TopRatedScreen() {
  const { topRatedMovies } = useTmdb();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4 pt-4">
      <View className="flex-row items-center mb-4">
        <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-neutral-800 mr-2">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text className="text-white text-2xl font-bold flex-1">Top Rated Movies</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {topRatedMovies.map((movie) => {
          return (
            <MovieItem key={movie.id} movie={movie} onPress={() => router.push(`/movie/${movie.id}`)} />      
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}