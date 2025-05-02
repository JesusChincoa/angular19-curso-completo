import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { SopaLetrasService } from '../../services/sopa-letras.service';

@Component({
  selector: 'lista-palabras',
  imports: [],
  templateUrl: './lista-palabras.component.html',
})
export class ListaPalabrasComponent { 

  sopaService = inject(SopaLetrasService)
  palabras = input.required<string[]>()
  palabrasEncontradas = input.required<Set<string>>()

}
