import { MovieItem } from '@/components/movie-item';
import { useTmdb } from '@/hooks/useTmdb';
import { useTmdbStore } from '@/store/tmdb-store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../../components/home/home-header';
import { MovieCard } from '../../components/movie-card';
import { MovieCarousel } from '../../components/movie-carousel';
import { SectionHeader } from '../../components/section-header';
import { usePopularStore } from '@/store/movie/popular';
import { useTopRatedStore } from '@/store/movie/top-rated';
import { useTrendingStore } from '@/store/movie/trending';
import { useSavedStore } from '@/store/movie/saved';
import { useEffect, useRef } from 'react';
import { initSavedDB } from '@/database/saved';

const HomeScreen = () => {
  const { isLoading, error } = useTmdbStore();
  const { popularMovies, topRatedMovies, trendingMovies } = useTmdb();
  const router = useRouter();

  const isInitialized = useRef(false);
  
  const fetchPopularMovies = usePopularStore((state) => state.fetchPopular);
  const fetchTopRatedMovies = useTopRatedStore((state) => state.fetchTopRated);
  const fetchTrendingMovies = useTrendingStore((state) => state.fetchTrending);
  const fetchSavedMovies = useSavedStore((state) => state.fetchSavedMovies);
  const fetchGenres = useTmdbStore((state) => state.fetchGenres);
  const loadGenresFromStorage = useTmdbStore((state) => state.loadGenresFromStorage);

  useEffect(() => {
    const initializeData = async () => {
      if (isInitialized.current) return;
      
      console.log("Initializing TMDB data...");
      isInitialized.current = true;
      
      // Initialize database first
      await initSavedDB();
      
      // Load genres first (from storage if available)
      await loadGenresFromStorage();
      
      // Fetch all movie data in parallel
      await Promise.all([
        fetchPopularMovies(),
        fetchTopRatedMovies(),
        fetchTrendingMovies(),
        fetchSavedMovies(),
        fetchGenres()
      ]);
    };

    initializeData();
  }, [fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchSavedMovies, fetchGenres, loadGenresFromStorage]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-neutral-900">
        <ScrollView className="flex-1 px-4 pt-4 pb-10">
          <HomeHeader IconComponent={Ionicons} />
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
              movies={popularMovies.slice(0, 7)}
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
                  IconComponent={Ionicons}
                  onPress={() => router.push(`/movie/${movie.id}`)}
                />
              ))}
            </ScrollView>
          )}
          <SectionHeader
            title="#10 on Trending"
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
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              data={trendingMovies.slice(0, 10)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MovieItem 
                  movie={item} 
                  onPress={() => router.push(`/movie/${item.id}`)} 
                />
              )}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
} 

export default HomeScreen;