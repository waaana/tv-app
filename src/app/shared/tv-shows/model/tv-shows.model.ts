export interface TvShowsGeneral {
  id: string;
  name: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
  first_air_date: string;
  original_language: string;
}
export interface TvShowData {
  id: string;
  name: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
  first_air_date: string;
  original_language: string;
  number_of_seasons: number;
  number_of_episodes: number;
  status: number;
}

export interface TvShowsResponse {
  page: number;
  results: TvShowsGeneral[];
  total_pages: number;
  total_results: number;
}

export interface TvShowsPageInfo {
  initialPageSize: number;
  pageSize: number;
  lastFetchedPage: number;
  totalPages: number;
}
