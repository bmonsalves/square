import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'crear-component',
  templateUrl: './crear.component.html'
})

export class CrearComponent {
  lugar:any = {};
  geodata:any = {};
  id:number = null;

  constructor(private lugaresService: LugaresService, private route: ActivatedRoute){

    this.id = this.route.snapshot.params['id'];
    if(this.id != null){
      this.lugaresService.getLugar(this.id)
          .valueChanges()
          .subscribe((lugar)=>{
            this.lugar = lugar;
          })
    }

  }

  guardarLugar(){

    if(this.id != null){
      this.lugaresService.editarLugar(this.lugar)
      alert('editado')
      return;
    }

    this.lugar.id = Date.now();
    this.lugaresService.obtenerGeoData(this.lugar)
      .subscribe((geodata)=>{

        this.geodata = geodata;
        if(this.geodata){
          this.lugar.lat = this.geodata.results[0].geometry.location.lat;
          this.lugar.lng = this.geodata.results[0].geometry.location.lng;
        }

        this.lugaresService.guardarLugar(this.lugar)
          .subscribe((response)=>{
            alert("guardado");
            console.log(response);
          });

      })

  }

}
