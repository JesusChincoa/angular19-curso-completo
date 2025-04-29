import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-add-character',
  imports: [],
  templateUrl: './add-character.component.html',
})
export class AddCharacterComponent { 
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter(){
    if(!this.name() || !this.power() || this.power() <= 0) return;

    const newCharacter = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    }

    //this.characters.update(list => [...list, newCharacter]); //Mejor usar update al manejar señaes para evitar problemas de concurrencia
    this.newCharacter.emit(newCharacter);
    this.resetFields();
  }

  resetFields(){  
    this.name.set('');
    this.power.set(0);
  }

 }
