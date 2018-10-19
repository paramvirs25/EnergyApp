import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { DashboardComponent } from './dashboard';

import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

import { UserListComponent } from './admin/user-list/user-list.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';

const appRoutes: Routes = [
  // {
  //  path: '',
  //  component: ClientLayoutComponent,
  //  canActivate: [AuthGuard],
  //  children: [
  //    { path: '', component: HomeComponent },
  //    { path: 'dashboard', component: DashboardComponent }
  //  ]
  //},
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'userlist', component: UserListComponent },
      { path: 'userdetail', component: UserDetailComponent },
    ]
  },
   {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
   },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
