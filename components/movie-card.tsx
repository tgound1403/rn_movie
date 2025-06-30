import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { Genre } from '../api/tmdb';
import { getGenreNames } from '../lib/tmdb-store';

type Props = {
  title: string;
  genre_ids?: number[];
  genres?: Genre[];
  vote_average?: number;
  poster_path?: string | null;
  IconComponent: React.ComponentType<any>;
  onPress?: () => void;
};

export function MovieCard({ title, genre_ids, genres, vote_average, poster_path, IconComponent, onPress }: Props) {
  const genreNames = React.useMemo(() => {
    if (genre_ids && genres) {
      return getGenreNames(genre_ids, genres);
    }
    return [];
  }, [genre_ids, genres]);

  const displayGenre = genreNames.length > 0 ? genreNames.slice(0, 2).join(', ') : '';

  return (
    <Pressable onPress={onPress} className="w-36 mr-4">
      <View className="bg-neutral-800 rounded-xl overflow-hidden">
        {poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            className="w-full h-48"
            accessibilityLabel={title}
          />
        ) : (
          <View className="w-full h-48 bg-neutral-700 items-center justify-center">
            <Text className="text-neutral-400">No Image</Text>
          </View>
        )}
        <View className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-full flex-row items-center">
          <IconComponent name="star" size={14} color="#fbbf24" style={{ marginRight: 2 }} />
          <Text className="text-white text-xs font-bold">{vote_average?.toFixed(1) ?? '-'}</Text>
        </View>
        <View className="p-2">
          <Text className="text-white text-sm font-semibold" numberOfLines={1}>{title}</Text>
          <Text className="text-neutral-400 text-xs" numberOfLines={1}>{displayGenre}</Text>
        </View>
      </View>
    </Pressable>
  );
} 