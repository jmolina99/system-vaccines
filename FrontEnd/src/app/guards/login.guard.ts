import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from '../services/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  userLogin: any;

  constructor(
    private router: Router,
    private permissionsService: PermissionsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userLogin = this.permissionsService.obtainToken();
      if (this.userLogin) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        sessionStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
