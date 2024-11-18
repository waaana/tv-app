export interface MoviesGeneral {
  id: string;
  title: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
  release_date: string;
  original_language: string;
}
export interface MovieData {
  id: string;
  title: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
  release_date: string;
  original_language: string;
  budget: number;
  revenue: number;
  imdb_id: string;
}

export interface MoviesResponse {
  page: number;
  results: MoviesGeneral[];
  total_pages: number;
  total_results: number;
}
