import type { HttpInterceptorFn } from '@angular/common/http';
import { INCLUDE_JWT } from './jwt.context';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // if (req.url.includes('api/characters')) {
  //   const reqClone = req.clone({
  //     setHeaders: {
  //       test: "Bearer 123",
  //     },
  //   });

  //   return next(reqClone);
  // }

  if (req.context.get(INCLUDE_JWT)) {
    const reqClone = req.clone({
      setHeaders: {
        test: "Bearer 123",
      },
    });
    return next(reqClone);
  }

  return next(req);
};
