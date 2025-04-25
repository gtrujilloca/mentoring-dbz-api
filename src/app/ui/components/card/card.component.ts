import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dbz-card',
  imports: [],
  templateUrl: './card.component.html',
  styles: `
    :host {
      .card__description {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        min-height: 100px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() img = '';
  @Input() tagline = '';
  @Input() tagline2 = '';

  @Output() onCharacterClicked = new EventEmitter<string>();

  handleCharacter(character: string) {
    this.onCharacterClicked.emit(character);
  }
}
