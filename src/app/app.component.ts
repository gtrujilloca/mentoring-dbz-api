import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './ui/components/header/header.component'
import { Store } from '@ngrx/store';
import { dbzApiActions } from './state/actions/dbz-api.actions';
import { of } from 'rxjs/internal/observable/of';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hello world!'
  isLoading$ = of(false);
  private readonly store = inject(Store);

  handleLoadCharacters() {
    console.log('handleLoadCharacters');
    this.store.dispatch(dbzApiActions.getCharacters());
  }
}
