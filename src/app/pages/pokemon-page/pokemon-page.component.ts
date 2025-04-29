import {Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-page',
  imports: [TitleCasePipe, CommonModule],
  templateUrl: './pokemon-page.component.html',
})
export class PokemonPageComponent implements OnInit{

  typeColorMap: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };

  pokemonService = inject(PokemonService);
  searchedPokemon = signal<Pokemon | null> (null);
  pokemonList = signal<Pokemon[] | null> (null);
  shinySprite = signal(false)
  pokemonListFiltered = signal<Pokemon[] | null> (null);
  currentTypeSelected = signal<string | null> (null);

  ngOnInit(): void {
    this.pokemonService.showFirstGeneration(151).subscribe((response) =>
      this.pokemonList.set(response)
    );
  }

  onSearch(query: string) {
    this.pokemonService.searchPokemonByName(query).subscribe((response) => {
      this.searchedPokemon.set(response);
      this.pokemonList.set(null)  
    });
  }

  onTypeSearch(type:string){
    this.pokemonService.searchPokemonByType(type).subscribe((response) =>{
      this.pokemonList.set(response)
      this.searchedPokemon.set(null)
      this.pokemonListFiltered.set(response)
      this.currentTypeSelected.set(type)
    });
  }
  

  onPokemonList(limit: number){
    this.pokemonService.searchPokemonList(limit).subscribe((response) =>{
      this.pokemonList.set(response)
      this.searchedPokemon.set(null)
      this.pokemonListFiltered.set(null)
      this.currentTypeSelected.set(null)
    });
  }

  onLegendarySearch(){
    this.pokemonService.searchLegendaryPokemons().subscribe((response) =>{
      this.pokemonList.set(response)
      this.searchedPokemon.set(null)
    });
  }

  onMythicalSearch(){
    this.pokemonService.searchMythicalPokemons().subscribe((response) =>{
      this.pokemonList.set(response)
      this.searchedPokemon.set(null)
    });
  }

  
get currentTypeColor(): string {
  if (this.currentTypeSelected() && this.typeColorMap[this.currentTypeSelected()!]) {
    return this.typeColorMap[this.currentTypeSelected()!];
  }
  return '#ffffff'; // Color por defecto (blanco) si no hay tipo seleccionado
}



}
