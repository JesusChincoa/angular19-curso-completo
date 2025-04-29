import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';
import { filter, forkJoin, from, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { PokemonMapper } from '../mappers/pokemon-mapper/pokemon-mapper';
import { RESTPokemon} from '../interfaces/restpokemon.interface';
import { RESTType, Pokemon as TypePokemon } from '../interfaces/resttypes.interface';
import { LimitPokemon, Result } from '../interfaces/limitpokemon.interface';
import { Species } from '../interfaces/species.interface';

const API_KEY = 'https://pokeapi.co/api/v2/'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  //Todas las señales que uso para controlar filtros y evitar repetir buusquedas a la API
  currentTypeFilter = signal<string | null>(null);
  listaLegendarios = signal<Pokemon[] | null>(null);
  listaMiticos = signal<Pokemon[] | null>(null);
  listaCompleta = signal<Pokemon[] | null>(null);
  typeFilter = signal<boolean>(false);
  legendaryFilter = signal<boolean>(false);
  mythicalFilter = signal<boolean>(false);

  //Busqueda de pokemon por linea de texto
  searchPokemonByName(query:string): Observable<Pokemon | null>{
    query = query.toLowerCase();
    const respuesta:Observable<Pokemon|null> = this.http.get<RESTPokemon>(`${API_KEY}pokemon/${query}`).pipe(
      map((res) => PokemonMapper.mapRestPokemonToPokemon(res)),
      mergeMap((pokemon: Pokemon) => {
        if (this.typeFilter()){
          const currentType = this.currentTypeFilter()
          if (pokemon.types.some(t => t.type.name === currentType)) {
            return of(pokemon);
          } else {
            return of(null);
          }
        }
        else if (this.legendaryFilter()) {
          const lista = this.listaLegendarios();
          if (lista && lista.some(p => p.id === pokemon.id)) {
            return of(pokemon);
          } else {
            return of(null);
          }
        }
        else if (this.mythicalFilter()){
          const lista = this.listaMiticos();
          if (lista && lista.some(p => p.id === pokemon.id)) {
            return of(pokemon);
          } else {
            return of(null);
          }
        }
        else {
          return of(pokemon);
        }
      })
    );
    return respuesta
  }
  //Busqueda de pokemon por query completa
  searchPokemonByFullName(query:string): Observable<Pokemon>{
    query = query.toLowerCase();
    return this.http.get<RESTPokemon>(query).pipe(
      map((res) => PokemonMapper.mapRestPokemonToPokemon(res)),
    )
  }

  //Metodo que se ejecuta en el OnInit para mostrar los pokemon de primera generacion. Evito la lista entera para agilizar la carga inicial
  showFirstGeneration(limit:number): Observable<Pokemon[]> {
      const query = `${API_KEY}/pokemon?limit=${limit}`
      return this.http.get<LimitPokemon>(query).pipe(
        map(result => result.results),
        map(urls => urls.map(item => item.url)),
        switchMap((queries : string[]): Observable<Pokemon[]>  => {
          const resultado: Observable<Pokemon>[] = queries.map(query=> this.searchPokemonByFullName(query))
          const respuesta = forkJoin(resultado)
          return respuesta
        }),
      )
  }

  //Búsqueda de un número de pokémon
  searchPokemonList(limit:number): Observable<Pokemon[]> {
    this.legendaryFilter.set(false)
    this.mythicalFilter.set(false)
    this.typeFilter.set(false)
    this.currentTypeFilter.set(null)
    //Como este método solo se llama al mostrar todos los pokemons ahora mismo, al llamarse le paso su valor a la lista completa
    //Si es la primera llamada al metodo, manda la peticion a la API
    if(this.listaCompleta() == null){
      const query = `${API_KEY}/pokemon?limit=${limit}`
      return this.http.get<LimitPokemon>(query).pipe(
        map(result => result.results),
        map(urls => urls.map(item => item.url)),
        switchMap((queries : string[]): Observable<Pokemon[]>  => {
          const respuesta: Observable<Pokemon>[] = queries.map(query=> this.searchPokemonByFullName(query))
          return forkJoin(respuesta)
        }),
        mergeMap((pokemon: Pokemon[]):Observable<Pokemon[]> => {
          this.listaCompleta.set(pokemon)
          return of(pokemon)
        })
      )
    }
    //Si ya ha sido iniciada, devuelve el valor de la señal
    return of(this.listaCompleta()!)
  }
  
  
  //Filtrado por tipos
  searchPokemonByType(query:string):Observable<Pokemon[] | null>{
    this.currentTypeFilter.set(query)
    this.typeFilter.set(true)
    //Si no hemos cargado la lista completa, hacemos la petición del tipo
    if(this.listaCompleta() == null){
      query = query.toLowerCase();
      return this.http.get<RESTType>(`${API_KEY}type/${query}`).pipe(
        map(result => result.pokemon),
        switchMap((typePokemon: TypePokemon[]): Observable<Pokemon[]> =>{
          const generation = typePokemon.map(generacion => generacion.pokemon)
          const queries: string[] = generation.map(urls => urls.url)
          const respuesta: Observable<Pokemon>[] = queries.map(query=> this.searchPokemonByFullName(query))
          return forkJoin(respuesta)
        })
      )
    }
    //Si el filtro de legendarios está activo, devolvemos solo los legendarios de ese tipo
    if(this.legendaryFilter()){
      this.legendaryFilter.set(!this.legendaryFilter())
      return this.searchLegendaryPokemons()
    }
    //Si el filtro de míticos está activo, devolvemos solo los míticos de ese tipo
    if(this.mythicalFilter()){
      this.mythicalFilter.set(!this.mythicalFilter())
      return this.searchMythicalPokemons()
    }
    //Si tenemos la lista completa cargada, aplicamos un filtro por tipos para ahorrar peticiones a la API y mejorar el rendimiento
    return of(this.listaCompleta()!.filter(pokemon => pokemon.types.some(t => t.type.name == query))
)
  }

  //Filtrado por pokemon legendarios
  searchLegendaryPokemons(): Observable<Pokemon[] | null> {
      this.legendaryFilter.set(!this.legendaryFilter())
      this.mythicalFilter.set(false)
      //Si es la primera llamada al método, hago la petición a la API y la guardo la lista en caché
      if(this.listaLegendarios() == null){
      const query = 'https://pokeapi.co/api/v2/pokemon-species?limit=1025'
      return this.http.get<LimitPokemon>(query).pipe(
        map((limitPokemon: LimitPokemon) => limitPokemon.results),
        mergeMap((results: Result[]) => {
          const urls: Observable<Pokemon | null>[] = results.map((result: Result) =>
            this.http.get<Species>(result.url).pipe(
              mergeMap((species: Species): Observable<Pokemon | null> => {
                if (species.is_legendary) {
                  const defaultVariety = species.varieties.find(variety => variety.is_default);
                  //Como hay legendarios que tienen varias formas y todas tienen el mismo id, para evitar errores mostramos solo la que venga como default
                  if (defaultVariety) {
                    return this.http.get<Pokemon>(defaultVariety.pokemon.url);
                  } else {
                    return of(null);
                  }
                }
                return of(null);
              })
            )
          );
          return forkJoin(urls) as Observable<(Pokemon | null)[]>;
        }),
        //Quitamos los valores nulos que haya podido devolver la búsqueda y los maps
        map((pokemonArray: (Pokemon | null)[]) =>{
          const res = pokemonArray.filter((pokemon): pokemon is Pokemon => pokemon !== null)
          this.listaLegendarios.set(res)
          return res
        },
        //Si hay algún filtro en uso, se aplica también
        ),
        switchMap(pokemonList => this.filterByCurrentType(pokemonList))
      );
    }
    //Si la lista ya se ha buscado, mostramos la lista de legendarios o la completa según si aplicamos o quitamos el filtro
    let lista:Pokemon[]|null
    if(this.legendaryFilter()){
      lista = this.listaLegendarios()
    }
    else{
      lista = this.listaCompleta()
    }
    //Si hay un filtro de tipo activo, se aplica también a la lista
    if(this.typeFilter()){
      return (this.filterByCurrentType(lista))
    }
    return of(lista)
  }


  //Filtrar por Pokémon míticos
  searchMythicalPokemons(): Observable<Pokemon[]| null> {
      this.legendaryFilter.set(false)
      this.mythicalFilter.set(!this.mythicalFilter())
      //Si es la primera vez que se llama al método, hace la búsqueda y la almacena la lista en caché
      if (this.listaMiticos() == null){ 
      const query = 'https://pokeapi.co/api/v2/pokemon-species?limit=1025'
      return this.http.get<LimitPokemon>(query).pipe(
        map((limitPokemon: LimitPokemon) => limitPokemon.results),
        mergeMap((results: Result[]) => {
          const urls: Observable<Pokemon | null>[] = results.map((result: Result) =>
            this.http.get<Species>(result.url).pipe(
              mergeMap((species: Species): Observable<Pokemon | null> => {
                if (species.is_mythical) {
                  const defaultVariety = species.varieties.find(variety => variety.is_default);
                  //Como hay míticos con varias formas y el mismo id, para evitar errores buscamos la versión por defecto para devolverla
                  if (defaultVariety) {
                    return this.http.get<Pokemon>(defaultVariety.pokemon.url);
                  } else {
                    return of(null);
                  }
                }
                return of(null);
              })
            )
          );
          return forkJoin(urls) as Observable<(Pokemon | null)[]>;
        }),
        //Mapeamos el array para eliminar todos los valores nulos
        map((pokemonArray: (Pokemon | null)[]) =>{
          const res = pokemonArray.filter((pokemon): pokemon is Pokemon => pokemon !== null)
          this.listaMiticos.set(res)
          return res
        }
        //Si hay algún filtro en uso, se aplica también
        ),
        switchMap(pokemonList => this.filterByCurrentType(pokemonList)),
      );
    
    //Si la lista ya ha sido iniciada, accedemos a ella o a la lista general dependiendo si activamos o desactivamos el filtro
    }
    let lista:Pokemon[]|null
    if(this.mythicalFilter()){
      lista = this.listaMiticos()
    }
    else{
      lista = this.listaCompleta()
    }
    //Si hay un filtro de tipo activo, filtramos también la lista
    if(this.typeFilter()){
      return (this.filterByCurrentType(lista))
    }
    return of(lista)
  }


  //Filtrar un array de pokemons según el tipo que queramos
  filterByCurrentType(pokemonList: Pokemon[] | null): Observable<Pokemon[]> {
    const currentType = this.currentTypeFilter();
    //Si el filtro no está iniciado o es nulo, devolvemos la lista normal ya que no estamos aplicando filtrado por tipos
    if (!currentType || currentType === null) return of(pokemonList!);
  
    //De cada pokemon en la lista, buscamos si alguno de sus tipos coincide con el que estamos filtrando
    const filtered = pokemonList!.filter(pokemon =>
      pokemon.types.some(t => t.type.name === currentType)
    );
    return of(filtered);
  }
  
}