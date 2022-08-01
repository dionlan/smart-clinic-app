import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const SHARED_COMPONENTS = [ TranslateModule ];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  exports: [ SHARED_COMPONENTS ]
})
export class SharedModule { }
