import { deleteMovie, getSavedMovies, SavedMovie, saveMovie } from "@/database/saved";
import { MovieDetail } from "@/types/app-types";
import { create } from "zustand";

export type SavedStore = {
    savedMovies: SavedMovie[];
    isLoading: boolean;
    error: string | null;
    fetchSavedMovies: () => Promise<void>;
    saveMovie: (movie: MovieDetail) => Promise<void>;
    removeMovie: (movieId: number) => Promise<void>;
};

export const useSavedStore = create<SavedStore>((set, get) => ({
    savedMovies: [],
    isLoading: false,
    error: null,
    fetchSavedMovies: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await getSavedMovies();
            set({ savedMovies: data, isLoading: false });
        } catch (e: any) {
            set({ error: e?.message || "Failed to fetch saved movies", isLoading: false });
        }
    },
    saveMovie: async (movie: MovieDetail) => {
        await saveMovie(movie);
        get().fetchSavedMovies();
    },
    removeMovie: async (movieId: number) => {
        console.log("Removing movie:", movieId);
        await deleteMovie(movieId);
        await get().fetchSavedMovies();
        console.log("Movie removed:", get().savedMovies.length);
    }
}));