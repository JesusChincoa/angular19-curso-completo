import { Pipe, type PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroTextColor',
})
export class HeroTextColorPipe implements PipeTransform {
  private colorMap = ColorMap;
  transform(value: Color): string {
    return this.colorMap[value]
  
  }
}
