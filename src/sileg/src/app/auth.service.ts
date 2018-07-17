// import { Injectable } from '@angular/core';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import {catchError} from "rxjs/internal/operators";

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

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

  constructor(public auth: OAuthService, private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`
      }
    })
    return next.handle(request).pipe(catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any);
  }

  /**
    * manage errors
    * @param err
    * @returns {any}
    */
   private handleAuthError(err: HttpErrorResponse): Observable<any> {
     let zone = <NgZone>this.injector.get(NgZone);
     const snack = this.injector.get(MatSnackBar);
     let ref = snack.open(err.message,'Cerrar');
     ref.onAction().subscribe(() => {
       zone.run(() => {
         ref.dismiss();
       });
     });
     return of(err);
   }


}
