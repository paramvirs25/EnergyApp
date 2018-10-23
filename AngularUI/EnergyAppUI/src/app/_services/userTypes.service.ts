import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserTypes } from '../_models';

import { Observable, of } from 'rxjs';

@Injectable()
export class UserTypesService {
    constructor(private http: HttpClient) { }

    getUserTypes(): Observable<UserTypes[]> {
        return this.http.get<UserTypes[]>(`${environment.apiUrl}/usertypes`);
    }
}
