import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { TvShowsActions, tvShowsSelectors } from '..';
import { TvShowsService } from '../services/tv-shows.service';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class TvShowsEffects {
  #actions = inject(Actions);
  #store = inject(Store);
  #tvShowsService = inject(TvShowsService);

  getTvShows$ = createEffect(() =>
    this.#actions.pipe(
      ofType(TvShowsActions.getTvShows),
      concatLatestFrom(() => [
        this.#store.select(tvShowsSelectors.getLastQueryDetails),
        this.#store.select(tvShowsSelectors.getPageInfo),
      ]),
      exhaustMap(([payload, lastQuery, pageInfo]) => {
        const page =
          lastQuery?.searchQuery !== payload.query
            ? 1
            : pageInfo.lastFetchedPage + 1;
        if (payload.query === '') {
          return this.#tvShowsService.getTvShows$(
            payload.language,
            page,
            payload.uid
          );
        }
        return this.#tvShowsService.searchTvShows$(
          payload.language,
          page,
          payload.query,
          payload.uid
        );
      }),
      concatLatestFrom(() => [
        this.#store.select(tvShowsSelectors.getCurrentQueryDetails),
      ]),
      map(([tvShowsResponse, currentQuery]) => {
        if (currentQuery?.uid === tvShowsResponse.details.uid) {
          return TvShowsActions.getTvShowsSuccessResponse(
            tvShowsResponse.response
          );
        }
        return TvShowsActions.skipTvShowsUpdate();
      }),
      catchError(error => {
        return [TvShowsActions.getTvShowsFailedResponse(error)];
      })
    )
  );

  getTvShow$ = createEffect(() =>
    this.#actions.pipe(
      ofType(TvShowsActions.getTvShow),
      exhaustMap(payload =>
        this.#tvShowsService.getTvShow$(payload.language, payload.id)
      ),
      map(tvShow => TvShowsActions.getTvShowSuccessResponse(tvShow)),
      catchError(error => {
        return [TvShowsActions.getTvShowFailedResponse(error)];
      })
    )
  );
}
