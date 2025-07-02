import { View, Text, FlatList, Pressable, Image } from "react-native";
import * as React from "react";
import { useSavedStore } from "@/store/movie/saved";
import { SavedMovie } from "@/database/saved";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTmdb } from "@/hooks/useTmdb";

export default function SavedScreen() {
  const { removeMovie } = useSavedStore();
  const { savedMovies } = useTmdb();

  const SavedMovieItem = ({ movie }: { movie: SavedMovie }) => {
    return (
      <Pressable onPress={() => router.push(`/movie/${movie.movie_id}`)} className="flex-row bg-neutral-800 rounded-2xl mb-4">
        <View className="flex-row bg-neutral-800 p-4 rounded-2xl">
        <View className="">
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w500${movie.movie_backdrop}`,
            }}
            className="h-48 rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-white text-lg font-bold mt-2">
            {movie.movie_title}
          </Text>
          <Text numberOfLines={4} className="text-neutral-400 text-sm mt-2">
            {movie.movie_overview}
          </Text>
        </View>
        <View className="absolute top-0 right-0"> 
          <Pressable
            onPress={() => removeMovie(movie.movie_id)}
            className="p-2 rounded-full bg-neutral-700"
          >
            <Ionicons name="trash" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 w-screen h-screen items-center justify-center bg-neutral-900 p-4">
      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <SavedMovieItem movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-white flex-1 items-center justify-center text-xl">
            No saved movies
          </Text>
        }
      />
    </View>
  );
}
