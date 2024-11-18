import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsActions } from '../../shared/settings';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  readonly #store = inject(Store);
  ngOnInit() {
    this.#store.dispatch(SettingsActions.setTabHeader('navItem.label.movies'));
  }
}
