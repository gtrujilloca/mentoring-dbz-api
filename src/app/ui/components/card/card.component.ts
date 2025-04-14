import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dbz-card',
  imports: [],
  templateUrl: './card.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent { }
