import { inject, Injectable } from '@angular/core';
import { TvShowData, TvShowsResponse } from '../model/tv-shows.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  #http = inject(HttpClient);

  public getTvShows$(
    language: string,
    page: number
  ): Observable<TvShowsResponse> {
    return this.#http.get<TvShowsResponse>(
      'https://api.themoviedb.org/3/tv/top_rated',
      {
        params: {
          language,
          page,
        },
      }
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
