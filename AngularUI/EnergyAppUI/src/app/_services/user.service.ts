import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserLogin, UserDetail, UserDetailsBaseAdmin, UserDetailBase } from '../_models';
import { UserList, UserCreateGet, UserEdit, UserSave, UserCreateSave } from '../_models/userModelExtensions';

import { Observable} from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    //Gets a list of users
    getList(): Observable<UserList[]> {
        return this.http.get<UserList[]>(`${environment.apiUrl}/users/list`);
    }

    //Gets user by Id
    getById(id: number): Observable<UserDetail> {
      return this.http.get<UserDetail>(`${environment.apiUrl}/users/` + id);
    }

    //Get logged in user
    getLoggedIn(): Observable<UserDetail> {
        return this.http.get<UserDetail>(`${environment.apiUrl}/users/GetLoggedIn/`);
    }

    //Gets data for 'Create' user screen
    getForCreate(): Observable<UserCreateGet> {
        return this.http.get<UserCreateGet>(`${environment.apiUrl}/users/GetForCreate/`);
    }

    //Gets user's detail for editing
    getForEdit(id: number): Observable<UserEdit> {
        return this.http.get<UserEdit>(`${environment.apiUrl}/users/GetForEdit/` + id);
    }

    //Creates a user if it already doesnot exits
    create(userCreateSave: UserCreateSave) {
        return this.http.post(`${environment.apiUrl}/users/create`, userCreateSave);
    }

    //Updates any user's login details
    update(userLogin: UserLogin) {
        return this.http.post(`${environment.apiUrl}/users/update`, userLogin);
    }

    //Updates any user's general details
    updateDetail(userDetailsBaseAdmin: UserDetailsBaseAdmin) {
        return this.http.post(`${environment.apiUrl}/users/updateDetail`, userDetailsBaseAdmin);
    }

    //Updates logged in user login details
    updateLoggedIn(userLogin: UserLogin) {
        return this.http.post(`${environment.apiUrl}/users/updateLoggedIn`, userLogin);
    }

    //Updates logged in user's general details
    updateDetailLoggedIn(userDetailBase: UserDetailBase) {
        return this.http.post(`${environment.apiUrl}/users/updateDetailLoggedIn`, userDetailBase);
    }

    //Delete User by Id
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }

    addEdit(userLogin: UserLogin, userDetails: UserDetail) {
        return this.http.post(`${environment.apiUrl}/users/addEdit`, { user: userLogin, userDetail: userDetails });
    }
    save(userSave: UserSave) {
        return this.http.post(`${environment.apiUrl}/users/save`, userSave);
    }
}
