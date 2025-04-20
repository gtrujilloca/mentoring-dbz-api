import type { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'planets',
    loadComponent: () => import('./ui/pages/planets/planets.component'),
  },
  // {
  //   path: 'characters',
  //   loadComponent: () => import('./ui/pages/characters/characters.component'),
  // },
  {
    path: 'characters',
    loadChildren: () => import('./ui/pages/characters.module'),
  },
  {
    path: '**',
    redirectTo: 'characters',
    pathMatch: 'full'
  }
]
