import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ListItemsContainerComponent } from '../common/list-items-container/list-items-container.component';
import { SearchItemsComponent } from '../common/search-items/search-items.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MoviesActions, moviesSelectors } from '../../shared/movies';
import { Subscription } from 'rxjs';
import { SettingsActions } from '../../shared/settings';
import {
  CommonEntertainmentData,
  QueryDetails,
} from '../../shared/model/shared.model';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    TranslateModule,
    ListItemsContainerComponent,
    SearchItemsComponent,
    MatProgressSpinnerModule,
    MatSidenavModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit, OnDestroy {
  searchQuery = signal<string>('');
  readonly #store = inject(Store);
  readonly #translateService = inject(TranslateService);

  isNotEnoughOfCharacters = computed<boolean>(() => {
    return this.searchQuery() !== '' && this.searchQuery().length < 3;
  });
  movieList = toSignal<CommonEntertainmentData[]>(
    this.#store.select(moviesSelectors.getMoviesList)
  );
  lastQueryDetails = toSignal<QueryDetails | null>(
    this.#store.select(moviesSelectors.getLastQueryDetails)
  );
  isRetrievingList = toSignal(
    this.#store.select(moviesSelectors.isRetrievingList)
  );
  isLastItem = toSignal(this.#store.select(moviesSelectors.isLastItem));
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.#store.dispatch(SettingsActions.setTabHeader('navItem.label.movies'));
    this.getMovies(true);
    this.subscription.add(
      this.#translateService.onLangChange.subscribe(() => {
        this.resetMovies();
        this.getMovies(false);
      })
    );
  }

  itemClicked(item: CommonEntertainmentData) {
    this.#store.dispatch(
      MoviesActions.getMovie(this.#translateService.currentLang, item.id)
    );
  }

  initiateSearch(query: string) {
    this.#store.dispatch(
      MoviesActions.getMovies(
        this.#translateService.currentLang,
        Date.now(),
        query,
        false
      )
    );
  }

  searchChange(searchQuery: string | null) {
    this.searchQuery.set(searchQuery ?? '');
    this.resetMovies();
  }

  isElementScrolledAtBottom(event: any): boolean {
    return (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    );
  }

  getMovies(isInitial: boolean) {
    this.#store.dispatch(
      MoviesActions.getMovies(
        this.#translateService.currentLang,
        Date.now(),
        this.lastQueryDetails()?.searchQuery ?? '',
        isInitial
      )
    );
  }

  resetMovies() {
    this.#store.dispatch(MoviesActions.resetMoviesOnQueryChange());
  }

  onScroll(event: any) {
    if (!this.isLastItem() && this.isElementScrolledAtBottom(event)) {
      this.getMovies(false);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
