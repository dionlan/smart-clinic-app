import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/home/modules/layout/loading/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
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
