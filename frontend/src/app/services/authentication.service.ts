import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface LoginForm{
  email: string;
  password: string;
};

export interface User{
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  // passwordConfirm?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm){
    return this.http.post<any>('/backend/user/login', 
      {email: loginForm.email, password: loginForm.password}).pipe(
        map((token) => {
          console.log(token);
          localStorage.setItem('fakenote-token', token.access_token);
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
}
