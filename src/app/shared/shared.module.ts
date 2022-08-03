import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { InputFeedbackComponent } from "./input-feedback/input-feedback.component";
import { EmptyResultComponent } from "./result-empty/empty-result.component";
import { FileUploadComponent } from "./file/file-upload/file-upload.component";
import { FileUploadModule } from "primeng/fileupload";
import { NoResultComponent } from "./no-result/no-result.component";

const SHARED_COMPONENTS = [
  CommonModule,
  TranslateModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NoResultComponent,
  FileUploadModule,
  InputFeedbackComponent,
  EmptyResultComponent,
  FileUploadComponent
  ];

@NgModule({
  declarations: [ InputFeedbackComponent, EmptyResultComponent, FileUploadComponent, NoResultComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgbToastModule,
    FileUploadModule
  ],
  exports: [ SHARED_COMPONENTS ],
  providers: []
})
export class SharedModule { }
