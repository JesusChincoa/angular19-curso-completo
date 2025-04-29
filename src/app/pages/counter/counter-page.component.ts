import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({templateUrl: './counter-page.component.html', //templateUrl para referenciar el archivo html en el componente
    styles:  `
        button{
            padding: 10px;
            margin: 5px;
            width: 75px;
        } 
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
}) 
export class CounterPageComponent {
    counter = 10;
    counterSignal = signal(10);
    constructor() {
        setInterval(() => {
            // this.counterSignal.update((current) => current + 1);
            //this.counter +=1;
            // console.log('Tick');
    }, 2000);
}

    increaseBy(value:number){
        this.counter += value;
        this.counterSignal.update((current) => current + value);
    }

    resetCounter(){
        this.counter = 0;
        this.counterSignal.set(0);
    }
}