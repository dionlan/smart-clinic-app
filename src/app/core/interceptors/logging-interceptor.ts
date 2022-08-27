import { AuthService } from 'src/app/auth/services/auth.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(
    public authService:AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let status: string;

    return next.handle(req).pipe(
      tap(
        (event) => (status = event instanceof HttpResponse ? 'succeeded' : ''),
        (error) => (status = 'failed')
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
             ${status} in ${elapsed} ms.`;
        console.log(msg);
      })
    );
  }
}
