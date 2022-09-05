import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../auth/error-page/error-page.component';
import { LoadingComponent } from '../home/modules/layout/loading/loading.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoggingInterceptor } from './interceptors/logging-interceptor';

const CORE_COMPONENTS = [
  LoadingComponent,
  ErrorPageComponent
];
const MODULES = [ RouterModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, MODULES],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import this module in the AppModule only.'
      );
    }
  }
}
