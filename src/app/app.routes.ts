import { Routes } from '@angular/router';
import { noAuthGuard } from './no-auth.guard';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [noAuthGuard]
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
        canActivate: [noAuthGuard]
    },
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        pathMatch: 'full',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'baby',
        pathMatch: 'full',
        loadComponent: () => import('./pages/baby/baby.component').then(m => m.BabyComponent),
        canActivate: [authGuard]
    },
    {
        path: 'feeds',
        pathMatch: 'full',
        loadComponent: () => import('./pages/feeds/feeds.component').then(m => m.FeedsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'pumps',
        pathMatch: 'full',
        loadComponent: () => import('./pages/pumps/pumps.component').then(m => m.PumpsComponent),
        canActivate: [authGuard]
    }
];
