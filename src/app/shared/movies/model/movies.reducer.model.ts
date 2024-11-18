import {
  CommonEntertainmentData,
  GeneralPageInfo,
  QueryDetails,
} from '../../model/shared.model';
import { MovieData } from './movies.model';

export interface MoviesListStatus {
  pageInfo: GeneralPageInfo;
  data: CommonEntertainmentData[];
  currentQueryDetails: QueryDetails | null;
  lastQueryDetails: QueryDetails | null;
  isInitialQuery: boolean;
  isRetrieving: boolean;
  error: Error | null;
}

export interface MovieStatus {
  id: string;
  data: MovieData | null;
  isRetrieving: boolean;
  error: Error | null;
}
