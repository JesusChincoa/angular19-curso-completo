import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStrorage = (): Character[] => { 
    const characters = localStorage.getItem('characters');
    return characters ? JSON.parse(characters) : [];
 };

@Injectable({ providedIn: 'root' })
export class DragonballService {
    characters = signal<Character[]>(loadFromLocalStrorage());

    savetoLocalStorage = effect( () => {
       localStorage.setItem('characters', JSON.stringify(this.characters()));
    });

    addCharacter(newCharacter: Character){
         this.characters.update((list) => [...list, newCharacter]); //Mejor usar update al manejar señaes para evitar problemas de concurrencia
 }
}