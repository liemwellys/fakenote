import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../authentication-service/authentication.service'

export interface UserData {
  items: User[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }

};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // display user profile based on user ID
  findOne(id: number): Observable<User> {
    return this.http.get('/backend/user/' + id).pipe(
      map((user: User) => user)
    );
  }

  updateOne(user): Observable<User>{
    return this.http.put('/backend/user/' + user.iduser, user);
  }

  // return the all users based on determined limit size
  findAll(page: number, size: number):Observable<UserData> {
    let params = new HttpParams();

    // obtain the page & size parameteres
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get('/backend/user', {params}).pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(err))
    )
  }

  // return specific user 
  paginateByName(page: number, size: number, name: string): Observable<UserData>{
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('name', name);
    
    return this.http.get('/backend/user', {params}).pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(err))
    )
  }
}
