import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { UsersComponent } from './users.component';
import {UserResolver} from "./user.resolver";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Usuários',
      breadcrumb: 'home.admin.users.index.breadcrumb'
    },
    resolve: {
      data: UserResolver
    },
  },
  {
    path: 'novo',
    component: NewComponent,
    data: {
      breadcrumb: 'home.admin.users.new.breadcrumb',
      roles: ['home.admin.users.new.role']
    },
  },
  {
    path: 'edita/:id',
    component: EditComponent,
    data: {
      breadcrumb: 'home.admin.users.edit.breadcrumb',
      roles: ['home.admin.users.edit.role']
    },
    // canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
