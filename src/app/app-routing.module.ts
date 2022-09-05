import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './auth/error-page/error-page.component';
import { PermitIfAuthenticated } from './auth/permit-authenticated.service';
import { PermitIfNotAuthenticated } from './auth/permit-not-authenticated.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [PermitIfNotAuthenticated],
  },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule ), //importando apenas quando acessado
    data: {
      title: 'Home',
      icon: 'fa fa-home'
    },
    canActivate: [PermitIfAuthenticated],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
