import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('jwt  interceptor works');

    // write login to add jwt token
    return this.authService.getLoggedInData().pipe(
      switchMap((value) => {
        // console.log(value.jwtToken + ' from switch map');
        //add token to header
        if (value.login) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${value.jwtToken}`,
            },
          });
        }
        return next.handle(req);
      })
    );
  }
}
