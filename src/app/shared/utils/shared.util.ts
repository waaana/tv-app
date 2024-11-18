import { environment } from '../../../environments/environment';

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
}
