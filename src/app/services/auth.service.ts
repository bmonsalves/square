import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Injectable()
export class AuthService{

  constructor(private angularFireAuth:AngularFireAuth,private router: Router){

    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/']); // or redirect to default route
    }

    this.isLogged();
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
  }
}
