import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ProfilesComponent } from './profiles.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    data: {
      breadcrumb: 'home.admin.profiles.index.breadcrumb'
    },
  },
  {
    path: 'novo',
    component: NewComponent,
    data: {
      breadcrumb: 'home.admin.profiles.new.breadcrumb',
      roles: ['home.admin.profiles.new.role']
    },
    // canActivate:[AuthGuard]
  },
  {
    path: 'edita/:id',
    component: EditComponent,
    data: {
      breadcrumb: 'home.admin.profiles.edit.breadcrumb',
      roles: ['home.admin.profiles.edit.role']
    },
    // canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {
}
