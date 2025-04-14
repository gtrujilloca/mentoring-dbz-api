import type { Routes } from '@angular/router'
import CharactersComponent from './ui/pages/characters/characters.component'

export const routes: Routes = [
  {
    path: '',
    component: CharactersComponent
  },
  {
    path: 'planets',
    loadComponent: () => import('./ui/pages/planets/planets.component'),
  },
  {
    path: 'characters',
    loadComponent: () => import('./ui/pages/characters/characters.component'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]
