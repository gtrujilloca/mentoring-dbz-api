import type { Character } from "@/core/interfaces/character.interface";
import type { Planet } from "@/core/interfaces/planets.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const dbzApiActions =  createActionGroup({
  source: 'DbzApi',
  events: {
    'get characters': emptyProps(),
    'get characters success': props<{ characters: Character[] }>(),
    'get characters error': props<{ error: string }>(),
    'get planets': props<{ planets: Planet[] }>(),
  }
});

