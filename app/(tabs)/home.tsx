import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../../components/home/home-header';
import { MovieCard } from '../../components/movie-card';
import { MovieCarousel } from '../../components/movie-carousel';
import { SectionHeader } from '../../components/section-header';
import { getGenreNames, useTmdbStore } from '../../store/tmdb-store';
import { usePopularStore } from '@/store/movie/popular';
import { useTopRatedStore } from '@/store/movie/top-rated';
import { useTrendingStore } from '@/store/movie/trending';
import { MovieItem } from '@/components/movie-item';
import { useSavedStore } from '@/store/movie/saved';
import { initSavedDB } from '@/database/saved';

const HomeScreen = () => {
  const { genres, isLoading, error, fetchGenres, loadGenresFromStorage } = useTmdbStore();
  const { popularMovies, fetchPopular } = usePopularStore();
  const { topRatedMovies, fetchTopRated } = useTopRatedStore();
  const { trendingMovies, fetchTrending } = useTrendingStore();
  const { fetchSavedMovies } = useSavedStore();
  const router = useRouter();

  React.useEffect(() => {
    const initializeData = async () => {
      await initSavedDB();
      await loadGenresFromStorage();

      await Promise.all([
        popularMovies.length === 0 ? fetchPopular() : Promise.resolve(),
        topRatedMovies.length === 0 ? fetchTopRated() : Promise.resolve(),
        trendingMovies.length === 0 ? fetchTrending() : Promise.resolve(),
        fetchSavedMovies(),
        // Only fetch genres if we don't have them locally
        genres.length === 0 ? fetchGenres() : Promise.resolve()
      ]);
    };

    initializeData();
  }, [fetchPopular, fetchTopRated, fetchGenres, fetchTrending, loadGenresFromStorage, genres.length]);

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
          <SectionHeader
            title="#10 on Trending"
            actionLabel="See All"
            IconComponent={Ionicons}
            onActionPress={() => router.push('/trending')}
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
                <MovieItem movie={item} genres={getGenreNames(item.genre_ids ?? [], genres)} onPress={() => router.push(`/movie/${item.id}`)} />
              )}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
} 

export default HomeScreen;