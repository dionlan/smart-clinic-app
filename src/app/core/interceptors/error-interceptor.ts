import { LoadingService } from 'src/app/home/modules/layout/loading/loading.service';
import {HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {MessageService} from "primeng/api";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private message: MessageService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
  }

  addAuthHeader(request: any) {
    const authHeader = this.authService.getToken();
    console.log('ADD AUTH HEADER:', authHeader)
    if (authHeader) {
      try {
        return request.clone({
          setHeaders: {
            "Authorization": 'Bearer ' + authHeader
          }
        });
        // valid token format
      } catch(error) {
        console.log('ERROR CATCH INTERCEPTOR!')
      }
    }
    return request;
  }

  refreshToken(): Observable<any> {
    console.log('REFRESH TOKEN:')
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
        catchError((): any => {
          this.refreshTokenInProgress = false;
          this.logout();
        }));
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  handleResponseError(error: any, request?: any, next?: any): any {
    console.log('ERRRRRRRROR ERROR-INTERCEPTOR')
    let errorMessage = error.message;
    if (error.status === 401) {

      /*return this.refreshToken().pipe(
        switchMap(() => {
          request = this.addAuthHeader(request);
          this.loadingService.hide();
          return next.handle(request);
        }),
        catchError(e => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          } else {
            this.loadingService.hide();
            this.logout();
          }
        }));
      */
    } else if (error.status === 404) {
      return next.handle(request);
    } else if (error.status === 403) {
      this.message.add({
        severity: 'error',
        detail: 'Você não tem permissão para acessar a funcionalidade!'
      });
      this.router.navigate(["home"]);
      this.loadingService.hide();
      // this.logout();
    } else if (error.status === 400) {
      console.log('ERROR-INTERCEPTOR status 400: ',error)
      if(error.error){

        if(typeof error.error == 'string'){
          this.message.add({
            severity: 'warn',
            detail: error.error
          });
        }else{

          let msg = error.error
          let keys = Object.keys(msg)
          let values = keys.map(k => msg[k])
          this.message.add({
            severity: 'warn',
            detail: values.toString()
          });
        }
      }
      return next.handle(request);
    } else if (error.status === 307) {
      this.router.navigate(["first", {ref_cd : error.error}]);
    }else if (error.status === 303) {
      console.log(error.error[0])
      if(error.error[0]!= null && error.error[0] === "blocked"){
        this.router.navigate(["blocked", {ref_cd : error.error[1]}]);
      }else{
        this.router.navigate(["recovery", {ref_cd : error.error}]);
      }
      // this.message.add({
      //   severity: 'error',
      //   detail: "Erro interno. Favor procurar o administrador do sistema."
      // });
    }else if (error.status === 409) {
      console.log('ERROR-INTERCEPTOR STATUS 409: ',error)
      var arrayError = error.url.split("/");
      if(arrayError[8] !== 'undefined' && arrayError[8] === 'finalizar-atendimento'){
        this.message.add({
          severity: 'error',
          detail: "Você não pode encerrar o atendimento porque o atendimento já se encontra com o supervisor."
        });
      } else {
        this.message.add({
          severity: 'error',
          detail: "Erro interno. Favor procurar o administrador do sistema."
        });
      }
    } else if (error.status === 500 && error.error === "Senha incorreta!") {
      this.message.add({
        severity: 'error',
        detail:  error.error
      });
    } else {
      this.loadingService.hide();
      this.router.navigate(["error-page"]);

      // let reader = new FileReader();
      // // reader.addEventListener('loadend', (e) => {
      // //   this.message.add({
      // //     severity: 'error',
      // //     detail: e.target?.result as string
      // //   });
      // // });
      // //reader.readAsText(errorMessage);
      // if (errorMessage instanceof Blob) {
      //   reader.readAsText(errorMessage);
      // }
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //this.authService = this.injector.get(AuthService);

    // Handle request

    request = this.addAuthHeader(request);
    console.log('INTERCEPT ERROR-INTERCEPTOR:', request)
    // Handle response
    return next.handle(request).pipe(catchError(error => {
      console.log('INTERCEPT com ERRO ERROR-INTERCEPTOR:', error)
      return this.handleResponseError(error, request, next);
    }));
  }
}
