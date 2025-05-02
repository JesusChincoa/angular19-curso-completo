import {Component, computed, inject } from '@angular/core';
import { SopaLetrasComponent } from "../../components/sopa-letras/sopa-letras.component";
import { SopaLetrasService } from '../../services/sopa-letras.service';
import { ListaPalabrasComponent } from "../../components/lista-palabras/lista-palabras.component";

@Component({
  selector: 'app-sopa-letras-page',
  imports: [SopaLetrasComponent, ListaPalabrasComponent],
  templateUrl: './sopa-letras-page.component.html',
})
export class SopaLetrasPageComponent { 

  sopaService = inject(SopaLetrasService)

}
