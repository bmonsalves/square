///<reference path="app.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import {Routes, RouterModule} from "@angular/router";
import {CrearComponent} from "./crear/crear.component";
import {MapComponent} from "./map/map.component";
import {LugaresService} from "./services/lugares.service";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {HttpClientModule} from "@angular/common/http";
import {LugaresComponent} from "./lugares/lugares.component";
import {LinkifyPipe} from "./pipes/linkify.pipe";
import {LoginComponent} from "./login/login.component";
import {RegistroComponent} from "./registro/registro.component";
import {AuthService} from "./services/auth.service";
import {AngularFireAuthModule} from "angularfire2/auth";
import {GuardService} from "./services/guard.service";
import {ContainerComponent} from "./container/container.component";

export const appRoutes: Routes = [
  {path:'',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  { path:'app',
    component:ContainerComponent,
    canActivate:[GuardService],
    children:[
      {path: '', redirectTo: 'lugares', pathMatch: 'full' },
      {path: 'lugares', component:LugaresComponent },
      {path:'new',component:CrearComponent},
      {path:'update/:id',component:CrearComponent},
      {path:'map',component:MapComponent},
    ]
  },

];

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAPVuKucwSB72vsXGS8OQTh6Nvxr0wiMP0",
    authDomain: "square-1520381533872.firebaseapp.com",
    databaseURL: "https://square-1520381533872.firebaseio.com",
    projectId: "square-1520381533872",
    storageBucket: "square-1520381533872.appspot.com",
    messagingSenderId: "443228231666"
  }
};


@NgModule({
  declarations: [
    AppComponent,
    CrearComponent,
    MapComponent,
    LugaresComponent,
    LoginComponent,
    RegistroComponent,
    ContainerComponent,
    LinkifyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBjoYXM3fiXqdpde64ZxZSc8DnBuGc_CQ'
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [
    LugaresService,
    AuthService,
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
