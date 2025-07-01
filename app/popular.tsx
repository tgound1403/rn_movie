import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGenreNames, useTmdbStore } from '../store/tmdb-store';
import { usePopularStore } from '@/store/movie/popular';
import { MovieItem } from '@/components/movie-item';

export default function PopularScreen() {
  const { genres } = useTmdbStore();
  const { popularMovies } = usePopularStore();
  const router = useRouter();

  const getMovieGenres = React.useCallback((genreIds?: number[]) => {
    if (genreIds && genres) {
      return getGenreNames(genreIds, genres);
    }
    return [];
  }, [genres]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4 pt-4">
      <View className="flex-row items-center mb-4">
        <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-neutral-800 mr-2">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text className="text-white text-2xl font-bold flex-1">Most Popular Movie</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {popularMovies.map((movie) => {
          const movieGenres = getMovieGenres(movie.genre_ids);
          return (
           <MovieItem key={movie.id} movie={movie} genres={movieGenres} onPress={() => router.push(`/movie/${movie.id}`)} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
} 