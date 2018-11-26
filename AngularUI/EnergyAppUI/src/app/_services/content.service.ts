import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ContentList } from '../_models/contentModelExtensions';
import { ContentModel } from '../_models';

@Injectable()
export class ContentService {
    constructor(private http: HttpClient) { }

    //Gets a list of content
    getList(): Observable<ContentList[]> {
        return this.http.get<ContentList[]>(`${environment.apiUrl}/content/list`);
    }

    //Gets content by Id
    getById(id: number): Observable<ContentModel> {
        return this.http.get<ContentModel>(`${environment.apiUrl}/content/` + id);
    }
}
