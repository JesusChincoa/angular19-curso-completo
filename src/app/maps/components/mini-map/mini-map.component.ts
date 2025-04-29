import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: { lng: number; lat: number };
  tags: string[];
}

mapboxgl.accessToken = environment.mapboxKey

// width = 100%
// height = 260


@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: [`
    div{
      width: 100%;
      height: 260px;
    }
  `],
})
export class MiniMapComponent implements AfterViewInit { 

  divElement = viewChild<ElementRef>('map');

  house = input.required<HouseProperty>();
  zoom = input<number>()

  map = signal<mapboxgl.Map | null>(null);
  // markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));


    const element = this.divElement()!.nativeElement;
    console.log(element);

    // const{lat, lng} = this.coordinates();

    const map = new mapboxgl.Map({
      
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.house().lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false,
    });

    new mapboxgl.Marker().setLngLat(this.house().lngLat).addTo(map);

    // const marker = new mapboxgl.Marker({
    //   draggable: true,
    //   color: 'red',
    // })
    //   .setLngLat([-4.46, 36.72])
    //   .addTo(map);

    // marker.on('dragned', (event) => {
    //   console.log(event)
    // });

  }
}
