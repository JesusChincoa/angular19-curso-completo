import { afterNextRender, afterRender, Component, effect, OnChanges, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = (...messages:string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1).join(' ')}`, 'color: #baba55');
}


@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnChanges { 

  traditionalProperty = 'Jesús';
  signalProperty = signal('Jesús');


  constructor() {
    console.log('Constructor llamado');

    // setTimeout(() => {
    //   this.signalProperty.set('Me cambio solo jajaja tontoooo');
    // }, 2000);
  }

  basicEffect = effect((onCleanup) => {
    log('effect', 'Disparar efectos secubdarios');

    onCleanup(() => {
      log('onCleanup', 'Limpieza de efectos secundarios');
    })
})

changeTraditional(){
  this.traditionalProperty = 'Chincoa';
}

changeSignal(){
  this.signalProperty.set('Chincoa');
}


ngOnInit(){
  log(
    'ngOnInit',
    "Runs once after Angular has initialized all the component's inputs."
  )}

  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }
	
ngDoCheck(){
  log(
    'ngDoCheck',
    "Runs every time this component is checked for changes."
  )}		
ngAfterContentInit(){
  log(
    'ngAfterContentInit',
    "Runs once after the component's content has been initialized."
  )}	
ngAfterContentChecked(){
  log(
    'ngAfterContentChecked',
    "Runs every time this component content has been checked for changes."
  )}		
ngAfterViewInit(){
  log(
    'ngAfterViewInit',
    "Runs once after the component's view has been initialized."
  )}		
ngAfterViewChecked(){
  log(
    'ngAfterViewChecked',
    "Runs every time the component's view has been checked for changes."
  )}

  ngOnDestroy(){
    log(
      'ngOnDestroy',
      "Runs just before the component is destroyed."
    )
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRenderEffect',
      "Runs after the component's view has been rendered."
    )
  })

  afterRender = afterRender(() => { 
    log(
      'afterRender',
      "Runs after the component's view has been rendered."
    )
  }
  )
}
