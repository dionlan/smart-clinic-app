import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){
  }
  /**
   *
   * @returns verifica a rota e dá continuidade ao fluxo. Verifica se existe token, se existir segue a rota normal,
   * senão chama a rota do login
   */
  canActivate(): boolean {
    this.authService.updateLoggedIn();

    if(localStorage.getItem('token')){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }
}
