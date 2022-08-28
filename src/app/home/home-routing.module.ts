import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HomeComponent } from './home.component';
import { IndexComponent } from './modules/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
        canActivate: [ AuthGuard ], //para entrar na home, o AuthGuard deve retornar true;
        data: {
          breadcrumb: 'home.index.breadcrumb'
        }
      },
      {
        path: 'admin',
        data: {
          breadcrumb: "home.admin.breadcrumb"
        },
        loadChildren: () =>
          import('../home/modules/admin/admin.module').then((m) => m.AdminModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
