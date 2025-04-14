import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'

import { firstValueFrom } from 'rxjs/internal/firstValueFrom'
import { of } from 'rxjs/internal/observable/of'
import { catchError } from 'rxjs/internal/operators/catchError'
import { switchMap } from 'rxjs/internal/operators/switchMap'

import type { PlanetApi, PlanetsResponseAPI } from '@/core/interfaces/planets-api.interface'
import type { Planet, PlanetsResponse } from '@/core/interfaces/planets.interface'
import { PlanetsGateway } from '@/domain/gateways/planets-gateway'
import { PLANETS_PATH } from '@/infrastructure/paths'
import { mapToPlanet, mapToPlanetError, mapToPlanets, mapToPlanetsError } from '../mappers/planets.mapper'

@Injectable()

export class PlanetsService extends PlanetsGateway {
  private readonly _httpClient = inject(HttpClient)

  async getPlanets (): Promise<PlanetsResponse> {
    return await firstValueFrom(
      this._httpClient.get<PlanetsResponseAPI>(PLANETS_PATH).pipe(
        switchMap(response => of(mapToPlanets(response))),
        catchError(_ => of(mapToPlanetsError()))
      ))
  }

  async getPlanetById (id: number): Promise<Planet> {
    return await firstValueFrom(
      this._httpClient.get<PlanetApi>(`${PLANETS_PATH}/${id}`).pipe(
        switchMap(response => of(mapToPlanet(response))),
        catchError(_ => of(mapToPlanetError()))
      ))
  }
}
