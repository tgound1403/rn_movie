import * as React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import type { Genre, Movie } from '../api/tmdb';
import { getGenreNames } from '../lib/tmdb-store';

export type MovieListProps = {
  movies: Movie[];
  genres?: Genre[];
  onPressMovie?: (movie: Movie) => void;
};

export function MovieList({ movies, genres, onPressMovie }: MovieListProps) {
  const getMovieGenres = React.useCallback((genreIds?: number[]) => {
    if (genreIds && genres) {
      return getGenreNames(genreIds, genres);
    }
    return [];
  }, [genres]);

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => {
        const movieGenres = getMovieGenres(item.genre_ids);
        const displayGenres = movieGenres.length > 0 ? movieGenres.slice(0, 2).join(', ') : '';

        return (
          <Pressable
            className="flex-row mb-4 items-center bg-white rounded-lg shadow p-2"
            onPress={() => onPressMovie?.(item)}
            accessibilityRole="button"
            accessibilityLabel={`View details for ${item.title}`}
          >
            {item.poster_path ? (
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w92${item.poster_path}` }}
                className="w-16 h-24 rounded mr-4"
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />
            ) : (
              <View className="w-16 h-24 bg-gray-200 rounded mr-4 items-center justify-center">
                <Text className="text-xs text-gray-500">No Image</Text>
              </View>
            )}
            <View className="flex-1">
              <Text className="text-base font-semibold text-black mb-1" numberOfLines={2}>{item.title}</Text>
              <Text className="text-xs text-gray-500 mb-1">{item.release_date}</Text>
              {displayGenres && (
                <Text className="text-xs text-blue-600" numberOfLines={1}>{displayGenres}</Text>
              )}
            </View>
          </Pressable>
        );
      }}
      showsVerticalScrollIndicator={false}
      accessibilityRole="list"
    />
  );
} 