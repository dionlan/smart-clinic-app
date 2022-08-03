import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { TableModule } from 'primeng/table';
import { HomeModule } from '../../home.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, AdminRoutingModule, HomeModule, TableModule],
})
export class AdminModule {}
