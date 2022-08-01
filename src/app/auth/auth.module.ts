import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    SharedModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule

  ]
})
export class AuthModule { }
