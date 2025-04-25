import { CharactersUseCase } from '@/domain/use-cases/characters-usecase';
import { PlanetsUseCase } from '@/domain/use-cases/planets-usecase';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { dbzApiActions } from '../actions/dbz-api.actions';
import { catchError, exhaustMap, from, map, of } from 'rxjs';

@Injectable()
export class DbzEffects {
  private readonly _apiActions = inject(Actions);
  private readonly _charactersUsecase = inject(CharactersUseCase);
  private readonly _planetsUsecase = inject(PlanetsUseCase);

  getCharacters$ = createEffect(() => {
    return this._apiActions.pipe(
      ofType(dbzApiActions.getCharacters),
      exhaustMap(() =>
        from(this._charactersUsecase.getCharacters()).pipe(
          map((response) =>
            dbzApiActions.getCharactersSuccess({
              characters: response.characters,
            })
          ),
          catchError(() =>
            of(
              dbzApiActions.getCharactersError({
                error: 'Something went wrong loading characters',
              })
            )
          )
        )
      )
    );
  });
}
