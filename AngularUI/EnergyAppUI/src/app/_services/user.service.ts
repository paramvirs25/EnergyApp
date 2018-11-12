import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserLogin, UserDetail } from '../_models';
import { UserList, UserCreateGet, UserEdit, UserSave, UserCreateSave } from '../_models/userModelExtensions';

import { Observable} from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getList(): Observable<UserList[]> {
        return this.http.get<UserList[]>(`${environment.apiUrl}/users/list`);
    }

    getById(id: number): Observable<UserDetail> {
      return this.http.get<UserDetail>(`${environment.apiUrl}/users/` + id);
    }

    getLoggedIn(): Observable<UserDetail> {
        return this.http.get<UserDetail>(`${environment.apiUrl}/users/GetLoggedIn/`);
    }

    addEdit(userLogin: UserLogin, userDetails: UserDetail) {
        return this.http.post(`${environment.apiUrl}/users/addEdit`, { user: userLogin, userDetail: userDetails });
    }

    getForCreate(): Observable<UserCreateGet> {
        return this.http.get<UserCreateGet>(`${environment.apiUrl}/users/GetForCreate/`);
    }

    getForEdit(id: number): Observable<UserEdit> {
        return this.http.get<UserEdit>(`${environment.apiUrl}/users/GetForEdit/` + id);
    }

    create(userCreateSave: UserCreateSave) {
        return this.http.post(`${environment.apiUrl}/users/create`, userCreateSave);
    }

    save(userSave: UserSave) {
        return this.http.post(`${environment.apiUrl}/users/save`, userSave);
    }
    
    //update(user: User) {
    //  return this.http.put(`${environment.apiUrl}/users/` + user.UserId, user);
    //}

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }

    //getById(id: number): Observable<User> {
    //  return this.http.get<User>(`${environment.apiUrl}/users/` + id)
    //    .pipe(
    //      tap(_ => this.log(`fetched id=${id}`)),
    //      catchError(this.handleError<Employee>(`getHero id=${id}`))
    //    );
    //}
}
