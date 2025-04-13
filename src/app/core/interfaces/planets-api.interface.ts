export interface PlanetsResponseAPI {
  items: PlanetApi[]
  meta: Meta
  links: Links
}

export interface PlanetApi {
  id: number
  name: string
  isDestroyed: boolean
  description: string
  image: string
  deletedAt: null
}

export interface Links {
  first: string
  previous: string
  next: string
  last: string
}

export interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
