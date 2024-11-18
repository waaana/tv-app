import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { MoviesActions, moviesSelectors } from '..';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { MoviesService } from '../services/movies.service';

@Injectable()
export class MoviesEffects {
  #actions = inject(Actions);
  #store = inject(Store);
  #moviesService = inject(MoviesService);

  getMovies$ = createEffect(() =>
    this.#actions.pipe(
      ofType(MoviesActions.getMovies),
      concatLatestFrom(() => [
        this.#store.select(moviesSelectors.getLastQueryDetails),
        this.#store.select(moviesSelectors.getPageInfo),
      ]),
      exhaustMap(([payload, lastQuery, pageInfo]) => {
        const page =
          lastQuery?.searchQuery !== payload.query
            ? 1
            : pageInfo.lastFetchedPage + 1;
        if (payload.query === '') {
          return this.#moviesService.getMovies$(
            payload.language,
            page,
            payload.uid
          );
        }
        return this.#moviesService.searchMovies$(
          payload.language,
          page,
          payload.query,
          payload.uid
        );
      }),
      concatLatestFrom(() => [
        this.#store.select(moviesSelectors.getCurrentQueryDetails),
      ]),
      map(([moviesResponse, currentQuery]) => {
        if (currentQuery?.uid === moviesResponse.details.uid) {
          return MoviesActions.getMoviesSuccessResponse(
            moviesResponse.response
          );
        }
        return MoviesActions.skipMoviesUpdate();
      }),
      catchError(error => {
        return [MoviesActions.getMoviesFailedResponse(error)];
      })
    )
  );

  getMovie$ = createEffect(() =>
    this.#actions.pipe(
      ofType(MoviesActions.getMovie),
      exhaustMap(payload =>
        this.#moviesService.getMovie$(payload.language, payload.id)
      ),
      map(movie => MoviesActions.getMovieSuccessResponse(movie)),
      catchError(error => {
        return [MoviesActions.getMovieFailedResponse(error)];
      })
    )
  );
}
