import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, type OnDestroy } from '@angular/core';

import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import type {
  CharacterApi,
  CharactersResponseAPI,
} from '@/core/interfaces/character-api.interface';
import type {
  Character,
  CharactersResponse,
} from '@/core/interfaces/character.interface';
import { CharactersGateway } from '@/domain/gateways/characters-gateway';
import {
  mapToCharacters,
  mapToCharactersError,
} from '@/infrastructure/mappers/characters.mapper';
import { CHARACTERS_PATH } from '@/infrastructure/paths';
import {
  mapToCharacter,
  mapToCharacterError,
} from '../mappers/characters.mapper';
import { excludeJwt } from '@/ui/shared/interceptors/jwt.context';
import { throwError } from 'rxjs';

@Injectable()
export class CharactersService extends CharactersGateway implements OnDestroy {
  private readonly _httpClient = inject(HttpClient);
  private readonly id = new Date().getTime();

  constructor() {
    super();
    console.log('CharactersService', this.id);
  }

  ngOnDestroy(): void {
    console.log('CharactersService', this.id, 'destroyed');
  }

  async getCharacters(): Promise<CharactersResponse> {
    return await firstValueFrom(
      this._httpClient.get<CharactersResponseAPI>(CHARACTERS_PATH).pipe(
        switchMap((response) => of(mapToCharacters(response))),
        catchError(_ => of(mapToCharactersError())
        // catchError(_ => throwError(() => new Error("Something went wrong David"))
          // of(
          //   new HttpErrorResponse({
          //     error: 'Something went wrong loading characters',
          //     status: 400,
          //     statusText: 'Bad Request',
          //   })
          // )

        )
      )
    );
  }

  async getCharacterById(id: number): Promise<Character> {
    return await firstValueFrom(
      this._httpClient
        .get<CharacterApi>(`${CHARACTERS_PATH}/${id}`, {
          context: excludeJwt(),
        })
        .pipe(
          switchMap((response) => of(mapToCharacter(response))),
          catchError((_) => of(mapToCharacterError()))
        )
    );
  }
}
