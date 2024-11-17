import { environment } from '../../../environments/environment';

export class SharedUtil {
  static mapCorrectIconPath<T extends { backdrop_path: string }>(item: T): T {
    console.log({ environment });
    console.log({ item });
    return {
      ...item,
      backdrop_path: `${environment.imgPath}${item.backdrop_path}`,
    };
  }

  static isSmallPageWidth(size: number) {
    return size < 600;
  }
  static isMediumPageWidth(size: number) {
    return size < 960;
  }
}
