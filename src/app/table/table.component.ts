import {ChangeDetectionStrategy, Component} from '@angular/core';

import { query } from 'rx-query';

import { tap } from 'rxjs/operators';
import { GenerationApiService, Pokemon } from '../generation-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  pokemonNumber = 0;

  generation$ = query('first generation', () =>
    this.apiService.firstGeneration().pipe(
      tap((x) => {
        this.pokemonNumber = x.length;
      })
    )
  );

  private regExp = new RegExp('');

  constructor(private apiService: GenerationApiService) {}

  public set pattern(pattern: string) {
    if (/^[a-z -]*$/i.test(pattern)) {
      this.regExp = new RegExp(pattern, 'i');
    }
  }

  query = (pokemon: Pokemon): boolean => this.regExp.test(pokemon.name);
}
