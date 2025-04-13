import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'

import { firstValueFrom } from 'rxjs/internal/firstValueFrom'
import { of } from 'rxjs/internal/observable/of'
import { catchError } from 'rxjs/internal/operators/catchError'
import { switchMap } from 'rxjs/internal/operators/switchMap'

import { CharacterApi, CharactersResponseAPI } from '@/core/interfaces/character-api.interface'
import { Character, CharactersResponse } from '@/core/interfaces/character.interface'
import { CharactersGateway } from '@/domain/gateways/characters-gateway'
import { mapToCharacters, mapToCharactersError } from '@/infrastructure/mappers/characters.mapper'
import { CHARACTERS_PATH } from '@/infrastructure/paths'
import { mapToCharacter, mapToCharacterError } from '../mappers/characters.mapper'

@Injectable()

export class CharactersService extends CharactersGateway {
  private readonly _httpClient = inject(HttpClient)

  async getCharacters (): Promise<CharactersResponse> {
    return await firstValueFrom(
      this._httpClient.get<CharactersResponseAPI>(CHARACTERS_PATH).pipe(
        switchMap(response => of(mapToCharacters(response))),
        catchError(_ => of(mapToCharactersError()))
      ))
  }

  async getCharacterById (id: number): Promise<Character> {
    return await firstValueFrom(
      this._httpClient.get<CharacterApi>(`${CHARACTERS_PATH}/${id}`).pipe(
        switchMap(response => of(mapToCharacter(response))),
        catchError(_ => of(mapToCharacterError()))
      ))
  }
}
