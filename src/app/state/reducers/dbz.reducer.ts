import type { Character } from "@/core/interfaces/character.interface";
import type { Planet } from "@/core/interfaces/planets.interface";
import { createFeature, createReducer, on } from "@ngrx/store";
import { dbzApiActions } from "../actions/dbz-api.actions";
import { dbzPageActions } from "../actions/dbz-page.actions";

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

export const dbzReducer = createReducer<DbzState>(
  initialDbzState,
  on(dbzPageActions.setCharacters, (state, { characters }) => ({
    ...state,
    characters,
  })),
  on(dbzPageActions.setLoading, (state, { loading}) => ({
    ...state,
    isLoading: loading,
  })),
  on(dbzPageActions.setPlanets, (state, { planets }) => ({
    ...state,
    planets,
  })),
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
  selectIsLoading,
} = dbzFeature;