import { TvShowData, TvShowsGeneral, TvShowsPageInfo } from './tv-shows.model';

export interface TvShowsListStatus {
  pageInfo: TvShowsPageInfo;
  data: TvShowsGeneral[];
  isRetrieving: boolean;
  error: Error | null;
}

export interface TvShowStatus {
  id: string;
  data: TvShowData | null;
  isRetrieving: boolean;
  error: Error | null;
}
