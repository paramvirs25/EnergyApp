import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Roles } from '../_models';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class RolesService {
    constructor(private http: HttpClient) { }

    getRoles(): Observable<Roles[]> {
        return this.http.get<Roles[]>(`${environment.apiUrl}/roles`);
    }
}
