import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  TvShowsActions,
  TvShowsGeneral,
  tvShowsSelectors,
} from '../../shared/tv-shows';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ListItemsContainerComponent } from '../common/list-items-container/list-items-container.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [
    TranslateModule,
    ListItemsContainerComponent,
    ListItemsContainerComponent,
  ],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss',
})
export class TvShowsComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  readonly dialog = inject(MatDialog);
  readonly #translateService = inject(TranslateService);
  tvShowList = toSignal(this.#store.select(tvShowsSelectors.getTvShowsList));
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.#store.dispatch(
      TvShowsActions.getTvShows(this.#translateService.currentLang, 1)
    );
  }

  itemClicked(item: TvShowsGeneral) {
    this.#store.dispatch(
      TvShowsActions.getTvShow(this.#translateService.currentLang, item.id)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
