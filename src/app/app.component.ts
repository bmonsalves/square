import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLogged:boolean = false;

  constructor(private authService:AuthService){

    authService.isLogged()
      .subscribe(result => {

        if (result && result.uid){
          this.isLogged = true;
          return;
        }

        this.isLogged = false;

    }, err => {
      this.isLogged = false
    })

  }
}
