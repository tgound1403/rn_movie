import { apiClient } from './client';

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  backdrop_path: string | null;
  adult: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type GenreListResponse = {
  genres: Genre[];
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  status: string;
  original_language: string;
  original_title: string;
  popularity: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function fetchPopularMovies(page: number = 1): Promise<MovieListResponse> {
  try {
    const { data } = await apiClient.get<MovieListResponse>(
      '/movie/popular',
      { params: { page } }
    );
    console.log('data:', data.results[0]);
    if (!data || !data.results) {
      throw new Error('Invalid response from TMDB API');
    } else {
      console.log('Popular movies fetched successfully:', data.results.length);
    }

    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error('Failed to fetch popular movies. Please try again later.');
  }
}

export async function fetchTopRatedMovies(page: number = 1): Promise<MovieListResponse> {
  try {
    const { data } = await apiClient.get<MovieListResponse>(
      '/movie/top_rated',
      { params: { page } }
    );
    console.log('top_rated data:', data.results[0]);
    if (!data || !data.results) {
      throw new Error('Invalid response from TMDB API');
    } else {
      console.log('Top rated movies fetched successfully:', data.results.length);
    }

    return data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw new Error('Failed to fetch top rated movies. Please try again later.');
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<MovieListResponse> {
  try {
    const { data } = await apiClient.get<MovieListResponse>(
      '/search/movie',
      { params: { query, page } }
    );
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies. Please try again later.');
  }
}

export async function fetchGenres(): Promise<GenreListResponse> {
  try {
    const { data } = await apiClient.get<GenreListResponse>('/genre/movie/list');
    console.log('genres data:', data);
    if (!data || !data.genres) {
      throw new Error('Invalid response from TMDB API');
    } else {
      console.log('Genres fetched successfully:', data.genres.length);
    }

    return data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres. Please try again later.');
  }
}

export async function fetchMovieDetail(movieId: number): Promise<MovieDetail> {
  try {
    const { data } = await apiClient.get<MovieDetail>(`/movie/${movieId}`);
    console.log('movie detail data:', data);
    if (!data || !data.id) {
      throw new Error('Invalid response from TMDB API');
    } else {
      console.log('Movie detail fetched successfully:', data.title);
    }

    return data;
  } catch (error) {
    console.error('Error fetching movie detail:', error);
    throw new Error('Failed to fetch movie details. Please try again later.');
  }
} 