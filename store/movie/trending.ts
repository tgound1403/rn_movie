import { fetchTrendingMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type TrendingStore = {
  trendingMovies: Movie[];
  isTrendingLoading: boolean;
  error: string | null;
  fetchTrending: (page?: number) => Promise<void>;
};

export const useTrendingStore = create<TrendingStore>((set, get) => ({
    trendingMovies: [],
    isTrendingLoading: false,
    error: null,
    async fetchTrending(page = 1) {
        set({ isTrendingLoading: true, error: null });
        try {
            const data = await fetchTrendingMovies(page);
            set({ trendingMovies: data.results, isTrendingLoading: false });
        } catch (e: any) {
            set({ error: e?.message || "Failed to fetch trending movies", isTrendingLoading: false });
        }
    }
}));