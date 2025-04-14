import { CardComponent } from '@/ui/components/card/card.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dbz-characters',
  imports: [
    CardComponent
  ],
  templateUrl: './characters.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent { }
