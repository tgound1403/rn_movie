import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTmdbStore } from '../../lib/tmdb-store';

function getYear(date?: string) {
  return date ? new Date(date).getFullYear() : '-';
}

function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'Unknown';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

function formatCurrency(amount: number): string {
  if (amount === 0) return 'Unknown';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movieDetail, isLoading, error, fetchMovieDetail } = useTmdbStore();
  const router = useRouter();

  React.useEffect(() => {
    if (id) {
      fetchMovieDetail(parseInt(id));
    }
  }, [id, fetchMovieDetail]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-900 justify-center items-center">
        <Text className="text-white text-lg">Loading movie details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-900 justify-center items-center">
        <Text className="text-red-400 text-lg">{error}</Text>
        <Pressable 
          onPress={() => router.back()} 
          className="mt-4 bg-orange-400 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!movieDetail) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-900 justify-center items-center">
        <Text className="text-white text-lg">Movie not found.</Text>
        <Pressable 
          onPress={() => router.back()} 
          className="mt-4 bg-orange-400 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const displayGenres = movieDetail.genres.length > 0 
    ? movieDetail.genres.slice(0, 3).map(g => g.name).join(', ') 
    : 'Unknown';

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-4">
          <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-neutral-800 mr-2">
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <Text className="text-white text-xl font-bold flex-1" numberOfLines={1}>{movieDetail.title}</Text>
          <Pressable className="p-2 rounded-full bg-neutral-800 ml-2">
            <Ionicons name="heart" size={24} color="#ef4444" />
          </Pressable>
        </View>

        {/* Poster */}
        <View className="items-center mt-4">
          <Image
            source={movieDetail.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` } : undefined}
            className="w-64 h-96 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* Info Row */}
        <View className="flex-row items-center justify-center mt-4 mb-2 gap-x-6">
          <View className="flex-row items-center">
            <Ionicons name="calendar" size={18} color="#a1a1aa" />
            <Text className="text-neutral-400 text-base ml-1">{getYear(movieDetail.release_date)}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time" size={18} color="#a1a1aa" />
            <Text className="text-neutral-400 text-base ml-1">{formatRuntime(movieDetail.runtime)}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="film" size={18} color="#a1a1aa" />
            <Text className="text-neutral-400 text-base ml-1">{displayGenres}</Text>
          </View>
        </View>

        {/* Rating */}
        <View className="flex-row items-center justify-center mb-4">
          <Ionicons name="star" size={18} color="#fbbf24" />
          <Text className="text-orange-300 text-base font-bold ml-1">{movieDetail.vote_average?.toFixed(1) ?? '-'}</Text>
          <Text className="text-neutral-400 text-sm ml-2">({movieDetail.vote_count.toLocaleString()} votes)</Text>
        </View>

        {/* Play/Download/Share Buttons */}
        <View className="flex-row items-center justify-center mb-6 gap-x-4">
          <Pressable className="bg-orange-400 flex-row items-center px-8 py-3 rounded-full mr-2">
            <Ionicons name="play" size={22} color="#fff" />
            <Text className="text-white text-lg font-bold ml-2">Play</Text>
          </Pressable>
          <Pressable className="bg-neutral-800 p-4 rounded-full">
            <Ionicons name="download" size={22} color="#fff" />
          </Pressable>
          <Pressable className="bg-neutral-800 p-4 rounded-full">
            <Ionicons name="share-social" size={22} color="#06b6d4" />
          </Pressable>
        </View>

        {/* Storyline */}
        <View className="px-6 mb-6">
          <Text className="text-white text-lg font-bold mb-2">Story Line</Text>
          <Text className="text-neutral-300 text-base leading-6">
            {movieDetail.overview || 'No overview available.'}
          </Text>
        </View>

        {/* Additional Details */}
        <View className="px-6 mb-6">
          <Text className="text-white text-lg font-bold mb-4">Details</Text>

          {/* Original Language */}
          <View className="flex-row items-center mb-3">
            <Text className="text-neutral-400 text-base w-20">Language:</Text>
            <Text className="text-white text-base flex-1">{movieDetail.original_language.toUpperCase()}</Text>
          </View>

          {/* Budget */}
          <View className="flex-row items-center mb-3">
            <Text className="text-neutral-400 text-base w-20">Budget:</Text>
            <Text className="text-white text-base flex-1">{formatCurrency(movieDetail.budget)}</Text>
          </View>

          {/* Revenue */}
          <View className="flex-row items-center mb-3">
            <Text className="text-neutral-400 text-base w-20">Revenue:</Text>
            <Text className="text-white text-base flex-1">{formatCurrency(movieDetail.revenue)}</Text>
          </View>

        </View>

        {/* Cast and Crew (placeholder) */}
        <View className="px-6 mb-8">
          <Text className="text-white text-lg font-bold mb-2">Cast and Crew</Text>
          <Text className="text-neutral-400">Not implemented</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 