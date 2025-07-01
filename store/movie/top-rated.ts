import { fetchTopRatedMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type TopRatedStore = {
  topRatedMovies: Movie[];
  isLoading: boolean;
  error: string | null;
  fetchTopRated: (page?: number) => Promise<void>;
};

export const useTopRatedStore = create<TopRatedStore>((set, get) => ({
  topRatedMovies: [],
  isLoading: false,
  error: null,
  async fetchTopRated(page = 1) {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchTopRatedMovies(page);
      set({ topRatedMovies: data.results, isLoading: false });
    } catch (e: any) {
      set({
        error: e?.message || "Failed to fetch top rated movies",
        isLoading: false,
      });
    }
  },
}));
