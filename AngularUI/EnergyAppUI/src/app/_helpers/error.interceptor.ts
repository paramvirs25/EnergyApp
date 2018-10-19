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
     * HttpErrorResponse{ProgressEvent, HttpHeaders, message, name: "HttpErrorResponse", ok: false, status: 0, statusText: "Unknown Error"}
    **/
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {
            if (err.status === 0) { //"Unknown Error"
                this.alertService.error(`${err.name} - ${err.message}`);
            }
            //if (err.status === 401) {
            //    // auto logout if 401 response returned from api
            //    this.authenticationService.logout();
            //    location.reload(true);
            //}

            const error = err.error.message || err.statusText;

            return throwError(error);
        }));
    }
}
