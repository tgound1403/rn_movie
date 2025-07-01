import type { Movie } from "@/types/app-types";
import { MovieItem } from "@/components/movie-item";
import { SearchBar } from "@/components/search-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSearchStore } from "@/store/tmdb-store";

export default function SearchScreen() {
  const [query, setQuery] = React.useState("");
  const { search, searchResults } = useSearchStore();

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    search(query, 1);
  };

  const handleCancel = () => {
    setQuery("");
  };

  return (
    <View className="flex-1 bg-[#181825] pt-10 px-4">
      <View className="flex-row items-center mb-2">
        <View className="flex-1">
          <SearchBar
            IconComponent={Ionicons}
            value={query}
            onChangeText={handleSearch}
          />
        </View>
        <Pressable
          className="ml-2"
          accessibilityRole="button"
          onPress={handleCancel}
        >
          <Text className="text-cyan-400 text-base">Cancel</Text>
        </Pressable>
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieItem movie={item} genres={[]} onPress={handleMoviePress} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
