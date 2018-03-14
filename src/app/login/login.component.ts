import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  registro:any = {};
  constructor(private authService: AuthService){

  }

  login(){
    this.authService.login(this.registro.email,this.registro.password)

  }



}
