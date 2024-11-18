import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { TvShowsActions, tvShowsSelectors } from '../../tv-shows';
import { concatLatestFrom } from '@ngrx/operators';
import { settingsSelectors } from './settings.selector';
import { TvShowDialogComponent } from '../../../pages/tv-shows/tv-show-dialog/tv-show-dialog.component';
import { tap } from 'rxjs';
import { MoviesActions, moviesSelectors } from '../../movies';
import { MovieDialogComponent } from '../../../pages/movies/movie-dialog/movie-dialog.component';

@Injectable()
export class SettingsEffects {
  #actions = inject(Actions);
  #store = inject(Store);
  #dialog = inject(MatDialog);
  openTvShow$ = createEffect(
    () =>
      this.#actions.pipe(
        ofType(TvShowsActions.getTvShowSuccessResponse),
        concatLatestFrom(() => [
          this.#store.select(settingsSelectors.getAppTheme),
          this.#store.select(tvShowsSelectors.getDialogTvShow),
        ]),
        tap(([_, appTheme, tvShowData]) => {
          this.#dialog.open(TvShowDialogComponent, {
            data: tvShowData,
            panelClass: appTheme,
          });
        })
      ),
    { dispatch: false }
  );

  openMovie$ = createEffect(
    () =>
      this.#actions.pipe(
        ofType(MoviesActions.getMovieSuccessResponse),
        concatLatestFrom(() => [
          this.#store.select(settingsSelectors.getAppTheme),
          this.#store.select(moviesSelectors.getDialogMovie),
        ]),
        tap(([_, appTheme, movieData]) => {
          this.#dialog.open(MovieDialogComponent, {
            data: movieData,
            panelClass: appTheme,
          });
        })
      ),
    { dispatch: false }
  );
}
