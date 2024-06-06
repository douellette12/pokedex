import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbbreviatePipe } from '../pipes/abbreviate.pipe';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, AbbreviatePipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnChanges{
  constructor(private http: HttpClient){}

  @Input()
  pokemon: any
  speciesData: any

  ngOnChanges(): void {
    this.http.get(this.pokemon.species.url)
    .subscribe(response => this.speciesData = response)
  }

  selectPokemon(id: number) {
    this.http.get("https://pokeapi.co/api/v2/pokemon/" + id)
    .subscribe(response => {
      this.pokemon = response    
      this.http.get(this.pokemon.species.url)
      .subscribe(response => this.speciesData = response)
    })
  }
}
