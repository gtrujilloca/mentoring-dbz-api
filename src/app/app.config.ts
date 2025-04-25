import { type ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core'
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router'

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { routes } from './app.routes'
import { PlanetsGateway } from './domain/gateways/planets-gateway'
import { PlanetsService } from './infrastructure/driver-adapters/planets.service'
import { jwtInterceptor } from './ui/shared/interceptors/jwt.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'
import { DbzEffects } from './state/effects/dbz.effects'
import { dbzFeature } from './state/reducers/dbz.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { CharactersGateway } from './domain/gateways/characters-gateway'
import { CharactersService } from './infrastructure/driver-adapters/characters.service'
import { CharactersUseCase } from './domain/use-cases/characters-usecase'
import { PlanetsUseCase } from './domain/use-cases/planets-usecase'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    PlanetsUseCase,
    {
        provide: PlanetsGateway,
        useClass: PlanetsService
    },
    CharactersUseCase,
    {
      provide: CharactersGateway,
      useClass: CharactersService
    },
    provideStore(),
    provideState(dbzFeature),
    provideEffects(DbzEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
}
