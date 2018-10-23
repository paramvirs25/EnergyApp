import '../polyfills';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
         MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
         MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule,
         MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
       } from '@angular/material';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AlertComponent } from './_directives';
import { AuthGuard, AdminGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, RolesService, UserTypesService } from './_services';
import { UserShared } from './_shared';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DashboardComponent } from './dashboard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { AdminLoginLayoutComponent } from './layouts/admin-login-layout/admin-login-layout.component';
import { ClientLoginLayoutComponent } from './layouts/client-login-layout/client-login-layout.component';
import { Roles } from './_models';


@NgModule({
  exports: [
    CdkTableModule, CdkTreeModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule,
    MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    MatTreeModule
  ],
  declarations: []
})
export class AngularMaterialModule { }

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        routing,
        FontAwesomeModule,
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,        
        AdminLoginLayoutComponent,
        ClientLoginLayoutComponent,
        AdminLayoutComponent,
        ClientLayoutComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        UserListComponent,
        UserDetailComponent
    ],
    providers: [
        AuthGuard,
        AdminGuard,
        AlertService,
        AuthenticationService,
        UserService,
        RolesService,
        UserTypesService,
        UserShared,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    entryComponents: [UserListComponent],
    exports: [BsDropdownModule, TooltipModule, ModalModule],
    bootstrap: [AppComponent]
})

export class AppModule { }

