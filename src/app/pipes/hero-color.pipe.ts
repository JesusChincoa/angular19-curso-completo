import { Pipe, type PipeTransform } from '@angular/core';
import { Color } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor',
})
export class HeroColorPipe implements PipeTransform {
  private color = Color;
  transform(value: number): string {
    return this.color[value];
  }

}
