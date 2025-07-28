import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.routes') }
    ]
  },
  { path: 'auth/login', component: LoginComponent }
];
