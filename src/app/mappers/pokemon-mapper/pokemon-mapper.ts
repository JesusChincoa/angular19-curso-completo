import { LimitPokemon, Result } from "../../interfaces/limitpokemon.interface";
import { Pokemon } from "../../interfaces/pokemon.interface";
import { RESTPokemon } from "../../interfaces/restpokemon.interface";
import { RESTType } from "../../interfaces/resttypes.interface";

export class PokemonMapper { 

  static mapRestPokemonToPokemon (restPokemon: RESTPokemon): Pokemon{
    
    return{
      id: restPokemon.id,
      name: restPokemon.name,
      species: restPokemon.species,
      sprites: restPokemon.sprites,
      stats: restPokemon.stats,
      types: restPokemon.types,

    }
  }

  static mapRestPokemonArrayToPokemonArray (restPokemon: RESTPokemon[]): Pokemon[]{
    return restPokemon.map(this.mapRestPokemonToPokemon)
  }


//   static mapRestTypetoPokemonArray (restType: RESTType): Pokemon[]{
//     return restType.pokemon
//   }
}
