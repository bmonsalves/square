import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs"
import "rxjs/Rx"
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'crear-component',
  templateUrl: './crear.component.html'
})

export class CrearComponent {
  lugar:any = {};
  geodata:any = {};
  id:number = null;
  response:any = {};
  results$: Observable<any>;
  private searchField: FormControl;
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http:HttpClient){

    this.id = this.route.snapshot.params['id'];

    if(this.id != null){
      this.lugaresService.getLugar(this.id)
          .valueChanges()
          .subscribe((lugar)=>{
            this.lugar = lugar;
          })
    }

    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .debounceTime(300)
      .switchMap(query => this.lugaresService.mapSearch(query))
      .map(response => {
        this.response = response;
        return this.response.results;
      });

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

  seleccionar(lugar){
      this.lugar.calle = `${lugar.address_components[1].long_name} ${lugar.address_components[0].long_name}`
      this.lugar.ciudad = lugar.address_components[2].long_name;
      this.lugar.pais = lugar.address_components[3].long_name;
  }

}
