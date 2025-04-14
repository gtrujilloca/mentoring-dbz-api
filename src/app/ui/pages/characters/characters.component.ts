import type { Character } from "@/core/interfaces/character.interface";
import { CharactersUseCase } from "@/domain/use-cases/characters-usecase";
import { CardComponent } from "@/ui/components/card/card.component";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
  signal,
} from "@angular/core";

@Component({
  selector: "dbz-characters",
  imports: [
    CardComponent,
  ],
  providers: [
    CharactersUseCase,
  ],
  templateUrl: "./characters.component.html",
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
export default class CharactersComponent implements OnInit {
  private readonly _charactersUsecase = inject(CharactersUseCase);
  characters = signal<Character[]>([]);

  ngOnInit(): void {
    this._charactersUsecase.getCharacters().then((response) => {
      console.log(response);
      this.characters.set(response.characters);
    });
  }
}
