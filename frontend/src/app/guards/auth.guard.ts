import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  /*
  authenticate current user
  or send them to the upper route if coresponding user is not login 
  */
  
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): boolean {

    // if user is not authenticated then coresponding user
    // will be routed to the login page
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    
    // if the user is authenticated, corresponding user
    // will be given an access  
    return true;
  }
  
}
