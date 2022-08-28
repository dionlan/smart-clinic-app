import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials.mode';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../token';
import { User } from 'src/app/home/modules/admin/users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static TOKEN: string = 'Authorization';
  public static REFRESH_TOKEN: string = 'refreshtoken';

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

  public login(loginForm: Credentials): Observable<any> {
    console.log('LOGIN FORM', loginForm)
    return this.httpClient.post(this.url, loginForm).pipe(
      tap((res: any) => {
        let token = '';
        if(res.data?.accessToken){
          token = res.data?.accessToken
          localStorage.setItem(AuthService.TOKEN, token);
        }

        //this.updateLoggedIn();
      })
    );
  }

  public getUser(): string {
    let jwt = localStorage.getItem(AuthService.TOKEN)?.toString();
    let token = this.helper.decodeToken(jwt) as Token;
    return token?.nome;
  }

  public getUserId(): string {
    let jwt = localStorage.getItem(AuthService.TOKEN)?.toString();
    let token = this.helper.decodeToken(jwt) as Token;
    return token.sub.toString();
  }

  public logout(): boolean {
    localStorage.removeItem(AuthService.TOKEN);
    localStorage.clear();
    this.updateLoggedIn();
    this.router.navigate(['/login'])
    return true;
  }

  public hasCurrentUser(): boolean {
    return localStorage.getItem(AuthService.TOKEN) != null;
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN) || '';
  }

  public isLogged() : boolean{
    return !this.helper.isTokenExpired(this.getToken());
  }

  public refreshToken(): Observable<any> {
    return this.httpClient.post(this.url + '/revalidar-token', {refreshtoken: localStorage.getItem(AuthService.REFRESH_TOKEN)}).pipe(
      tap((res: any) => {
        localStorage.setItem(AuthService.TOKEN, res.authtoken);
        localStorage.setItem(AuthService.REFRESH_TOKEN, res.refreshtoken);
      }),
    );
  }

  public updateLoggedIn(): void {
    const token = localStorage.getItem('Authorization');
    console.log('TOKEN:', token)
    if(token){
      console.log('TOKEN NULL:', token)
      this.loggedIn.next(true);
    }else{
      console.log('TOKEN not NULL:', token)
      this.loggedIn.next(false);
    }
  }

  public  getUserRoles(): string[]{
    let jwt = localStorage.getItem(AuthService.TOKEN)?.toString();
    let token = this.helper.decodeToken(jwt) as Token
    return token.permissions;
  }

  public checkUser(loginForm: Credentials): Observable<any> {
    let jwt = localStorage.getItem(AuthService.TOKEN)?.toString();
    let token = this.helper.decodeToken(jwt) as Token;
    //loginForm.id_cliente = token.sub;
    return this.httpClient.post(this.url+'/check', loginForm).pipe(
      tap((res: any) => {
      })
    );
  }

  public resetPasswordUser(user: User): Observable<any> {
    return this.httpClient.post(this.url + '/redefinir-user', user).pipe(
      tap((res: any) => {
      })
    );
  }
}
