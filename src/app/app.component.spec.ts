import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'
import { HeaderComponent } from './ui/components/header/header.component'
import { RouterModule } from '@angular/router'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        RouterModule.forRoot([])
      ]
    }).compileComponents()
  })

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  test('should render dbz-header', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('dbz-header'))
    expect(header).toBeTruthy()
  })
})
