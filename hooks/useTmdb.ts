import { usePopularStore } from "@/store/movie/popular";
import { useSavedStore } from "@/store/movie/saved";
import { useTopRatedStore } from "@/store/movie/top-rated";
import { useTrendingStore } from "@/store/movie/trending";
import { useTmdbStore } from "@/store/tmdb-store";
import { useCallback } from "react";

export const useTmdb = () => {
  const popularMovies = usePopularStore((state) => state.popularMovies);
  const topRatedMovies = useTopRatedStore((state) => state.topRatedMovies);
  const trendingMovies = useTrendingStore((state) => state.trendingMovies);
  const savedMovies = useSavedStore((state) => state.savedMovies);
  const genres = useTmdbStore((state) => state.genres);
  const isPopularLoading = usePopularStore((state) => state.isPopularLoading);
  const isTopRatedLoading = useTopRatedStore((state) => state.isTopRatedLoading);
  const isTrendingLoading = useTrendingStore((state) => state.isTrendingLoading);

  const getGenresFromIds = useCallback((genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean) as string[];
  }, [genres]);

  return { 
    popularMovies, 
    topRatedMovies, 
    trendingMovies, 
    savedMovies, 
    genres, 
    isPopularLoading,
    isTopRatedLoading,
    isTrendingLoading,
    getGenresFromIds 
  };
};
