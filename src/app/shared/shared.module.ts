import { NgModule } from "@angular/core";


import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";

const SHARED_COMPONENTS = [
  CommonModule,
  TranslateModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
  ];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgbToastModule
  ],
  exports: [ SHARED_COMPONENTS ],
  providers: []
})
export class SharedModule { }
