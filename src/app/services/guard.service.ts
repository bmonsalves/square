import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable, Subject} from "rxjs";

@Injectable()
export class GuardService implements CanActivate {

  isLogged: boolean = false;

  constructor(private authService: AuthService, private router:Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return Observable.create((observer: Subject<boolean>) => {

      this.authService.isLogged().subscribe(result => {

        if (result && result.uid){
          observer.next(true);
        }

        observer.next(false);

      }, err => {
        observer.next(false);
      });

    });
  }

}
