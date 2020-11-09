import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { query } from 'rx-query';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  name: string;

  details$ = query('details', () =>
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.name}`).pipe(
      map((data: any): PokemonDetails => ({
        id: data.id,
        name: data.name,
        height: data.height,
        types: data.types.map(({ type }) => type.name),
        abilities: data.abilities.map(({ ability }) => ability.name),
      }))
    )
  );

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('name');
    });
  }
}

export interface PokemonDetails {
  id: number,
  name: string,
  height: number,
  types: string[]
  abilities: string[]
}
