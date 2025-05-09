import { type ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router'

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { routes } from './app.routes'
import { PlanetsGateway } from './domain/gateways/planets-gateway'
import { PlanetsService } from './infrastructure/driver-adapters/planets.service'
import { jwtInterceptor } from './ui/shared/interceptors/jwt.interceptor'
import { DbzStore } from './state/store'
import { CharactersUseCase } from './domain/use-cases/characters-usecase'
import { CharactersGateway } from './domain/gateways/characters-gateway'
import { CharactersService } from './infrastructure/driver-adapters/characters.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor])
    ),
    {
      provide: PlanetsGateway,
      useClass: PlanetsService
    },
    CharactersUseCase,
    {
      provide: CharactersGateway,
      useClass: CharactersService
    },
    DbzStore,
  ]
}
