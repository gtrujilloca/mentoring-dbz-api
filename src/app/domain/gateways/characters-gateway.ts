import type { Character, CharactersResponse } from '@/core/interfaces/character.interface'

export abstract class CharactersGateway {
  abstract getCharacters (): Promise<CharactersResponse>
  abstract getCharacterById (id: number): Promise<Character>
}
