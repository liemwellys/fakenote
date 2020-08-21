import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

export interface LoginForm{
  email: string;
  password: string;
};

export interface User{
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
};

export const JWT_NAME = 'fakenote-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm){
    return this.http.post<any>('/backend/user/login', 
      {email: loginForm.email, password: loginForm.password}).pipe(
        map((token) => {
          console.log(token);
          localStorage.setItem(JWT_NAME, token.access_token);
          return token;
        })
      )
  }

  register(user: User){
    return this.http.post<any>('/backend/user/', user).pipe(
      tap(user => console.log(user)),
      map(user => user)
    )
  }

  // register(user: User){
  //   return this.http.post<any>('/backend/user/',
  //     {name: user.name, email: user.email, password: user.password}).pipe(
  //       map(user => user)
  //   )
  // }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    console.log(token);
    
    // check the jwt is expired or not
    // return true if token is expired
    // return false if token is not expired
    return !this.jwtHelper.isTokenExpired(token);
  }
}
