import { Component, viewChild, ElementRef, signal, AfterViewInit } from "@angular/core";
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from "../../../environments/environment";
import { v4 as UUIDV4 } from 'uuid';
import { JsonPipe } from "@angular/common";

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string,
  mapboxMarker: mapboxgl.Marker,
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');

  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));


    const element = this.divElement()!.nativeElement;
    console.log(element);

    // const{lat, lng} = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-4.46, 36.72], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    // const marker = new mapboxgl.Marker({
    //   draggable: true,
    //   color: 'red',
    // })
    //   .setLngLat([-4.46, 36.72])
    //   .addTo(map);

    // marker.on('dragned', (event) => {
    //   console.log(event)
    // });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({
      color: color,
    })
      .setLngLat(event.lngLat)
      .addTo(this.map()!)
    console.log(event)

    const newMarker: Marker = {
      id: UUIDV4(),
      mapboxMarker: marker,
    }

    this.markers.set([...this.markers(), newMarker]);
  }

  flyToMarker (lnglat: LngLatLike){
    if (!this.map()) return;
    this.map()!.flyTo({
      center:lnglat
    });
  }

  deleteMarker(marker: Marker) {
    if(!this.map()) return;
    const map = this.map()!;

    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter(m => m.id !== marker.id));
  }

}
