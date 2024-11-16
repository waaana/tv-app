import { Routes } from '@angular/router';
import { MainContainerComponent } from './pages/main-container/main-container.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tv-shows',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'movies',
        loadComponent: () =>
          import('./pages/movies/movies.component').then(
            c => c.MoviesComponent
          ),
      },
      {
        path: 'tv-shows',
        loadComponent: () =>
          import('./pages/tv-shows/tv-shows.component').then(
            c => c.TvShowsComponent
          ),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
