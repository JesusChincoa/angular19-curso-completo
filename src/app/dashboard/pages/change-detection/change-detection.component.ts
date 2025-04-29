import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { TitleComponent } from "../../shared/side-menu/title/title.component";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-change-detection',
  imports: [TitleComponent, JsonPipe],
  template: `
  
  <app-title title= "Change Detection" />
  {{frameworkAsSignal() | json}}
  {{frameworkAsProperty | json}}

  `
})
export class ChangeDetectionComponent {

  public frameworkAsSignal = signal({
    name:'Angular',
    releaseDate: 2016
  })

  public frameworkAsProperty =({
    name:'Angular',
    releaseDate: 2016
  })

  constructor() {

    setTimeout(() => {


        // this.frameworkAsProperty.name = 'React';
        this.frameworkAsSignal.update( value => {
          value.name = 'React';

          return {...value};
        })

        console.log('Hecho');
    }, 3000);

  }

 }
