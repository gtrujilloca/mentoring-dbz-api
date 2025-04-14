import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dbz-header',
  imports: [],
  templateUrl: './header.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent { }
