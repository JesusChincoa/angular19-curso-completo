import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../hero.data';
import { CanFlyPipe } from "../../pipes/can-fly.pipe";
import { HeroColorPipe } from "../../pipes/hero-color.pipe";
import { HeroTextColorPipe } from "../../pipes/hero-text-color.pipe";
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from "../../pipes/hero-creator.pipe";
import { HeroSortByPipe } from "../../pipes/hero-sort-by.pipe";
import { Hero } from '../../interfaces/hero.interface';
import { HeroFilterPipe } from "../../pipes/hero-filter.pipe";

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
    HeroSortByPipe,
    HeroFilterPipe
],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent { 

  name = signal('Jesús Chincoa')

  upperCase = signal(true)

  changeCase(){
    if(this.upperCase()){
      this.upperCase.set(false);
      return;
    }
    this.upperCase.set(true);
  }

  heroes = signal(heroes)

  sortBy = signal<keyof Hero| null>(null);

  searchQuery = signal('')
}
