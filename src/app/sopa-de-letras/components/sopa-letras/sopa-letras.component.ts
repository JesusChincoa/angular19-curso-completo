import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { SopaLetrasService } from '../../services/sopa-letras.service';


@Component({
  selector: 'sopa-letras',
  imports: [NgClass],
  templateUrl: './sopa-letras.component.html',
})
export class SopaLetrasComponent implements OnInit{ 
  palabras = input.required<string[]>()

  sopaService = inject(SopaLetrasService)

  ngOnInit(): void {
    this.sopaService.generarSopaLetras();
  }
}