import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  QueryDetails,
  TvShowsActions,
  TvShowsGeneral,
  tvShowsSelectors,
} from '../../shared/tv-shows';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ListItemsContainerComponent } from '../common/list-items-container/list-items-container.component';
import { Subscription } from 'rxjs';
import { SearchItemsComponent } from '../common/search-items/search-items.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SettingsActions } from '../../shared/settings';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [
    TranslateModule,
    ListItemsContainerComponent,
    ListItemsContainerComponent,
    SearchItemsComponent,
    MatProgressSpinnerModule,
    MatSidenavModule,
  ],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss',
})
export class TvShowsComponent implements OnInit, OnDestroy {
  searchQuery = signal<string>('');
  readonly #store = inject(Store);
  readonly #translateService = inject(TranslateService);

  isNotEnoughOfCharacters = computed<boolean>(() => {
    return this.searchQuery() !== '' && this.searchQuery().length < 3;
  });
  tvShowList = toSignal(this.#store.select(tvShowsSelectors.getTvShowsList));
  lastQueryDetails = toSignal<QueryDetails | null>(
    this.#store.select(tvShowsSelectors.getLastQueryDetails)
  );
  isRetrievingList = toSignal(
    this.#store.select(tvShowsSelectors.isRetrievingList)
  );
  isLastItem = toSignal(this.#store.select(tvShowsSelectors.isLastItem));
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.#store.dispatch(SettingsActions.setTabHeader('navItem.label.tvShows'));
    this.#store.dispatch(
      TvShowsActions.getTvShows(
        this.#translateService.currentLang,
        Date.now(),
        this.lastQueryDetails()?.searchQuery ?? '',
        true
      )
    );
  }

  itemClicked(item: TvShowsGeneral) {
    this.#store.dispatch(
      TvShowsActions.getTvShow(this.#translateService.currentLang, item.id)
    );
  }

  initiateSearch(query: string) {
    this.#store.dispatch(
      TvShowsActions.getTvShows(
        this.#translateService.currentLang,
        Date.now(),
        query,
        false
      )
    );
  }

  searchChange(searchQuery: string | null) {
    this.searchQuery.set(searchQuery ?? '');
    this.#store.dispatch(TvShowsActions.resetTvShowsOnQueryChange());
  }

  isElementScrolledAtBottom(event: any): boolean {
    return (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    );
  }

  onScroll(event: any) {
    if (!this.isLastItem() && this.isElementScrolledAtBottom(event)) {
      this.#store.dispatch(
        TvShowsActions.getTvShows(
          this.#translateService.currentLang,
          Date.now(),
          this.lastQueryDetails()?.searchQuery ?? '',
          false
        )
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
