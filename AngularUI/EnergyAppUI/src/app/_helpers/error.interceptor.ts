import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { }

    /*
     * Following error objects can be expected
     * HttpErrorResponse{name: "HttpErrorResponse", ok: false, status: 0, statusText: "Unknown Error", message}
     * HttpErrorResponse{name: "HttpErrorResponse", ok: false, status: 404, statusText: "Not Found", message: "Http failure response for {URL} 404 Not Found"}
    **/
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {
            switch (err.status) { //"Unknown Error"
                case 0:
                case 404:
                this.alertService.error(`${err.name} - ${err.message}`);
            }

            console.log(err);
            //if (err.status === 401) {
            //    // auto logout if 401 response returned from api
            //    this.authenticationService.logout();
            //    location.reload(true);
            //}
            //err.error.message
            const error = err.message || err.statusText;

            return throwError(error);
        }));
    }
}
