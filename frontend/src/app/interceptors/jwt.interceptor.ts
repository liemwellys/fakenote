import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_NAME } from '../services/authentication-service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  // intercept every HTTP request and handle it 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(JWT_NAME);
    
    // if user has token, request can be cloned
    if(token){
      const clonedReq = request.clone({
        
        // backend will try to find JWT authorization
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });

      // console.log(clonedReq);
      
      /*
      return cloned request
      corresponding user will have the same request
      equipped with authorization
      */
      return next.handle(clonedReq);
    } 
    
    // else: return original request
    else {      
      return next.handle(request);
    }
  }
}
