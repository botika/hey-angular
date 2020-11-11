import { Injectable } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'any',
})
export class QueryService {
  private regExp = new RegExp('');

  public set pattern(pattern: string) {
    if (/^[a-z -]*$/i.test(pattern)) {
      this.regExp = new RegExp(pattern, 'i');
    }
  }

  public test = (pokemon: Pokemon): boolean => this.regExp.test(pokemon.name);
}
