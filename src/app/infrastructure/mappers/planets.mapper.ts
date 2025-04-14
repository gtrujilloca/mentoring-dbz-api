import type { PlanetApi, PlanetsResponseAPI } from '@/core/interfaces/planets-api.interface'
import type { Planet, PlanetsResponse } from '@/core/interfaces/planets.interface'

export function mapToPlanets (response: PlanetsResponseAPI): PlanetsResponse {
  const {
    items,
    links,
    meta
  } = response

  return {
    planets: items,
    links,
    meta
  }
}

export function mapToPlanetsError (): PlanetsResponse {
  return {
    planets: [],
    links: {
      first: '',
      last: '',
      next: '',
      previous: ''
    },
    meta: {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: 0,
      totalPages: 0,
      currentPage: 0
    }
  }
}

export function mapToPlanet (response: PlanetApi): Planet {
  const {
    id,
    name,
    isDestroyed,
    description,
    image,
    deletedAt
  } = response

  return {
    id,
    name,
    isDestroyed,
    description,
    image,
    deletedAt
  }
}

export function mapToPlanetError (): Planet {
  return {
    id: 0,
    name: '',
    isDestroyed: false,
    description: '',
    image: '',
    deletedAt: null
  }
}
