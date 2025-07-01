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