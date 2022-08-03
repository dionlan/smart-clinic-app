import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewComponent } from './new/new.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { UsersComponent } from './users.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditComponent } from './edit/edit.component';
import { HomeModule } from 'src/app/home/home.module';

@NgModule({
  declarations: [UsersComponent, NewComponent, EditComponent],
    imports: [
        SharedModule,
        UsersRoutingModule,
        HomeModule,
        TableModule,
        CheckboxModule,
        MultiSelectModule
    ],
})
export class UsersModule {}
