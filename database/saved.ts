import { MovieDetail } from "@/types/app-types";
import { db } from "./sqlite";

export type SavedMovie = {
  id: number;
  movie_id: number;
  movie_title: string;
  movie_overview: string;
  movie_backdrop: string;
}

export const initSavedDB = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS saved (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER,
        movie_title TEXT,
        movie_overview TEXT,
        movie_backdrop TEXT
      );
    `);
  } catch (e) {
    console.log("Error initializing saved database:", e);
  }
};

export const saveMovie = async (movie: MovieDetail): Promise<void> => {
  const statement = await db.prepareAsync(
    "INSERT INTO saved (movie_id, movie_title, movie_overview, movie_backdrop) VALUES ($movie_id, $movie_title, $movie_overview, $movie_backdrop);"
  );
  try {
    await statement.executeAsync({
      $movie_id: movie.id,
      $movie_title: movie.title,
      $movie_overview: movie.overview,
      $movie_backdrop: movie.backdrop_path,
    });
  } catch (e) {
    console.log("Error saving movie:", e);
  } finally {
    console.log("Movie saved:", movie.title);
    await statement.finalizeAsync();
  }
};

export const getSavedMovies = (): Promise<SavedMovie[]> => {
  try {
    return new Promise((resolve, reject) => {
      db.getAllAsync("SELECT * FROM saved")
        .then((result) => {
          resolve(result as SavedMovie[]);
        })
        .catch((error) => reject(error));
    });
  } catch (e) {
    console.log("Error getting saved movies:", e);
    return Promise.resolve([]);
  }
};

export const deleteMovie = async (movieId: number): Promise<void> => {
  try {
    await db.execAsync(`DELETE FROM saved WHERE id = ${movieId}`);
  } catch (e) {
    console.log("Error deleting movie:", e);
  }
};
