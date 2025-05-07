import type { Character } from '@/core/interfaces/character.interface';
import { charactersMock } from '@/core/mocks/character.mock';
import { CharactersGateway } from '@/domain/gateways/characters-gateway';
import { CharactersUseCase } from '@/domain/use-cases/characters-usecase';
import { CharactersService } from '@/infrastructure/driver-adapters/characters.service';
import { dbzPageActions } from '@/state/actions/dbz-page.actions';
import { selectCharacters } from '@/state/reducers/dbz.reducer';
import { StateFacadeService } from '@/state/service/state-facade.service';
import { CardComponent } from '@/ui/components/card/card.component';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
  type OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'dbz-characters',
  imports: [RouterLink, CardComponent, AsyncPipe],
  providers: [
    CharactersUseCase,
    // {
    //   provide: CharactersGateway,
    //   useExisting: CharactersService,
    // }
  ],
  templateUrl: './characters.component.html',
  styles: `
    :host {
      .character-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
        gap: 1rem;
        margin: 1rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CharactersComponent implements OnInit, OnDestroy {
  // private readonly _charactersUsecase = inject(CharactersUseCase);

  private readonly _stateFacadeSrv = inject(StateFacadeService);
  private readonly characters$ = this._stateFacadeSrv.characters$;
  readonly characterErrorLoad$ = this._stateFacadeSrv.characterErrorLoad$;

  private destroy$ = new Subject<void>();
  characters = signal<Character[]>([]);

  ngOnInit(): void {
    // this._charactersUsecase.getCharacters().then((response) => {
    //   console.log(response);
    //   this.characters.set(response.characters);
    // });

    // sync way

    // this._stateFacadeSrv.setCharacters(charactersMock());
    // this.characters$.pipe(takeUntil(this.destroy$)).subscribe({
    //   next: (characters) => this.characters.set(characters),
    // });

    // setTimeout(() => {
    //   this._stateFacadeSrv.setCharacters([]);
    // }, 4_000);

    // Async way

    this._stateFacadeSrv.getCharacters();
    this.characters$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (characters) => this.characters.set(characters),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleCharacter(character: string) {
    console.log(character);
  }
}
