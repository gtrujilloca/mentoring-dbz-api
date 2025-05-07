import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCharacters,
  selectCharacterErrorLoad,
  selectPlanets,
  selectPlanetErrorLoad,
  selectIsLoading,
} from '../reducers/dbz.reducer';
import type { Character } from '@/core/interfaces/character.interface';
import { dbzPageActions } from '../actions/dbz-page.actions';
import type { Planet } from '@/core/interfaces/planets.interface';
import { dbzApiActions } from '../actions/dbz-api.actions';

@Injectable({
  providedIn: 'root',
})
export class StateFacadeService {
  readonly #store = inject(Store);

  readonly characters$ = this.#store.select(selectCharacters);
  readonly characterErrorLoad$ = this.#store.select(selectCharacterErrorLoad);
  readonly planets$ = this.#store.select(selectPlanets);
  readonly planetErrorLoad$ = this.#store.select(selectPlanetErrorLoad);
  readonly isLoading$ = this.#store.select(selectIsLoading);

  setCharacters(characters: Character[]) {
    this.#store.dispatch(dbzPageActions.setCharacters({ characters }));
  }

  setPlanets(planets: Planet[]) {
    this.#store.dispatch(dbzPageActions.setPlanets({ planets }));
  }

  getCharacters() {
    this.#store.dispatch(dbzApiActions.getCharacters());
  }
}
