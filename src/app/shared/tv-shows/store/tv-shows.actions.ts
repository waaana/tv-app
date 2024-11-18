import { createAction } from '@ngrx/store';
import { TvShowData } from '../model/tv-shows.model';
import { CommonResponse } from '../../model/shared.model';

export const resetTvShowsOnQueryChange = createAction(
  '[TvShows] Reset Tv Shows On Query Change'
);

export const getTvShows = createAction(
  '[TvShows] Get Tv Shows',
  (language: string, uid: number, query: string, isInitialQuery = false) => ({
    language,
    uid,
    query,
    isInitialQuery,
  })
);
export const getTvShowsSuccessResponse = createAction(
  '[TvShows] Get Tv Shows Success Response',
  (tvShowsResponse: CommonResponse) => ({ tvShowsResponse })
);
export const getTvShowsFailedResponse = createAction(
  '[TvShows] Get Tv Shows Failed Response',
  (error: Error) => ({ error })
);
export const skipTvShowsUpdate = createAction(
  '[TvShows] Skip Tv Shows Success Response'
);

export const getTvShow = createAction(
  '[TvShows] Get Tv Show',
  (language: string, id: string) => ({ language, id })
);
export const getTvShowSuccessResponse = createAction(
  '[TvShows] Get Tv Show Success Response',
  (tvShowData: TvShowData) => ({ tvShowData })
);
export const getTvShowFailedResponse = createAction(
  '[TvShows] Get Tv Show Failed Response',
  (error: Error) => ({ error })
);
