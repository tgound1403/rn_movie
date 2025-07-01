import { fetchPopularMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type PopularStore = {
  popularMovies: Movie[];
  isLoading: boolean;
  error: string | null;
  fetchPopular: (page?: number) => Promise<void>;
};

export const usePopularStore = create<PopularStore>((set, get) => ({
  popularMovies: [],
  isLoading: false,
  error: null,
  async fetchPopular(page = 1) {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPopularMovies(page);
      set({ popularMovies: data.results, isLoading: false });
    } catch (e: any) {
      set({
        error: e?.message || "Failed to fetch popular movies",
        isLoading: false,
      });
    }
  },
}));
