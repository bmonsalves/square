import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html'
})

export class MapComponent {
  lat: number = -33.5036416;
  lng: number = -70.5732608;

  lugares:any = [];

  constructor(private lugaresService: LugaresService){
    this.obtenerLugares();
  }

  obtenerLugares(){
    this.lugaresService.getLugares()
      .subscribe((lugares)=>{
        this.lugares = Object.keys(lugares).map((key) => lugares[key]);
      },(error)=>{
        console.log(error)
      })
  }
}
