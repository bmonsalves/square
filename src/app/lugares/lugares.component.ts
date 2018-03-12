import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";

@Component({
  selector: 'lugares-component',
  templateUrl: './lugares.component.html'
})

export class LugaresComponent {
  lugares:any = [];

  constructor(private lugaresService: LugaresService){
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
