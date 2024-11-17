import { createAction } from '@ngrx/store';
import { TvShowData, TvShowsResponse } from '../model/tv-shows.model';

export const resetTvShows = createAction('[TvShows] Reset Tv Shows');
export const getTvShows = createAction(
  '[TvShows] Get Tv Shows',
  (language: string, size: number) => ({ language, size })
);
export const getTvShowsSuccessResponse = createAction(
  '[TvShows] Get Tv Shows Success Response',
  (tvShowsResponse: TvShowsResponse) => ({ tvShowsResponse })
);
export const getTvShowsFailedResponse = createAction(
  '[TvShows] Get Tv Shows Failed Response',
  (error: Error) => ({ error })
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
