import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ContentList, ContentCreateGet, ContentEditGet } from '../_models/contentModelExtensions';
import { ContentModel, ContentBase } from '../_models';

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

    //Gets data for 'Create' user screen
    getForCreate(): Observable<ContentCreateGet> {
        return this.http.get<ContentCreateGet>(`${environment.apiUrl}/content/getForCreate/`);
    }

    //Gets user's detail for editing
    getForEdit(id: number): Observable<ContentEditGet> {
        return this.http.get<ContentEditGet>(`${environment.apiUrl}/content/getForEdit/` + id);
    }

    //Creates a content if it already doesnot exits
    create(contentBase: ContentBase) {
        return this.http.post(`${environment.apiUrl}/content/create`, contentBase);
    }

    //Delete Content by Id
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/content/` + id);
    }
}
