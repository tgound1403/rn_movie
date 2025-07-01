import type { Movie } from "@/types/app-types";
import { MovieItem } from "@/components/movie-item";
import { SearchBar } from "@/components/search-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSearchStore } from "@/store/movie/search";
import { getGenreNames, useTmdbStore } from "@/store/tmdb-store";
import { useTrendingStore } from "@/store/movie/trending";

export default function SearchScreen() {
  const [query, setQuery] = React.useState("");
  const { search, searchResults, clearSearch } = useSearchStore();
  const { trendingMovies, fetchTrending } = useTrendingStore();
  const { genres } = useTmdbStore();

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  function debounce<T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
  ): (...args: T) => void {
    let timer: NodeJS.Timeout | null = null;
    return (...args: T) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.call(null, ...args);
      }, delay);
    };
  }

  const handleSearch = debounce((query: string) => {
    search(query, 1);
  }, 1000);

  const handleCancel = () => {
    setQuery("");
    clearSearch();
  };

  return (
    <View className="flex-1 bg-neutral-900 pt-10 px-4">
      <View className="flex-row items-center mb-2">
        <View className="flex-1">
          <SearchBar
            IconComponent={Ionicons}
            value={query}
            onChangeText={(v) => {
              setQuery(v);
              handleSearch(query);
            }}
          />
        </View>
        {searchResults.length > 0 && <Pressable
          className="ml-2"
          accessibilityRole="button"
          onPress={handleCancel}
        >
          <Text className="text-cyan-400 text-base">Cancel</Text>
        </Pressable>}
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            genres={getGenreNames(item.genre_ids ?? [], genres)}
            onPress={handleMoviePress}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="mt-4">
            <Text className="text-white text-lg font-bold mb-2">Top 3 on Trending Movies</Text>
            <FlatList
            data={trendingMovies.slice(0, 3)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieItem
                movie={item}
                genres={getGenreNames(item.genre_ids ?? [], genres)}
                onPress={handleMoviePress}
              />
            )}
          />
          <Text className="text-white text-center text-lg font-bold mb-2"></Text>
          </View>
        )}
      />
    </View>
  );
}
