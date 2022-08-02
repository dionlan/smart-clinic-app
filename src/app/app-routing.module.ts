import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './core/page-not-found.component';

const routes: Routes = [
  { path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule ) //importando apenas quando acessado
    //Lazy-Loading-Module
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
