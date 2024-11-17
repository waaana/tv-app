import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsActions } from './shared/settings';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  #translateService = inject(TranslateService);
  #store = inject(Store);
  title = 'tv-app';
  constructor() {
    this.#translateService.addLangs(['en', 'de']);
    this.#translateService.setDefaultLang('en');
    this.#translateService.use('en');
    this.#store.dispatch(
      SettingsActions.setSettings([
        { headerKey: 'navItem.label.tvShows', route: '/tv-shows' },
        { headerKey: 'navItem.label.movies', route: '/movies' },
      ])
    );
  }
}
