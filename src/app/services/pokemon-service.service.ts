import { Inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends DataService{

  constructor(http: HttpClient) {
    super(http, "https://pokeapi.co/api/v2/pokemon?limit=150")
   }
}
