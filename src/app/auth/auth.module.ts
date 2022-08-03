import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ AuthComponent, LoginComponent ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  exports: [ AuthComponent ]
})
export class AuthModule { }
