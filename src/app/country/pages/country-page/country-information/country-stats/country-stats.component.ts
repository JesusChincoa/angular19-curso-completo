import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'country-stats',
  imports: [DecimalPipe],
  templateUrl: './country-stats.component.html',
})
export class CountryStatsComponent { 
  capital = input.required<string>();
  poblacion = input.required<number>();
}
