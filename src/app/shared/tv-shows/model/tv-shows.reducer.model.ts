import {
  CommonEntertainmentData,
  GeneralPageInfo,
  QueryDetails,
} from '../../model/shared.model';
import { TvShowData } from './tv-shows.model';

export interface TvShowsListStatus {
  pageInfo: GeneralPageInfo;
  data: CommonEntertainmentData[];
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
