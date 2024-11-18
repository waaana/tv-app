import { environment } from '../../../environments/environment';
import { CommonEntertainmentData, CommonResponse } from '../model/shared.model';
import { MoviesGeneral, MoviesResponse } from '../movies/model/movies.model';
import { TvShowsGeneral, TvShowsResponse } from '../tv-shows';

export class SharedUtil {
  static mapCorrectIconPath<T extends { backdrop_path: string }>(item: T): T {
    const backdropPath = item.backdrop_path
      ? `${environment.imgPath}${item.backdrop_path}`
      : '/assets/image/no-image.png';
    return {
      ...item,
      backdrop_path: backdropPath,
    };
  }

  static isSmallPageWidth(size: number) {
    return size < 600;
  }
  static isMediumPageWidth(size: number) {
    return size < 960;
  }

  static mapTvShowsResponseToCommonResponse(
    tvShowResponse: TvShowsResponse
  ): CommonResponse {
    const { page, results, total_pages, total_results } = tvShowResponse;
    return {
      page,
      results: results.map(tvShow =>
        this.mapTvShowToCommonEntertainmentData(tvShow)
      ),
      total_pages,
      total_results,
    };
  }

  static mapTvShowToCommonEntertainmentData(
    tvShow: TvShowsGeneral
  ): CommonEntertainmentData {
    const {
      id,
      name,
      backdrop_path,
      overview,
      popularity,
      first_air_date,
      original_language,
    } = tvShow;
    return {
      id,
      label: name,
      backdrop_path,
      overview,
      popularity,
      first_air_date,
      original_language,
      release_date: '',
    };
  }

  static mapMoviesResponseToCommonResponse(
    movieResponse: MoviesResponse
  ): CommonResponse {
    const { page, results, total_pages, total_results } = movieResponse;
    return {
      page,
      results: results.map(tvShow =>
        this.mapMovieToCommonEntertainmentData(tvShow)
      ),
      total_pages,
      total_results,
    };
  }

  static mapMovieToCommonEntertainmentData(
    movie: MoviesGeneral
  ): CommonEntertainmentData {
    const {
      id,
      title,
      backdrop_path,
      overview,
      popularity,
      release_date,
      original_language,
    } = movie;
    return {
      id,
      label: title,
      backdrop_path,
      overview,
      popularity,
      first_air_date: '',
      original_language,
      release_date,
    };
  }
}
