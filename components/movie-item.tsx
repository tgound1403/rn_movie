import { Movie } from "@/types/app-types";
import { Pressable, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { useTmdbStore } from "@/store/tmdb-store";
import { useTmdb } from "@/hooks/useTmdb";

type MovieItemProps = {
  movie: Movie;
  onPress?: (movie: Movie) => void;
};

export function MovieItem({ movie, onPress }: MovieItemProps) {
  const getYear = React.useCallback((date?: string) => {
    return date ? new Date(date).getFullYear() : "-";
  }, []);

  const { getGenresFromIds } = useTmdb();
  const displayGenres = getGenresFromIds(movie.genre_ids ?? []).slice(0, 2).join(', ');

  return (
    <Pressable
      key={movie.id}
      className="flex-row mb-6"
      onPress={() => onPress?.(movie)}
    >
      {/* Poster & Rating */}
      <View>
        <Image
          source={
            movie.poster_path
              ? { uri: `http://image.tmdb.org/t/p/w500${movie.poster_path}` }
              : undefined
          }
          className="w-28 h-40 rounded-2xl"
          resizeMode="cover"
        />
      </View>
      {/* Info */}
      <View className="flex-1 gap-2 ml-4 justify-center">
        {/* Rating */}
        <View className="border-2 border-yellow-600 py-1.5 px-3 flex-row items-center w-[60px] rounded-full">
          <Ionicons
            name="star"
            size={14}
            color="#fbbf24"
            style={{ marginRight: 2 }}
          />
          <Text className="text-orange-300 text-xs font-bold">
            {movie.vote_average?.toFixed(1) ?? "-"}
          </Text>
        </View>
        {/* Title */}
        <Text className="text-white text-lg font-bold mb-1" numberOfLines={1}>
          {movie.title}
        </Text>
        {/* Year, Duration, Rating */}
        <View className="flex-row items-center mb-1">
          <Ionicons name="calendar" size={16} color="#a1a1aa" />
          <Text className="text-neutral-400 text-sm ml-1 mr-4">
            {getYear(movie.release_date)}
          </Text>
          <Text className="text-cyan-400 text-xs font-bold px-2 py-0.5 border border-cyan-400 rounded-md">
            {movie.adult ? "Adult" : "PG-13"}
          </Text>
        </View>
        {/* Genre, Type */}
        <View className="flex-row items-center">
          <Ionicons name="film" size={16} color="#a1a1aa" />
          <Text className="text-neutral-400 text-sm ml-1 mr-4">
            {displayGenres}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
