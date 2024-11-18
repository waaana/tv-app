import {
  QueryDetails,
  TvShowData,
  TvShowsGeneral,
  TvShowsPageInfo,
} from './tv-shows.model';

export interface TvShowsListStatus {
  pageInfo: TvShowsPageInfo;
  data: TvShowsGeneral[];
  currentQueryDetails: QueryDetails | null;
  lastQueryDetails: QueryDetails | null;
  isInitialQuery: boolean;
  isRetrieving: boolean;
  error: Error | null;
}

export interface TvShowStatus {
  id: string;
  data: TvShowData | null;
  isRetrieving: boolean;
  error: Error | null;
}
