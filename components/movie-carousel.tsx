import { useTmdb } from "@/hooks/useTmdb";
import { useTmdbStore } from "@/store/tmdb-store";
import type { Movie } from "@/types/app-types";
import * as React from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH * 0.56 + 40;

export type MovieCarouselProps = {
  movies: Movie[];
  onPressMovie?: (movie: Movie) => void;
};

export function MovieCarousel({
  movies,
  onPressMovie,
}: MovieCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { getGenresFromIds } = useTmdb();
  return (
    <View className="items-center mt-2 mb-4">
      <Carousel
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        data={movies}
        loop={false}
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        scrollAnimationDuration={500}
        onSnapToItem={setActiveIndex}
        renderItem={({ item }) => {
          const displayGenre = getGenresFromIds(item.genre_ids ?? []).slice(0, 2).join(', ');
          return (
            <Pressable
              onPress={() => onPressMovie?.(item)}
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT - 20 }}
              accessibilityRole="button"
              accessibilityLabel={`View details for ${item.title}`}
            >
              {item.poster_path ? (
                <>
                  <Image
                    source={{
                      uri: `http://image.tmdb.org/t/p/w780${item.backdrop_path}`,
                    }}
                    className="w-full h-full"
                    style={{ width: CARD_WIDTH, height: CARD_HEIGHT - 20 }}
                    resizeMode="cover"
                  />
                  {/* Dark overlay */}
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.35)",
                    }}
                  />
                </>
              ) : (
                <View className="w-full h-full bg-neutral-700 items-center justify-center">
                  <Text className="text-neutral-400">No Image</Text>
                </View>
              )}
              {/* Overlay */}
              <View className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/80 to-transparent">
                <Text
                  className="text-white text-lg font-bold mb-1"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-neutral-200 text-xs mb-1"
                  numberOfLines={1}
                >
                  {displayGenre}
                </Text>
                <Text className="text-neutral-300 text-xs">
                  On{" "}
                  {item.release_date
                    ? new Date(item.release_date).toLocaleDateString(
                        undefined,
                        { month: "long", day: "numeric", year: "numeric" }
                      )
                    : "Unknown"}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-3">
        {movies.map((_, idx) => (
          <View
            key={idx}
            className={`mx-1 rounded-full ${activeIndex === idx ? "bg-cyan-400" : "bg-neutral-600"}`}
            style={{ width: 10, height: 10 }}
          />
        ))}
      </View>
    </View>
  );
}
