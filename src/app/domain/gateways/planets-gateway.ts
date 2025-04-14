import type { Planet, PlanetsResponse } from '@/core/interfaces/planets.interface'

export abstract class PlanetsGateway {
  abstract getPlanets (): Promise<PlanetsResponse>
  abstract getPlanetById (id: number): Promise<Planet>
}
