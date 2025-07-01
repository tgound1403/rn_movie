import { apiClient } from './client';
import { GenreListResponse, MovieDetail, MovieListResponse } from '@/types/app-types';


export async function fetchPopularMovies(page: number = 1): Promise<MovieListResponse> {
  try {
    const { data } = await apiClient.get<MovieListResponse>(
      '/movie/popular',
      { params: { page } }
    );
    if (!data || !data.results) {
      throw new Error('Invalid response from TMDB API');
    } 

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchTopRatedMovies(page: number = 1): Promise<MovieListResponse> {
  try {
    const { data } = await apiClient.get<MovieListResponse>(
      '/movie/top_rated',
      { params: { page } }
    );
    if (!data || !data.results) {
      throw new Error('Invalid response from TMDB API');
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
    throw new Error(error as string);
  }
}

export async function fetchGenres(): Promise<GenreListResponse> {
  try {
    const { data } = await apiClient.get<GenreListResponse>('/genre/movie/list');
    if (!data || !data.genres) {
      throw new Error('Invalid response from TMDB API');
    } 
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchMovieDetail(movieId: number): Promise<MovieDetail> {
  try {
    const { data } = await apiClient.get<MovieDetail>(`/movie/${movieId}`);
    if (!data || !data.id) {
      throw new Error('Invalid response from TMDB API');
    } 
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
} 

export async function fetchTrendingMovies(): Promise<MovieListResponse> {
  try {
    const { data } = await apiClient.get<MovieListResponse>(
      '/trending/movie/week',
    );
    if (!data || !data.results) {
      throw new Error('Invalid response from TMDB API');
    }
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
}