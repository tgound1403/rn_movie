import { fetchTopRatedMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type TopRatedStore = {
  topRatedMovies: Movie[];
  isTopRatedLoading: boolean;
  error: string | null;
  reset: () => void;
  page: number;
  totalPages: number;
  hasMore: boolean;
  fetchNextPage: () => Promise<void>;
};

export const useTopRatedStore = create<TopRatedStore>((set, get) => ({
  topRatedMovies: [],
  isTopRatedLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  hasMore: true,
  async fetchNextPage() {
    if (get().isTopRatedLoading || !get().hasMore) return;
    set({ isTopRatedLoading: true });
    try {
      const data = await fetchTopRatedMovies(get().page);
      set({
        topRatedMovies: [
          ...get().topRatedMovies,
           ...data.results.filter(
            (movie) => !get().topRatedMovies.some((m) => m.id === movie.id)
          ),
        ],
        page: get().page + 1,
        isTopRatedLoading: false,
        hasMore: get().page < data.total_pages,
        totalPages: data.total_pages,
      });
    } catch (e) {
      set({ isTopRatedLoading: false });
      throw e;
    }
  },
  reset: () => set({ topRatedMovies: [], page: 1, totalPages: 1, hasMore: true, isTopRatedLoading: false }),
}));
