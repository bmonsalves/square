import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";

@Component({
  selector: 'crear-component',
  templateUrl: './crear.component.html'
})

export class CrearComponent {
  lugar:any = {};
  lugares:any = [];

  constructor(private lugaresService: LugaresService){
    this.obtenerLugares();
  }

  guardarLugar(){
    this.lugar.id = Date.now();
    this.lugaresService.guardarLugar(this.lugar);
    this.obtenerLugares();
  }

  obtenerLugares(){
    this.lugaresService.getLugares()
      .valueChanges()
      .subscribe((lugares)=>{
        this.lugares = lugares;
      })
  }
}
