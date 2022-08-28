import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [ AuthComponent, LoginComponent, ErrorPageComponent ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  exports: [ AuthComponent ]
})
export class AuthModule { }
