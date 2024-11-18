import { createFeatureSelector, createSelector } from '@ngrx/store';
import { moviesFeatureKey, MoviesState } from './movies.reducer';
import { SharedUtil } from '../../utils/shared.util';
import { MovieData } from '../model/movies.model';
import {
  CommonEntertainmentData,
  GeneralPageInfo,
  QueryDetails,
} from '../../model/shared.model';

export const selectMoviesFeature =
  createFeatureSelector<MoviesState>(moviesFeatureKey);

const getMoviesList = createSelector(
  selectMoviesFeature,
  (state: MoviesState): CommonEntertainmentData[] => {
    let items = [];
    if (
      state.list.isInitialQuery &&
      state.list.data?.length > state.list.pageInfo.initialPageSize
    ) {
      items = state.list.data.slice(0, state.list.pageInfo.initialPageSize);
    } else {
      items = state.list.data;
    }
    return items.map(item =>
      SharedUtil.mapCorrectIconPath<CommonEntertainmentData>(item)
    );
  }
);

const getPageInfo = createSelector(
  selectMoviesFeature,
  (state: MoviesState): GeneralPageInfo => {
    return state.list.pageInfo;
  }
);

const getLastQueryDetails = createSelector(
  selectMoviesFeature,
  (state: MoviesState): QueryDetails | null => {
    return state.list.lastQueryDetails;
  }
);

const getCurrentQueryDetails = createSelector(
  selectMoviesFeature,
  (state: MoviesState): QueryDetails | null => {
    return state.list.currentQueryDetails;
  }
);

const getDialogMovie = createSelector(
  selectMoviesFeature,
  (state: MoviesState): MovieData | null => {
    if (!state.movie.data) {
      return null;
    }
    return SharedUtil.mapCorrectIconPath<MovieData>(state.movie.data);
  }
);

const isRetrievingList = createSelector(
  selectMoviesFeature,
  (state: MoviesState): boolean => {
    return state.list.isRetrieving;
  }
);

const isRetrieving = createSelector(
  selectMoviesFeature,
  (state: MoviesState): boolean => {
    return state.list.isRetrieving || state.movie.isRetrieving;
  }
);
const isLastItem = createSelector(
  selectMoviesFeature,
  (state: MoviesState): boolean => {
    return (
      state.list.pageInfo.lastFetchedPage === 0 ||
      state.list.pageInfo.lastFetchedPage >= state.list.pageInfo.totalPages
    );
  }
);

export const moviesSelectors = {
  getPageInfo,
  getMoviesList,
  getDialogMovie,
  getCurrentQueryDetails,
  getLastQueryDetails,
  isRetrieving,
  isRetrievingList,
  isLastItem,
};
