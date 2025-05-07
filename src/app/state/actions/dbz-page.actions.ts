import type { Character } from '@/core/interfaces/character.interface';
import type { Planet } from '@/core/interfaces/planets.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const dbzPageActions = createActionGroup({
  source: 'DbzPage',
  events: {
    'set characters': props<{ characters: Character[] }>(),
    'set loading': props<{ loading: boolean }>(),
    'set planets': props<{ planets: Planet[] }>(),
  },
});
