import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'crear-component',
  templateUrl: './crear.component.html'
})

export class CrearComponent {
  lugar:any = {};
  id:number = null;

  constructor(private lugaresService: LugaresService, private route: ActivatedRoute){

    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.lugaresService.getLugar(this.id)
          .valueChanges()
          .subscribe((lugar)=>{
            this.lugar = lugar;
          })
    }

  }

  guardarLugar(){

    if(!this.id){
      this.lugar.id = Date.now();
    }

    this.lugaresService.obtenerGeoData(this.lugar)
      .subscribe((geodata)=>{

        if(geodata){
          this.lugar.lat = geodata.results[0].geometry.location.lat;
          this.lugar.lng = geodata.results[0].geometry.location.lng;
        }

        this.lugaresService.guardarLugar(this.lugar);
      })

  }

}
