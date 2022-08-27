import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'inicio/home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule ), //importando apenas quando acessado
    //Lazy-Loading-Module
    data: {
      title: 'Home',
      icon: 'fa fa-home'
    },
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
