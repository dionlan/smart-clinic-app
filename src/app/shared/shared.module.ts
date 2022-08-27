import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputFeedbackComponent } from "./input-feedback/input-feedback.component";
import { EmptyResultComponent } from "./result-empty/empty-result.component";
import { NoResultComponent } from "./no-result/no-result.component";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";

const SHARED_COMPONENTS = [
  CommonModule,
  TranslateModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MessagesModule,
  NoResultComponent,
  InputFeedbackComponent,
  EmptyResultComponent,

  ];

@NgModule({
  declarations: [ InputFeedbackComponent, EmptyResultComponent, NoResultComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ToastModule
  ],
  exports: [ SHARED_COMPONENTS ],
  providers: []
})
export class SharedModule { }
