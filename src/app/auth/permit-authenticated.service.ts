import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import {LoadingService} from "../home/modules/layout/loading/loading.service";
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermitIfAuthenticated implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
    private loadingService: LoadingService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLogged()) {
      this.router.navigate(['login']);
      this.loadingService.hide();
      return false;
    }
    return true;
  }
}
