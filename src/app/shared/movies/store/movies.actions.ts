import { createAction } from '@ngrx/store';
import { MovieData } from '../model/movies.model';
import { CommonResponse } from '../../model/shared.model';

export const resetMoviesOnQueryChange = createAction(
  '[Movies] Reset Movies On Query Change'
);

export const getMovies = createAction(
  '[Movies] Get Movies',
  (language: string, uid: number, query: string, isInitialQuery = false) => ({
    language,
    uid,
    query,
    isInitialQuery,
  })
);
export const getMoviesSuccessResponse = createAction(
  '[Movies] Get Movies Success Response',
  (moviesResponse: CommonResponse) => ({ moviesResponse })
);
export const getMoviesFailedResponse = createAction(
  '[Movies] Get Movies Failed Response',
  (error: Error) => ({ error })
);
export const skipMoviesUpdate = createAction(
  '[Movies] Skip Movies Success Response'
);

export const getMovie = createAction(
  '[Movies] Get Movie',
  (language: string, id: string) => ({ language, id })
);
export const getMovieSuccessResponse = createAction(
  '[Movies] Get Movie Success Response',
  (movieData: MovieData) => ({ movieData })
);
export const getMovieFailedResponse = createAction(
  '[Movies] Get Movie Failed Response',
  (error: Error) => ({ error })
);
