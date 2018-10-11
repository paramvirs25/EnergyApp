import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing } from './app.routing';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DashboardComponent } from './dashboard';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        HomeLayoutComponent,
        LoginLayoutComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    exports: [BsDropdownModule, TooltipModule, ModalModule],
    bootstrap: [AppComponent]
})

export class AppModule { }
