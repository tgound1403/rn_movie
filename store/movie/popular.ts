import { fetchPopularMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type PopularStore = {
  popularMovies: Movie[];
  page: number;
  totalPages: number;
  isPopularLoading: boolean;
  hasMore: boolean;
  fetchNextPage: () => Promise<void>;
  reset: () => void;
};

export const usePopularStore = create<PopularStore>((set, get) => ({
  popularMovies: [],
  page: 1,
  totalPages: 1,
  isPopularLoading: false,
  hasMore: true,
  async fetchNextPage() {
    if (get().isPopularLoading || !get().hasMore) return;
    set({ isPopularLoading: true });
    try {
      const data = await fetchPopularMovies(get().page);
      set({
        popularMovies: [
          ...get().popularMovies,
          ...data.results.filter(
            (movie) => !get().popularMovies.some((m) => m.id === movie.id)
          ),
        ],
        page: get().page + 1,
        isPopularLoading: false,
        hasMore: get().page < data.total_pages,
        totalPages: data.total_pages,
      });
    } catch (e) {
      set({ isPopularLoading: false });
      throw e;
    }
  },
  reset: () =>
    set({
      popularMovies: [],
      page: 1,
      totalPages: 1,
      isPopularLoading: false,
      hasMore: true,
    }),
}));
