import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { TvShowsActions } from '..';
import { TvShowsService } from '../services/tv-shows.service';

@Injectable()
export class TvShowsEffects {
  #actions = inject(Actions);
  #tvShowsService = inject(TvShowsService);

  getTvShows$ = createEffect(() =>
    this.#actions.pipe(
      ofType(TvShowsActions.getTvShows),
      exhaustMap(payload =>
        this.#tvShowsService.getTvShows$(payload.language, payload.size)
      ),
      map(tvShowsResponse =>
        TvShowsActions.getTvShowsSuccessResponse(tvShowsResponse)
      ),
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
