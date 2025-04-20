import type { Character } from "@/core/interfaces/character.interface";
import { CharactersGateway } from "@/domain/gateways/characters-gateway";
import { CharactersUseCase } from "@/domain/use-cases/characters-usecase";
import { CharactersService } from "@/infrastructure/driver-adapters/characters.service";
import { CardComponent } from "@/ui/components/card/card.component";
import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  inject,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "dbz-characters",
  imports: [
    RouterLink,
    CardComponent,
  ],
  providers: [
    CharactersUseCase,
    // {
    //   provide: CharactersGateway,
    //   useExisting: CharactersService,
    // }
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
