import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { CountryStatsComponent } from "./country-stats/country-stats.component";

@Component({
  selector: 'country-information-page',
  imports: [CountryStatsComponent],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent { 

  country = input.required<Country>();

}
