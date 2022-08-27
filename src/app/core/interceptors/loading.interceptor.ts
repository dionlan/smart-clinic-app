import {HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {LoadingService} from "../../home/modules/layout/loading/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
