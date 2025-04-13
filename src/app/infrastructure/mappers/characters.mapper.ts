import { CharacterApi, CharactersResponseAPI } from '@/core/interfaces/character-api.interface'
import { Character, CharactersResponse } from '@/core/interfaces/character.interface'

export function mapToCharacters (response: CharactersResponseAPI): CharactersResponse {
  const {
    items,
    links,
    meta
  } = response

  return {
    characters: items,
    links,
    meta
  }
}

export function mapToCharactersError (): CharactersResponse {
  return {
    characters: [],
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

export function mapToCharacter (response: CharacterApi): Character {
  const {
    id,
    name,
    ki,
    maxKi,
    race,
    gender,
    description,
    image,
    affiliation,
    deletedAt
  } = response

  return {
    id,
    name,
    ki,
    maxKi,
    race,
    gender,
    description,
    image,
    affiliation,
    deletedAt
  }
}

export function mapToCharacterError (): Character {
  return {
    id: 0,
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: '',
    description: '',
    image: '',
    affiliation: '',
    deletedAt: null
  }
}
