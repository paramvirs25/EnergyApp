import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number): Observable<User> {
      return this.http.get<User>(`${environment.apiUrl}/users/` + id);
    }

    getLoggedIn(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/GetLoggedIn/`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
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
