import { Genre, MovieDetail } from "@/types/app-types";
import { create } from "zustand";
import { fetchGenres, fetchMovieDetail } from "../api/tmdb";
import { getItem, setItem } from "../database/async-storage";

const GENRES_STORAGE_KEY = "movie_genres";

export type TmdbStore = {
  genres: Genre[];
  movieDetail: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchGenres: () => Promise<void>;
  fetchMovieDetail: (movieId: number) => Promise<void>;
  loadGenresFromStorage: () => Promise<void>;
};

export const useTmdbStore = create<TmdbStore>((set, get) => ({
  genres: [],
  movieDetail: null,
  isLoading: false,
  error: null,
  async fetchGenres() {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchGenres();
      set({ genres: data.genres, isLoading: false });
      // Save genres to local storage
      await setItem(GENRES_STORAGE_KEY, JSON.stringify(data.genres));
    } catch (e: any) {
      set({ error: e?.message || "Failed to fetch genres", isLoading: false });
    }
  },
  async fetchMovieDetail(movieId) {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchMovieDetail(movieId);
      set({ movieDetail: data, isLoading: false });
    } catch (e: any) {
      set({
        error: e?.message || "Failed to fetch movie details",
        isLoading: false,
      });
    }
  },

  async loadGenresFromStorage() {
    try {
      const storedGenres = await getItem(GENRES_STORAGE_KEY);
      if (storedGenres) {
        const genres = JSON.parse(storedGenres);
        set({ genres });
      }
    } catch (error) {
      console.error("Error loading genres from storage:", error);
    }
  },
}));

// Utility function to get genre names by IDs
export function getGenreNames(genreIds: number[], genres: Genre[]): string[] {
  return genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean) as string[];
}
