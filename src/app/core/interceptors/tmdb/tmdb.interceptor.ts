import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, throwError } from 'rxjs';

export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    headers: req.headers
      .append('accept', 'application/json')
      .append('Authorization', `Bearer ${environment.accessToken}`),
  });
  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Http error: ', error);
      return throwError(() => error);
    })
  );
};
