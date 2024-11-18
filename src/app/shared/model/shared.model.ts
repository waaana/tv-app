import { LangOption } from '../types';

export interface LangDrowpdownOptions {
  language: LangOption;
}
export interface QueryDetails {
  searchQuery: string;
  uid: number;
}

export interface GeneralPageInfo {
  initialPageSize: number;
  pageSize: number;
  lastFetchedPage: number;
  totalPages: number;
}

export interface CommonEntertainmentData {
  id: string;
  label: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
  first_air_date?: string;
  original_language: string;
  release_date?: string;
}

export interface CommonResponseDetails {
  response: CommonResponse;
  details: {
    page: number;
    searchQuery: string;
    uid: number;
  };
}

export interface CommonResponse {
  page: number;
  results: CommonEntertainmentData[];
  total_pages: number;
  total_results: number;
}
