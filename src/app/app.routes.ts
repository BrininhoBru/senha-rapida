import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'generator',
        loadComponent: () => import('./pages/generator/generator').then(m => m.GeneratorComponent),
    },
    {
        path: '',
        redirectTo: 'generator',
        pathMatch: 'full'
    },
];
