import { NgClass } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { Character } from "../../interfaces/character.interface";
import { AddCharacterComponent } from "../../components/dragonball/add-character/add-character.component";
import { DragonballService } from "../../services/dragonball.service";

@Component({templateUrl: './dragonball-super-page.component.html',
    imports: [
    CharacterListComponent,
    AddCharacterComponent
],
},

)
export class DragonballSuperPageComponent {
    public dragonballService = inject(DragonballService);
}