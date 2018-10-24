import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserLogin, UserDetails } from '../_models';
import { Roles } from '../_models';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number): Observable<UserDetails> {
      return this.http.get<UserDetails>(`${environment.apiUrl}/users/` + id);
    }

    getLoggedIn(): Observable<UserDetails> {
        return this.http.get<UserDetails>(`${environment.apiUrl}/users/GetLoggedIn/`);
    }

    addEdit(userLogin: UserLogin, userDetails: UserDetails) {
        return this.http.post(`${environment.apiUrl}/users/addEdit`, { user: userLogin, userDetail: userDetails });
    }

    //update(user: User) {
    //  return this.http.put(`${environment.apiUrl}/users/` + user.UserId, user);
    //}

    //delete(id: number) {
    //    return this.http.delete(`${environment.apiUrl}/users/` + id);
    //}

    //getById(id: number): Observable<User> {
    //  return this.http.get<User>(`${environment.apiUrl}/users/` + id)
    //    .pipe(
    //      tap(_ => this.log(`fetched id=${id}`)),
    //      catchError(this.handleError<Employee>(`getHero id=${id}`))
    //    );
    //}
}
