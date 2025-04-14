import type { Planet } from '@/core/interfaces/planets.interface';
import { PlanetsUseCase } from '@/domain/use-cases/planets-usecase';
import { CardComponent } from '@/ui/components/card/card.component';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

@Component({
  selector: 'dbz-planets',
  imports: [
    CardComponent,
  ],
  providers: [
    PlanetsUseCase,
  ],
  templateUrl: './planets.component.html',
  styles: `
    :host {
      .planet-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
        gap: 1rem;
        margin: 1rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlanetsComponent {
  private readonly _planetsUsecase = inject(PlanetsUseCase);
  planets = signal<Planet[]>([]);

  ngOnInit(): void {
    this._planetsUsecase.getPlanets().then((response) => {
      console.log(response);
      this.planets.set(response.planets);
    });
  }
}
