import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tvShowsFeatureKey, TvShowsState } from './tv-shows.reducer';
import { TvShowData, TvShowsGeneral } from '../model/tv-shows.model';
import { SharedUtil } from '../../utils/shared.util';

export const selectTvShowsFeature =
  createFeatureSelector<TvShowsState>(tvShowsFeatureKey);

const getTvShowsList = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): TvShowsGeneral[] => {
    let items = [];
    if (state.list.data?.length > state.list.pageInfo.initialPageSize) {
      items = state.list.data.slice(0, state.list.pageInfo.initialPageSize);
    } else {
      items = state.list.data;
    }
    return items.map(item =>
      SharedUtil.mapCorrectIconPath<TvShowsGeneral>(item)
    );
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

const isRetrieving = createSelector(
  selectTvShowsFeature,
  (state: TvShowsState): boolean => {
    return state.list.isRetrieving || state.tvShow.isRetrieving;
  }
);

export const tvShowsSelectors = {
  getTvShowsList,
  getDialogTvShow,
  isRetrieving,
};
