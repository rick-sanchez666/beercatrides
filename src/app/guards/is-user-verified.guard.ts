import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserVerifiedGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isUserVerified$.pipe(
      map( val => {
        if( val) {
          return true;
        } else {
          this.router.navigate(['/getverified'])
          return false;
        }
      })
    )
  }
  
}
