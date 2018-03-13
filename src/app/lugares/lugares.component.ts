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
      .subscribe((lugares)=>{
        this.lugares = Object.keys(lugares).map((key) => lugares[key]);
      },(error)=>{
        console.log(error)
      })
  }
}
