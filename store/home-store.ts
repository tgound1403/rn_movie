import { fetchPopularMovies, fetchTopRatedMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type HomeStore = {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  isLoading: boolean;
  error: string | null;
  fetchHomeData: () => Promise<void>;   
};

export const useHomeStore = create<HomeStore>((set, get) => ({
  popularMovies: [],
  topRatedMovies: [],
  isLoading: false,
  error: null,
  async fetchHomeData() {
    set({ isLoading: true, error: null });
    try {
      const [popularData, topRatedData] = await Promise.all([
        fetchPopularMovies(),
        fetchTopRatedMovies(),
      ]);
      set({ popularMovies: popularData.results, topRatedMovies: topRatedData.results, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || "Failed to fetch home data", isLoading: false });
    }
  }
}));