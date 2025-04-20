import type { Character } from '@/core/interfaces/character.interface';
import { CharactersGateway } from '@/domain/gateways/characters-gateway';
import { CharactersUseCase } from '@/domain/use-cases/characters-usecase';
import { CharactersService } from '@/infrastructure/driver-adapters/characters.service';
import { ChangeDetectionStrategy, Component, inject, Input, numberAttribute, type OnInit, signal } from '@angular/core';

@Component({
  selector: 'dbz-character',
  imports: [],
  providers: [
    CharactersUseCase,
    // {
    //   provide: CharactersGateway,
    //   useExisting: CharactersService,
    // }
  ],
  templateUrl: './character.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CharacterComponent implements OnInit {
  @Input({
    required: true,
    transform: numberAttribute,
  }) id!: number;

  private readonly _charactersUsecase = inject(CharactersUseCase);

  character = signal<Character | null>(null);

  ngOnInit(): void {
    this._charactersUsecase.getCharacterById(this.id).then((response) => {
      console.log(response);
      this.character.set(response);
    });
  }
}
