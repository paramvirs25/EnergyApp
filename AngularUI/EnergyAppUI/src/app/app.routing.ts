import { Routes, RouterModule } from '@angular/router';
import { AppConstants } from './app.constant';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard, AdminGuard } from './_guards';
import { DashboardComponent } from './dashboard';

import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AdminLoginLayoutComponent } from './layouts/admin-login-layout/admin-login-layout.component';

import { UserListComponent } from './admin/user-list/user-list.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard, AdminGuard],
        children: [
            //{ path: '', component: UserListComponent },
            { path: 'userlist', component: UserListComponent },
            { path: 'userdetail', component: UserDetailComponent }
        ]
    },
    {
        path: '',
        component: ClientLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            //{ path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'dashboard', component: DashboardComponent }
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            //{ path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent }
            //,{ path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '',
        component: AdminLoginLayoutComponent,
        children: [
            { path: AppConstants.adminLoginComponentPath, component: LoginComponent }
        ]
    },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    //{ path: '', pathMatch: 'full', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes, {enableTracing: false});
