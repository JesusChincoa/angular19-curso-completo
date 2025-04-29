import { Creator } from './../interfaces/hero.interface';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroCreator',
})
export class HeroCreatorPipe implements PipeTransform {

  transform(value: number): string {
    return Creator[value];
  }

}
