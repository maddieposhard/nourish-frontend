import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'profile',
        pathMatch: 'full',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'baby',
        pathMatch: 'full',
        loadComponent: () => import('./pages/baby/baby.component').then(m => m.BabyComponent)
    },
    {
        path: 'feeds',
        pathMatch: 'full',
        loadComponent: () => import('./pages/feeds/feeds.component').then(m => m.FeedsComponent)
    },
    {
        path: 'pumps',
        pathMatch: 'full',
        loadComponent: () => import('./pages/pumps/pumps.component').then(m => m.PumpsComponent)
    }
];
