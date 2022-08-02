import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials.mode';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static TOKEN: string = 'accessToken';

  url: string;
  helper : JwtHelperService = new JwtHelperService();
  subjectEmail: Subject<any> = new Subject();
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router, private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/autenticacao/login';
  }

  public setSubjectEmail(value : any){
    this.subjectEmail.next(value);
  }

  public getSubjectEmail():Observable<any>{
    return this.subjectEmail.asObservable();
  }

  /*
  login(credentials: Credentials): void {
    localStorage.setItem('token', credentials.password);
    this.updateLoggedIn();
    this.router.navigate(['/home'])
  }*/

  public login(credentials: Credentials): Observable<any> {
    console.log(this.url, credentials)
    return this.httpClient.post(this.url, credentials).pipe(
      tap((res: any) => {
        console.log('RESPOSTA: ', res)
        localStorage.setItem(AuthService.TOKEN, res.data.accessToken);
      })
    );
  }

  public getUser(): string {
    let jwt = localStorage.getItem(AuthService.TOKEN)?.toString();
    let token = this.helper.decodeToken(jwt) as Token;

    return token.name.toString();
  }

  public getUserId(): string {
    let jwt = localStorage.getItem(AuthService.TOKEN)?.toString();
    let token = this.helper.decodeToken(jwt) as Token;

    return token.sub.toString();
  }

  public logout(): boolean {
    localStorage.removeItem(AuthService.TOKEN);
    //localStorage.clear();
    this.updateLoggedIn();
    this.router.navigate(['/login'])
    return true;
  }

  public updateLoggedIn(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.loggedIn.next(true);
    }else{
      this.loggedIn.next(false);
    }
  }

  public  getUserRoles(): string[]{
    let jwt = localStorage.getItem(AuthService.TOKEN)?.toString();
    let token = this.helper.decodeToken(jwt) as Token
    return token.permissions;
  }
}
