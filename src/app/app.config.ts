import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { tvShowsFeatureKey, tvShowsReducer } from './shared/tv-shows';
import { TvShowsEffects } from './shared/tv-shows/store/tv-shows.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { tmdbInterceptor } from './core/interceptors/tmdb/tmdb.interceptor';
import { settingsFeatureKey, settingsReducer } from './shared/settings';
import { SettingsEffects } from './shared/settings/store/settings.effects';
import { moviesFeatureKey, moviesReducer } from './shared/movies';
import { MoviesEffects } from './shared/movies/store/movies.effects';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({
      [tvShowsFeatureKey]: tvShowsReducer,
      [moviesFeatureKey]: moviesReducer,
      [settingsFeatureKey]: settingsReducer,
    }),
    provideEffects([TvShowsEffects, MoviesEffects, SettingsEffects]),
    provideStoreDevtools(),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tmdbInterceptor])),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    provideClientHydration(),
  ],
};
