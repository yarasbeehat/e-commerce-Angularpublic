import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserData } from './userdata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles: string[] = route.data['roles']


    const token = localStorage.getItem('Token');
    if (!token) {
      this.router.navigate(['/home']);
      return false;
    }
    else {

      const userRoles = UserData.roles;

      return userRoles.some((item: string) => roles.includes(item));

    }
  }

}