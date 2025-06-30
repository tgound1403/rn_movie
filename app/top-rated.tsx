import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGenreNames, useTmdbStore } from '../lib/tmdb-store';

function getYear(date?: string) {
  return date ? new Date(date).getFullYear() : '-';
}

export default function TopRatedScreen() {
  const { topRatedMovies, genres } = useTmdbStore();
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
          const displayGenres = movieGenres.length > 0 ? movieGenres.slice(0, 2).join(', ') : 'Unknown';
          return (
            <Pressable
              key={movie.id}
              className="flex-row mb-6"
              onPress={() => router.push(`/movie/${movie.id}`)}
            >
              {/* Poster & Rating */}
              <View>
                <Image
                  source={movie.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` } : undefined}
                  className="w-28 h-40 rounded-2xl"
                  resizeMode="cover"
                />
                <View className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full flex-row items-center">
                  <Ionicons name="star" size={14} color="#fbbf24" style={{ marginRight: 2 }} />
                  <Text className="text-orange-300 text-xs font-bold">{movie.vote_average?.toFixed(1) ?? '-'}</Text>
                </View>
              </View>
              {/* Info */}
              <View className="flex-1 gap-2 ml-4 justify-center">
                {/* Title */}
                <Text className="text-white text-lg font-bold mb-1" numberOfLines={1}>{movie.title}</Text>
                {/* Year, Duration, Rating */}
                <View className="flex-row items-center mb-1">
                  <Ionicons name="calendar" size={16} color="#a1a1aa" />
                  <Text className="text-neutral-400 text-sm ml-1 mr-4">{getYear(movie.release_date)}</Text>
                  <Text className="text-cyan-400 text-xs font-bold px-2 py-0.5 border border-cyan-400 rounded-md">{movie.adult ? 'Adult' : 'PG-13'}</Text>
                </View>
                {/* Genre, Type */}
                <View className="flex-row items-center">
                  <Ionicons name="film" size={16} color="#a1a1aa" />
                  <Text className="text-neutral-400 text-sm ml-1 mr-4">{displayGenres}</Text>
                  <Text className="text-neutral-400 text-sm">Movie</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
} 