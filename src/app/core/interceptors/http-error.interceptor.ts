/*import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):any {
    const authReq = req.clone({
      headers: req.headers.set(AuthService.TOKEN, this.auth.getToken()),
    });
    return next.handle(authReq);
  }
}
*/
