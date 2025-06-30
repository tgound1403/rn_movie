import { create } from 'zustand';
import { fetchGenres, fetchMovieDetail, fetchPopularMovies, fetchTopRatedMovies, searchMovies, type Genre, type Movie, type MovieDetail } from '../api/tmdb';
import { getItem, setItem } from './async-storage';

const GENRES_STORAGE_KEY = 'movie_genres';

export type TmdbStore = {
  movies: Movie[];
  topRatedMovies: Movie[];
  genres: Genre[];
  movieDetail: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchPopular: (page?: number) => Promise<void>;
  fetchTopRated: (page?: number) => Promise<void>;
  fetchGenres: () => Promise<void>;
  fetchMovieDetail: (movieId: number) => Promise<void>;
  search: (query: string, page?: number) => Promise<void>;
  loadGenresFromStorage: () => Promise<void>;
};

export const useTmdbStore = create<TmdbStore>((set, get) => ({
  movies: [],
  topRatedMovies: [],
  genres: [],
  movieDetail: null,
  isLoading: false,
  error: null,
  async fetchPopular(page = 1) {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPopularMovies(page);
      set({ movies: data.results, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Failed to fetch popular movies', isLoading: false });
    }
  },
  async fetchTopRated(page = 1) {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchTopRatedMovies(page);
      set({ topRatedMovies: data.results, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Failed to fetch top rated movies', isLoading: false });
    }
  },
  async fetchGenres() {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchGenres();
      set({ genres: data.genres, isLoading: false });
      // Save genres to local storage
      await setItem(GENRES_STORAGE_KEY, JSON.stringify(data.genres));
    } catch (e: any) {
      set({ error: e?.message || 'Failed to fetch genres', isLoading: false });
    }
  },
  async fetchMovieDetail(movieId) {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchMovieDetail(movieId);
      set({ movieDetail: data, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Failed to fetch movie details', isLoading: false });
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
      console.error('Error loading genres from storage:', error);
    }
  },
  async search(query, page = 1) {
    set({ isLoading: true, error: null });
    try {
      const data = await searchMovies(query, page);
      set({ movies: data.results, isLoading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Failed to search movies', isLoading: false });
    }
  },
}));

// Utility function to get genre names by IDs
export function getGenreNames(genreIds: number[], genres: Genre[]): string[] {
  return genreIds
    .map(id => genres.find(genre => genre.id === id)?.name)
    .filter(Boolean) as string[];
} 