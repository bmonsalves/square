import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'container-component',
  templateUrl: './container.component.html'
})

export class ContainerComponent {

  constructor(private authService: AuthService){

  }

  logOut(){
    this.authService.logOut();
  }

}
