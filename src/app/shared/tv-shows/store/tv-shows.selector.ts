import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tvShowsFeatureKey, TvShowsState } from './tv-shows.reducer';
import { TvShowData } from '../model/tv-shows.model';
import { SharedUtil } from '../../utils/shared.util';
import {
  CommonEntertainmentData,
  GeneralPageInfo,
  QueryDetails,
} from '../../model/shared.model';

export const selectTvShowsFeature =
  createFeatureSelector<TvShowsState>(tvShowsFeatureKey);

const getTvShowsList = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): CommonEntertainmentData[] => {
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
  selectTvShowsFeature,
  (state: TvShowsState): GeneralPageInfo => {
    return state.list.pageInfo;
  }
);

const getLastQueryDetails = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): QueryDetails | null => {
    return state.list.lastQueryDetails;
  }
);

const getCurrentQueryDetails = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): QueryDetails | null => {
    return state.list.currentQueryDetails;
  }
);

const getDialogTvShow = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): TvShowData | null => {
    if (!state.tvShow.data) {
      return null;
    }
    return SharedUtil.mapCorrectIconPath<TvShowData>(state.tvShow.data);
  }
);

const isRetrievingList = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): boolean => {
    return state.list.isRetrieving;
  }
);

const isRetrieving = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): boolean => {
    return state.list.isRetrieving || state.tvShow.isRetrieving;
  }
);
const isLastItem = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): boolean => {
    return (
      state.list.pageInfo.lastFetchedPage === 0 ||
      state.list.pageInfo.lastFetchedPage >= state.list.pageInfo.totalPages
    );
  }
);

export const tvShowsSelectors = {
  getPageInfo,
  getTvShowsList,
  getDialogTvShow,
  getCurrentQueryDetails,
  getLastQueryDetails,
  isRetrieving,
  isRetrievingList,
  isLastItem,
};
