import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, publishLast, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
      catchError((err) => {
        this.onInit();
        return err;
      }),
      map((data: any) =>
        data.pokemon_species.map(({ name }) => ({ name } as Pokemon))
      ),
      publishLast(),
      refCount()
    );
  }
}

export interface Pokemon {
  name: string;
}
