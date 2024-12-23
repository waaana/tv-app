import { inject, Injectable } from '@angular/core';
import { TvShowData, TvShowsResponse } from '../model/tv-shows.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonResponseDetails } from '../../model/shared.model';
import { SharedUtil } from '../../utils/shared.util';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  #http = inject(HttpClient);

  public getTvShows$(
    language: string,
    page: number,
    uid: number
  ): Observable<CommonResponseDetails> {
    return this.#http
      .get<TvShowsResponse>('https://api.themoviedb.org/3/tv/top_rated', {
        params: {
          language,
          page,
        },
      })
      .pipe(
        map(response => {
          return {
            response: SharedUtil.mapTvShowsResponseToCommonResponse(response),
            details: {
              page,
              searchQuery: '',
              uid,
            },
          };
        })
      );
  }

  public searchTvShows$(
    language: string,
    page: number,
    query: string,
    uid: number
  ): Observable<CommonResponseDetails> {
    return this.#http
      .get<TvShowsResponse>(`https://api.themoviedb.org/3/search/tv`, {
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
            response: SharedUtil.mapTvShowsResponseToCommonResponse(response),
            details: {
              page,
              searchQuery: query,
              uid,
            },
          };
        })
      );
  }

  public getTvShow$(language: string, id: string): Observable<TvShowData> {
    return this.#http.get<TvShowData>(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        language,
      },
    });
  }
}
