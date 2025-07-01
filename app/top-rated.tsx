import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGenreNames, useTmdbStore } from '../store/tmdb-store';
import { useTopRatedStore } from '@/store/movie/top-rated';
import { MovieItem } from '@/components/movie-item';

export default function TopRatedScreen() {
  const { topRatedMovies } = useTopRatedStore();
  const { genres } = useTmdbStore();
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
          const movieGenres = (movie.genre_ids && genres) ? getGenreNames(movie.genre_ids, genres) : [];
          return (
            <MovieItem key={movie.id} movie={movie} genres={movieGenres} onPress={() => router.push(`/movie/${movie.id}`)} />      
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}