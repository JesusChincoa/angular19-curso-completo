import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';


const client1 = {
  name: 'Jesus',
  gender: 'male',
  age: 22,
  address: 'Málaga, España'
}

const client2 = {
  name: 'Paca',
  gender: 'female',
  age: 69,
  address: 'Málaga, España'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
     I18nSelectPipe,
     I18nPluralPipe,
     SlicePipe,
     JsonPipe,
     KeyValuePipe,
     TitleCasePipe,
     AsyncPipe
    ],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent { 

  client = signal(client1);

  //i18nSelect
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  };

  changeClient(){
    if(this.client() === client1){
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }


  //i18nPlural

  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos 1 cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando',
  });

  clients = signal([
    'Maria',
    'Pedro',
    'Jesús',
    'Allan',
    'Melissa',
    'Pepe',
    'Kevin',
  ])

  deleteClient(){
    this.clients.update((prev) => prev.slice(1))
  }

  //keyValue Pipe
  profile ={
    name: 'Jesús',
    age: 22,
    address : 'Málaga, España'
  }

  //Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) =>{
    setTimeout(() => {
      // reject('Tenemos un fallo en la promesa');
      resolve('Tenemos datos en la promesa.');
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval(2000).pipe(
    map( (value) => value + 1),
    tap( (value) => console.log('tap', value) )
  );
}
