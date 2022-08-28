import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeRoutingModule} from './home-routing.module';
import {PanelModule} from 'primeng/panel';
import {IndexComponent} from './modules/index/index.component';
import {LayoutModule} from './modules/layout/layout.module';
import {SkeletonModule} from "primeng/skeleton";
import { MainPanelComponent } from './components/main-panel/main-panel.component';

@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    MainPanelComponent
  ],
  imports: [SharedModule, NgbModule, HomeRoutingModule, PanelModule, LayoutModule, SkeletonModule],
  exports: [HomeComponent, MainPanelComponent],
})
export class HomeModule {}
