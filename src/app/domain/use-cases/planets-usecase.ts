import { inject } from '@angular/core'
import { PlanetsGateway } from '@/domain/gateways/planets-gateway'
import { PlanetsResponse, Planet } from '@/core/interfaces/planets.interface'

export class PlanetsUseCase {
  private readonly _planetsGateway = inject(PlanetsGateway)

  async getPlanets (): Promise<PlanetsResponse> {
    return await this._planetsGateway.getPlanets()
  }

  async getCharacterById (id: number): Promise<Planet> {
    return await this._planetsGateway.getPlanetById(id)
  }
}
