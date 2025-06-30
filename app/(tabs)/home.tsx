import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../../components/home-header';
import { MovieCard } from '../../components/movie-card';
import { MovieCarousel } from '../../components/movie-carousel';
import { SearchBar } from '../../components/search-bar';
import { SectionHeader } from '../../components/section-header';
import { useTmdbStore } from '../../lib/tmdb-store';

export default function HomeScreen() {
  const { movies, topRatedMovies, genres, isLoading, error, fetchPopular, fetchTopRated, fetchGenres, loadGenresFromStorage } = useTmdbStore();
  const router = useRouter();

  React.useEffect(() => {
    const initializeData = async () => {
      // Load genres from storage first
      await loadGenresFromStorage();
      
      // Fetch fresh data
      await Promise.all([
        fetchPopular(),
        fetchTopRated(),
        // Only fetch genres if we don't have them locally
        genres.length === 0 ? fetchGenres() : Promise.resolve()
      ]);
    };

    initializeData();
  }, [fetchPopular, fetchTopRated, fetchGenres, loadGenresFromStorage, genres.length]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-neutral-900">
        <ScrollView className="flex-1 px-4 pt-4">
          <HomeHeader IconComponent={Ionicons} />
          <SearchBar IconComponent={Ionicons} />
          <SectionHeader
            title="Most popular"
            actionLabel="See All"
            IconComponent={Ionicons}
            onActionPress={() => router.push('/popular')}
          />
          {isLoading ? (
            <View className="flex-row justify-center py-8">
              <ActivityIndicator size="large" color="#06b6d4" />
            </View>
          ) : error ? (
            <View className="flex-row justify-center py-8">
              <Text className="text-red-400 text-base">{error}</Text>
            </View>
          ) : (
            <MovieCarousel
              movies={movies.slice(0, 7)}
              genres={genres}
              onPressMovie={(movie) => router.push(`/movie/${movie.id}`)}
            />
          )}
          
          <SectionHeader
            title="Top Rated"
            actionLabel="See All"
            IconComponent={Ionicons}
            onActionPress={() => router.push('/top-rated')}
          />
          {isLoading ? (
            <View className="flex-row justify-center py-8">
              <ActivityIndicator size="large" color="#06b6d4" />
            </View>
          ) : error ? (
            <View className="flex-row justify-center py-8">
              <Text className="text-red-400 text-base">{error}</Text>
            </View>
          ) : (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {topRatedMovies.slice(0, 7).map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  {...movie} 
                  genres={genres} 
                  IconComponent={Ionicons}
                  onPress={() => router.push(`/movie/${movie.id}`)}
                />
              ))}
            </ScrollView>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
} 