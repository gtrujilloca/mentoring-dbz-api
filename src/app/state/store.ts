import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
// import { tapResponse } from '@ngrx/signals/operators';


import type {
  Character
} from '@/core/interfaces/character.interface';
import type { Planet } from '@/core/interfaces/planets.interface';
import { CharactersUseCase } from '@/domain/use-cases/characters-usecase';
import { computed, inject } from '@angular/core';
import { exhaustMap, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { pipe } from 'rxjs/internal/util/pipe';

export interface DbzState {
  characters: Character[];
  characterErrorLoad: string;
  planets: Planet[];
  planetErrorLoad: string;
  isLoading: boolean;
}

export const initialDbzState: DbzState = {
  characters: [],
  characterErrorLoad: '',
  planets: [],
  planetErrorLoad: '',
  isLoading: false,
};

export const DbzStore = signalStore(
  // { providedIn: 'root' },
  withState(initialDbzState),
  withComputed(({ characters }) => ({
    charactersLength: computed(() => characters().length),
  })),
  withMethods((store, charactersUseCaseSrv = inject(CharactersUseCase)) => ({
    setCharacters: (characters: Character[]) => {
      patchState(store, { characters });
    },
    setLoading: (loading: boolean) => {
      patchState(store, { isLoading: loading });
    },
    async setCharactersAsync() {
      patchState(store, { isLoading: true });
      try {
        const charactersResponse = await charactersUseCaseSrv.getCharacters();
        patchState(store, {
          characters: charactersResponse.characters,
          isLoading: false,
        });
      } catch (error) {
        patchState(store, {
          characterErrorLoad: 'Something went wrong loading the characters',
          isLoading: false,
        });
      }
    },

    setCharactersObservable: rxMethod<void>(
      pipe(
        exhaustMap(() => from(
          charactersUseCaseSrv.getCharacters())
        ),
        map((charactersResponse) => {
          patchState(store, {
            characters: charactersResponse.characters,
            isLoading: false,
          });
        }),
        catchError((error) => {
          patchState(store, {
            characterErrorLoad: error.message,
            isLoading: false,
          });
          return throwError(() => new Error(error));
        })
      )
    ),
  })),
  withHooks((store) => ({
    onInit() {
      // patchState(store, { characterErrorLoad: 'Estoy vacio' });
      store.setCharactersAsync();
    },
    onDestroy() {
      console.log('onDestroy');
    }
  }))
);
