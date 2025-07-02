# RN Movie Dict 🎬

A cross-platform movie browser app built with Expo and React Native, powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

Browse, search, and save your favorite movies with a beautiful, modern UI.

---

## Features

- **Browse Movies:** View popular, top-rated, and trending movies from TMDB.
- **Search:** Find movies by title with instant results.
- **Movie Details:** See in-depth info (overview, genres, rating, release date, etc.).
- **Save Favorites:** Add movies to your personal saved list (stored locally).
- **Modern UI:** Smooth navigation with bottom tabs (Home, Search, Saved).
- **Persistent Storage:** Saved movies are available even after restarting the app.

## Screens

- **Home:** Carousels and lists for popular, top-rated, and trending movies.
- **Search:** Search bar with results and trending suggestions.
- **Saved:** List of movies you have saved.
- **Movie Detail:** Full details and actions for each movie.

## Tech Stack

- [Expo](https://expo.dev/) (React Native)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

   You can then run the app on:
   - Android emulator
   - iOS simulator
   - Expo Go app
   - Web browser

## Project Structure

- `app/` — App screens and navigation
- `components/` — Reusable UI components
- `api/` — TMDB API client and endpoints
- `store/` — Zustand stores for state management
- `database/` — Local storage helpers
- `types/` — TypeScript types

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)

---

> This product uses the TMDB API but is not endorsed or certified by TMDB.
