import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/home/modules/layout/loading/loading.service';
import { AuthService } from '../services/auth.service';
import { CheckPermissions } from './check-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private loadingService: LoadingService,
              private message: MessageService,
              private translate: TranslateService)
    {}
  /**
   *
   * @returns verifica a rota e dá continuidade ao fluxo. Verifica se existe token, se existir segue a rota normal,
   * senão chama a rota do login
   */
  canActivate(
    //this.authService.updateLoggedIn();
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CAN ACTIVATE ROUTE:', route);
      return this.checkRoute(route);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CAN ACTIVATE CHILD ROUTE:', childRoute);
    return this.checkRoute(childRoute);
  }

  protected checkRoute(route: ActivatedRouteSnapshot):Observable<boolean>{

    if(typeof route.data['roles'] !== 'undefined' && route.data['roles'].length){
        const rawRolesRota = [route.data['roles']];
        const userRoles = this.authService.getUserRoles();

        const rolesRota = this.translateRoles(rawRolesRota);

        return new Observable<boolean>(subscriber =>{
            if(!CheckPermissions.hasPermission(rolesRota,userRoles)){

              subscriber.next(false)
              this.message.add({
                severity: 'error',
                summary: 'Você não tem permissão para realizar esta ação.'
              });
              this.loadingService.hide(true);
            }else{
              subscriber.next(true)
            }
        });
    }
    return new Observable<boolean>(subscriber=> subscriber.next(true));
  }

  protected translateRoles(rawRoles: string[]){
    let result: string[] = [];
    for(let role of rawRoles){
      this.translate.get(role.toString()).
      subscribe(
        res =>{
          result.push(res);
      });
    }
    return result;
  }
}
