import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { TvShowsActions, tvShowsSelectors } from '../../tv-shows';
import { concatLatestFrom } from '@ngrx/operators';
import { settingsSelectors } from './settings.selector';
import { TvShowDialogComponent } from '../../../pages/tv-shows/tv-show-dialog/tv-show-dialog.component';
import { tap } from 'rxjs';

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
}
