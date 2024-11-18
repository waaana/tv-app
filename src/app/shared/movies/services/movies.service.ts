import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieData, MoviesResponse } from '../model/movies.model';
import { CommonResponseDetails } from '../../model/shared.model';
import { SharedUtil } from '../../utils/shared.util';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  #http = inject(HttpClient);

  public getMovies$(
    language: string,
    page: number,
    uid: number
  ): Observable<CommonResponseDetails> {
    return this.#http
      .get<MoviesResponse>('https://api.themoviedb.org/3/movie/top_rated', {
        params: {
          language,
          page,
        },
      })
      .pipe(
        map(response => {
          return {
            response: SharedUtil.mapMoviesResponseToCommonResponse(response),
            details: {
              page,
              searchQuery: '',
              uid,
            },
          };
        })
      );
  }

  public searchMovies$(
    language: string,
    page: number,
    query: string,
    uid: number
  ): Observable<CommonResponseDetails> {
    return this.#http
      .get<MoviesResponse>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          query,
          include_adult: false,
          language,
          page,
        },
      })
      .pipe(
        map(response => {
          return {
            response: SharedUtil.mapMoviesResponseToCommonResponse(response),
            details: {
              page,
              searchQuery: query,
              uid,
            },
          };
        })
      );
  }

  public getMovie$(language: string, id: string): Observable<MovieData> {
    return this.#http.get<MovieData>(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          language,
        },
      }
    );
  }
}
