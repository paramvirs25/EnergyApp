import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserContentList } from '../_models/userContentModelExtensions';

@Injectable()
export class UserContentService {
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrl}/usercontent`;
    }

    //Gets usercontent list by loggedin user
    getListLoggedIn(): Observable<UserContentList[]> {
        return this.http.get<UserContentList[]>(`${this.apiUrl}/listLoggedIn/`);
    }
}
