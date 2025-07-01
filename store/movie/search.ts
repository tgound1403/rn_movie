import { searchMovies } from "@/api/tmdb";
import { Movie } from "@/types/app-types";
import { create } from "zustand";

export type SearchStore = {
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;
  search: (query: string, page?: number) => Promise<void>;
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchResults: [],
  isLoading: false,
  error: null,
  async search(query, page = 1) {
    set({ isLoading: true, error: null });
    try {
      const data = await searchMovies(query, page);
      set({ searchResults: data.results, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || "Failed to search movies", isLoading: false });
    }
  },
}));
