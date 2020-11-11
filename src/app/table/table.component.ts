import { ChangeDetectionStrategy, Component } from '@angular/core';

import { query } from 'rx-query';

import { tap } from 'rxjs/operators';
import { GenerationApiService } from '../services/generation-api.service';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  pokemonNumber = 0;

  generation$ = query(
    'first generation',
    () =>
      this.apiService.firstGeneration().pipe(
        tap((x) => {
          this.pokemonNumber = x.length;
        })
      ),
    { retries: 0 }
  );

  constructor(
    private apiService: GenerationApiService,
    public re: QueryService
  ) {}
}
