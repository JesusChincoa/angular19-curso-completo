import { Species, Sprites, Stat, Type } from "./restpokemon.interface";

export interface Pokemon {
    id:                       number;
    name:                     string;
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
}

