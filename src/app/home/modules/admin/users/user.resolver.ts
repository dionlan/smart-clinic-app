import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return of([]).pipe(delay(2000));
  }
}
