import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map, publishLast, refCount } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'any',
})
export class GenerationApiService {
  private obs: Observable<Pokemon[]>;

  constructor(private http: HttpClient) {
    this.onInit();
  }

  public firstGeneration(): Observable<Pokemon[]> {
    return this.obs;
  }

  private onInit(): void {
    this.obs = this.http.get('https://pokeapi.co/api/v2/generation/1').pipe(
      first(),
      map((data: any) =>
        data.pokemon_species.map(({ name }) => ({ name } as Pokemon))
      ),
      catchError((err) => {
        this.onInit();
        return throwError(err);
      }),
      publishLast(),
      refCount()
    );
  }
}
