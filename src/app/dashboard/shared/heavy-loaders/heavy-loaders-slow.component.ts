import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [CommonModule],
  template: `<h1>hola mundo</h1>`,
})
export class HeavyLoadersSlowComponent { 


  constructor (){

    const start = Date.now
    while (Date.now() - start() < 3000){}

    console.log("HeavyLoader Component")
  }
}
