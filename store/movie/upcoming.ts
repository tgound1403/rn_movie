import { fetchUpcomingMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type UpcomingStore = {
  upcomingMovies: Movie[];
  page: number;
  totalPages: number;
  isUpcomingLoading: boolean;
  hasMore: boolean;
  fetchNextPage: () => Promise<void>;
  reset: () => void;
};

export const useUpcomingStore = create<UpcomingStore>((set, get) => ({
  upcomingMovies: [],
  page: 1,
  totalPages: 1,
  isUpcomingLoading: false,
  hasMore: true,
  async fetchNextPage() {
    if (get().isUpcomingLoading || !get().hasMore) return;
    set({ isUpcomingLoading: true });
    try {
      const data = await fetchUpcomingMovies(get().page);
      set({
        upcomingMovies: [
          ...get().upcomingMovies,
          ...data.results.filter(
            (movie) => !get().upcomingMovies.some((m) => m.id === movie.id)
          ),
        ],
        page: get().page + 1,
        isUpcomingLoading: false,
        hasMore: get().page < data.total_pages,
        totalPages: data.total_pages,
      });
    } catch (e) {
      set({ isUpcomingLoading: false });
      throw e;
    }
  },
  reset: () =>
    set({
      upcomingMovies: [],
      page: 1,
      totalPages: 1,
      isUpcomingLoading: false,
      hasMore: true,
    }),
})); 