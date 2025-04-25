import type { Character } from "@/core/interfaces/character.interface";
import type { Planet } from "@/core/interfaces/planets.interface";
import { createFeature, createReducer, on } from "@ngrx/store";
import { dbzApiActions } from "../actions/dbz-api.actions";

export interface DbzState {
  characters: Character[];
  characterErrorLoad: string;
  planets: Planet[];
  planetErrorLoad: string;
}

export const initialDbzState: DbzState = {
  characters: [],
  characterErrorLoad: '',
  planets: [],
  planetErrorLoad: '',
};

export const dbzReducer = createReducer<DbzState>(
  initialDbzState,
  on(dbzApiActions.getCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters,
    characterErrorLoad: '',
  })),
  on(dbzApiActions.getCharactersError, (state, { error }) => ({
    ...state,
    characterErrorLoad: error,
  })),
)

export const dbzFeature = createFeature({
  name: 'dbz',
  reducer: dbzReducer,
})

export const {
  selectCharacters,
  selectCharacterErrorLoad,
  selectPlanets,
  selectPlanetErrorLoad,
} = dbzFeature;