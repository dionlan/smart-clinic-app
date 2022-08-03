import { PanelProfileComponent } from './new/panel-profile/panel-profile.component';
import { CheckboxProfileComponent } from './new/checkbox-profile/checkbox-profile.component';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { HomeModule } from '../../../home.module';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [ProfilesComponent, NewComponent, EditComponent, CheckboxProfileComponent, PanelProfileComponent],
  imports: [
    SharedModule,
    ProfilesRoutingModule,
    TableModule,
    HomeModule,
    CheckboxModule,
    PaginatorModule,
    TabViewModule,
    CardModule
  ],
})
export class ProfilesModule {}
