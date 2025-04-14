import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withViewTransitions } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { CharactersGateway } from './domain/gateways/characters-gateway'
import { CharactersService } from './infrastructure/driver-adapters/characters.service'
import { PlanetsGateway } from './domain/gateways/planets-gateway'
import { PlanetsService } from './infrastructure/driver-adapters/planets.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch()),
    {
      provide: CharactersGateway,
      useClass: CharactersService
    },
    {
      provide: PlanetsGateway,
      useClass: PlanetsService
    }
  ]
}
