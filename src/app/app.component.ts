import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './ui/components/header/header.component'
import { Store } from '@ngrx/store';
import { dbzApiActions } from './state/actions/dbz-api.actions';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hello world!'

  private readonly store = inject(Store);

  handleLoadCharacters() {
    console.log('handleLoadCharacters');
    this.store.dispatch(dbzApiActions.getCharacters());
  }
}
