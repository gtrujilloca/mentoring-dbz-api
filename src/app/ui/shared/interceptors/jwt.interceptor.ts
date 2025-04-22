import {
  HttpErrorResponse,
  HttpEventType,
  HttpStatusCode,
  type HttpInterceptorFn,
} from '@angular/common/http';
import { INCLUDE_JWT } from './jwt.context';
import { catchError, delay, of, retry, switchMap, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // if (req.url.includes('api/characters')) {
  //   const reqClone = req.clone({
  //     setHeaders: {
  //       test: "Bearer 123",
  //     },
  //   });

  //   return next(reqClone);
  // }
  const reqClone = req.context.get(INCLUDE_JWT)
    ? req.clone({
        setHeaders: {
          test: 'Bearer 123',
        },
      })
    : req;

  return next(reqClone).pipe(
    // switchMap((response) => {
    //   if (
    //     response.type === HttpEventType.Response &&
    //     response.status === HttpStatusCode.Ok
    //   ) {
    //     return throwError(() => ({
    //       ...response,
    //       status: HttpStatusCode.Unauthorized,
    //       error: 'Unauthorized',
    //     }));
    //   }
    //   return of(response);
    // }),
    // catchError((error: HttpErrorResponse) => {
    //   if (error.status === HttpStatusCode.Unauthorized) {
    //     console.log('Unauthorized');
    //   }
    //   return throwError(() => error);
    // }),
    // retry({
    //   count: 3,
    //   delay: 3000,
    // })
  );
};
