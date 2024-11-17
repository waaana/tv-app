import { createReducer, on } from '@ngrx/store';
import {
  TvShowsListStatus,
  TvShowStatus,
} from '../model/tv-shows.reducer.model';
import { TvShowsActions } from '..';

export const tvShowsFeatureKey = 'TvShows';

export interface TvShowsState {
  list: TvShowsListStatus;
  tvShow: TvShowStatus;
}

const initialState: TvShowsState = {
  list: {
    pageInfo: {
      initialPageSize: 10,
      pageSize: 20,
      lastFetchedPage: 0,
      totalPages: 0,
    },
    data: [],
    isRetrieving: false,
    error: null,
  },
  tvShow: {
    id: '',
    data: null,
    isRetrieving: false,
    error: null,
  },
};

export const tvShowsReducer = createReducer(
  initialState,
  on(TvShowsActions.resetTvShows, state => ({
    ...state,
    list: {
      ...state.list,
      data: [],
      pageInfo: {
        ...state.list.pageInfo,
        lastFetchedPage: 0,
        totalPages: 0,
      },
      error: null,
    },
  })),
  on(TvShowsActions.getTvShows, state => ({
    ...state,
    list: {
      ...state.list,
      isRetrieving: true,
      error: null,
    },
  })),
  on(
    TvShowsActions.getTvShowsSuccessResponse,
    (state, { tvShowsResponse }) => ({
      ...state,
      list: {
        ...state.list,
        pageInfo: {
          ...state.list.pageInfo,
          totalPages: tvShowsResponse.total_pages,
          lastFetchedPage: tvShowsResponse.page,
        },
        data: [...state.list.data, ...tvShowsResponse.results],
        isRetrieving: false,
        error: null,
      },
    })
  ),
  on(TvShowsActions.getTvShowsFailedResponse, (state, { error }) => ({
    ...state,
    list: {
      ...state.list,
      data: [],
      isRetrieving: false,
      error,
    },
  })),
  on(TvShowsActions.getTvShow, state => ({
    ...state,
    tvShow: {
      ...state.tvShow,
      id: '',
      data: null,
      isRetrieving: true,
      error: null,
    },
  })),
  on(TvShowsActions.getTvShowSuccessResponse, (state, { tvShowData }) => ({
    ...state,
    tvShow: {
      ...state.tvShow,
      data: { ...tvShowData },
      isRetrieving: false,
      error: null,
    },
  })),
  on(TvShowsActions.getTvShowFailedResponse, (state, { error }) => ({
    ...state,
    tvShow: {
      ...state.tvShow,
      isRetrieving: false,
      error,
    },
  }))
);
