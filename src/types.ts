declare global {
  interface FetchParams {
    sort_by?: string;
    year?: number;
    with_keywords?: string;
  }

  interface SearchParams {
    query: string;
  }

  interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  type MoviesResponse = EmptyResponse | MoviesFullResponse;
  type MovieDetailType = EmptyResponse | MovieFullDetail;

  interface EmptyResponse {}
  interface MoviesFullResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }

  interface MovieFullDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
      id: number;
      name: string;
      poster_path?: string; // Optional property (could be null)
      backdrop_path?: string; // Optional property (could be null)
    };
    budget: number;
    genres: Array<{ id: number; name: string }>;
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;

    production_companies: Array<{
      id: number;
      logo_path?: string;
      // Optional property (could be null)
      name: string;
      origin_country: string;
    }>;
    production_countries: Array<{ iso_3166_1: string; name: string }>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<{
      english_name: string;
      iso_639_1: string;
      name: string;
    }>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
}
