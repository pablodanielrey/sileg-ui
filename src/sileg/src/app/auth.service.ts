import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {

  constructor() { }

}

/*
  Hace falta agregar el interceptor al codigo de la app modificando el array HTTP_INTERCEPTORS
  básicamente dentro de app.module.ts :

  import { HTTP_INTERCEPTORS } from '@angular/common/http';
  import { TokenInterceptor } from './../auth/token.interceptor';
  @NgModule({
    bootstrap: [AppComponent],
    imports: [...],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ]
  })
  export class AppModule {}



*/


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: OAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`
      }
    });
    return next.handle(request);
  }

}