import { inject } from '@angular/core'
import { CharactersGateway } from '@/domain/gateways/characters-gateway'
import type { CharactersResponse, Character } from '@/core/interfaces/character.interface'

export class CharactersUseCase {
  private readonly _charactersGateway = inject(CharactersGateway)

  async getCharacters (): Promise<CharactersResponse> {
    return await this._charactersGateway.getCharacters()
  }

  async getCharacterById (id: number): Promise<Character> {
    return await this._charactersGateway.getCharacterById(id)
  }
}
