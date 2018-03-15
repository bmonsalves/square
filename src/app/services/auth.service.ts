import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import * as firebase from "firebase/app"

@Injectable()
export class AuthService{

  constructor(private angularFireAuth:AngularFireAuth, private router: Router){

    this.isLogged();
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/']); // or redirect to default route
    }

  }

  public facebookLogin = () =>{
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response)=>{
        console.log(response);
        this.router.navigate(['app']);
      })
      .catch((error)=>{
        console.log("error",error);
      })
  }

  public login = (email,password) => {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email,password)
      .then((response)=>{
        console.log(response);
        this.router.navigate(['app']);
      })
      .catch((error)=>{
        console.log(error);
      })
  };

  public registro = (email,password) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((response)=>{
        console.log(response);
        this.router.navigate(['app']);
      })
      .catch((error)=>{
        console.log(error);
      })
  };

  public isLogged = () => {
    return this.angularFireAuth.authState
  };

  public logOut = () =>{
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
