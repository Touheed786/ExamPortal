import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private login:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // add the jwt token(localStorage) request
    let authReq = request;
    const token =  this.login.getToken();
    console.log("Inside Interceptor")
    console.log(token)
    if(token != null)
    {
      authReq = authReq.clone({
        setHeaders:{Authorization: `Bearer ${token}`},
      })
    }
    return next.handle(authReq);
  }
}

export const  AuthInterceptorProvidesr=[
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }
]
