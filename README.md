# TvApp

## Angular version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Project structure

- core - contains items, that are used during whole application
  - header - handles change language & theme
- pages:
  - common - components, that are used to display shows and movies
  - main-conatiner - Wrapper to contain header & the sidebar with display content, handles device width decision & theme
  - tv-shows & movies - displays data of the specific resource, data is retrieved from ngRx store
- shared - contains models/ types/ utils that handle work with data
  - settings - stores data with application settings and for future a place where to store the configurable data
  - tv-shows/movies:
    - store - NgRx action/reducer/selectors/effects for retrieving list top 10/ searched tv-shows/movies and detailed information.
    - service - fetch of data from tmdb backend
- assets - theme, image & translations storage

## Additional information

- Search -> when empty, top rated tv-shows/movies are displayed, otherwise the searched query results are displayed.
- By scrolling down more items are added to the bottom of the view
- Data is retrieved from [TheMovieDB](https://developers.themoviedb.org/3)
- Changing the language, triggers a new search in the new language
- Code developed/tested on Windows machine only.

## Libraries used

- @angular/material - for designing components
- NgRx store/effects/operators - State management & orchestration of effects
- ngx-translate - translation handling
- eslint - statically analyzes code
- prettier - opinionated code formatter

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

No unit test was adjusted so far, however it is planned for the future.

## Running end-to-end tests

No e2e
