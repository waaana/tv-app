import { createReducer, on } from '@ngrx/store';
import { MoviesListStatus, MovieStatus } from '../model/movies.reducer.model';
import { MoviesActions } from '..';

export const moviesFeatureKey = 'Movies';

export interface MoviesState {
  list: MoviesListStatus;
  movie: MovieStatus;
}

const initialState: MoviesState = {
  list: {
    pageInfo: {
      initialPageSize: 10,
      pageSize: 20,
      lastFetchedPage: 0,
      totalPages: 0,
    },
    isInitialQuery: true,
    currentQueryDetails: null,
    lastQueryDetails: null,
    data: [],
    isRetrieving: false,
    error: null,
  },
  movie: {
    id: '',
    data: null,
    isRetrieving: false,
    error: null,
  },
};

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.resetMoviesOnQueryChange, state => ({
    ...state,
    list: {
      ...state.list,
      data: [],
      pageInfo: {
        ...state.list.pageInfo,
        lastFetchedPage: 0,
        totalPages: 0,
      },
      isRetrieving: true,
      error: null,
    },
  })),
  on(MoviesActions.getMovies, (state, { uid, query, isInitialQuery }) => ({
    ...state,
    list: {
      ...state.list,
      currentQueryDetails: {
        searchQuery: query,
        uid,
      },
      isInitialQuery,
      isRetrieving: true,
      error: null,
    },
  })),
  on(MoviesActions.getMoviesSuccessResponse, (state, { moviesResponse }) => ({
    ...state,
    list: {
      ...state.list,
      pageInfo: {
        ...state.list.pageInfo,
        totalPages: moviesResponse.total_pages,
        lastFetchedPage: moviesResponse.page,
      },
      lastQueryDetails: state.list.currentQueryDetails
        ? { ...state.list.currentQueryDetails }
        : null,
      currentQueryDetails: null,
      data: [...state.list.data, ...moviesResponse.results],
      isRetrieving: false,
      error: null,
    },
  })),
  on(MoviesActions.getMoviesFailedResponse, (state, { error }) => ({
    ...state,
    list: {
      ...state.list,
      currentQueryDetails: null,
      data: [],
      isRetrieving: false,
      error,
    },
  })),
  on(MoviesActions.getMovie, state => ({
    ...state,
    movie: {
      ...state.movie,
      id: '',
      data: null,
      isRetrieving: true,
      error: null,
    },
  })),
  on(MoviesActions.getMovieSuccessResponse, (state, { movieData }) => ({
    ...state,
    movie: {
      ...state.movie,
      data: { ...movieData },
      isRetrieving: false,
      error: null,
    },
  })),
  on(MoviesActions.getMovieFailedResponse, (state, { error }) => ({
    ...state,
    movie: {
      ...state.movie,
      isRetrieving: false,
      error,
    },
  }))
);
