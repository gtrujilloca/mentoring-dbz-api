import { CharactersGateway } from "@/domain/gateways/characters-gateway";
import { CharactersService } from "@/infrastructure/driver-adapters/characters.service";
import { NgModule } from "@angular/core";
import { provideRouter, type Routes } from "@angular/router";

const characterRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./characters/characters.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./character/character.component'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    provideRouter(characterRoutes),
    // CharactersService,
    // {
    //   provide: CharactersGateway,
    //   useClass: CharactersService
    // },
  ],
})
export default class CharactersModule { }