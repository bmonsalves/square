import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class GuardService implements CanActivate {

  isLogged: boolean = false;

  constructor(private authService: AuthService, private router:Router) {

    authService.isLogged().subscribe(result => {

      this.isLogged = !!(result && result.uid);

    }, err => {
      this.isLogged = false
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (!this.isLogged) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
