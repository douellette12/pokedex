import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from './services/pokemon-service.service';
import { HttpClient } from '@angular/common/http';
import { InfoComponent } from './info/info.component';
import { FormControl, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, InfoComponent, ReactiveFormsModule, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'pokedex';
  pokemon: any = {
    next: '',
    previous: '',
    list: []
  }
  pages = []
  pokemonInfo: any
  selectedPokemonIndex = 0
  pageOffset = 0
  details = false
  descending = false

  searchForm = new FormRecord({
    query: new FormControl(null, Validators.required)
  })

  constructor(private pokemonService: PokemonService, private http: HttpClient) {}

  ngOnInit(): void {
    this.pokemonService.get()
    .subscribe({
      next: (pokemon: any) => {
        this.setPokemon(pokemon)
      }
    })

  }
  
  search() {
    this.pokemon.list = this.pokemon.list.filter((pokemon: any) => pokemon.name.includes(this.searchForm.value['query']))
  }

  clearFilters() {
    this.pokemonService.get()
    .subscribe({
      next: (pokemon: any) => {
        this.setPokemon(pokemon)
      }
    })
  }

  setPokemon(pokemon: any) {
    this.pokemon.list = []
      for (let i = 0; i < pokemon.results.length; i++) {
        this.http.get(pokemon.results[i].url)
        .subscribe({
          next: (response: any) => {
            this.pokemon.list.push(response)
            this.pokemon.list.sort((a: any, b: any) => {
              if(this.descending) return (b.id - a.id)
              else return (a.id - b.id);
            })
          }
        })
      }
      this.pokemon.next = pokemon.next
      this.pokemon.previous = pokemon.previous

  }


  getNext() {
    this.pageOffset += 150
    if (this.pokemon.next){
      this.pokemonService.setUrl(this.pokemon.next)
      this.pokemonService.get()
      .subscribe({
        next: (response: any) => {
          this.setPokemon(response)
          this.selectedPokemonIndex = 0
        }
      })
    }
  }

  getPrevious() {
    this.pageOffset -= 150
    if (this.pokemon.previous) {
      this.pokemonService.setUrl(this.pokemon.previous)
      this.pokemonService.get()
      .subscribe({
        next: (response: any) => {
          this.setPokemon(response)
          this.selectedPokemonIndex = 0
        }
      })
    } 
  }

  selectPokemon(pokemon: any) {
    this.selectedPokemonIndex = pokemon.id - this.pageOffset - 1
  }

  openInfo(pokemon: any) {
    this.details = true
    this.pokemonInfo = pokemon
  }

  sort() {
    this.descending = !this.descending
    this.pokemon.list.reverse()
  }
}
