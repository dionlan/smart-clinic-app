import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {AfterContentInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FileUpload} from "primeng/fileupload";
import {FileModel} from "../file.model";
import {FileService} from "../file.service";
import {TranslateService} from "@ngx-translate/core";
import {AbstractControl} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements AfterContentInit {

  @ViewChild('fileUpload') private fileUpload: FileUpload | undefined;
  @Output() uploadHandler = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();
  @Output() onSuccess = new EventEmitter<any>();
  @Input() previewWidth = 50;
  @Input() previewHeight = 50;
  @Input() maxFileSize = 2000000;
  @Input() checkDimensions = false;
  @Input() maxWidth = 0;
  @Input() maxHeight = 0;
  @Input() control?: AbstractControl | null;
  @Input() chooseLabel = 'home.files.upload.label';
  @Input() accept = '.jpeg,.jpg,.png';
  @Input() styleClass = 'mt-2';
  @Input() mode = 'advanced';
  @Input() chooseIcon = 'pi pi-plus';
  @Input() classDefault = 'col-md-6';

  srcImage: SafeUrl | undefined;
  fileImage: FileModel | undefined;

  constructor(
    private fileService: FileService,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer,
  ) { }

  ngAfterContentInit(): void {
    of([]).pipe(delay(1000)).subscribe(x=>{
      this.loadImage();
    })

  }

  upload($event: any) {
    const file = $event.files[0];

    if (file.type.split("/")[0] === 'image') {
      const imageUrl = file.objectURL.changingThisBreaksApplicationSecurity;
      this.fileService.getDimensionsFromObjectURL(imageUrl).subscribe(dimension => {
        const validDimensions = !this.checkDimensions || (dimension.width === this.maxWidth && dimension.height === this.maxHeight);

        if (!validDimensions) {
          let message = this.translateService.instant('home.website.campaigns.form.banner.maxSize', {
            width: this.maxWidth,
            height: this.maxHeight
          });
          this.fileUpload?.clear();
          this.control?.setValue(null);
          this.control?.setErrors({incorrect: true, message});
          this.control?.markAsTouched();
        } else {
          this.uploadFileToApi($event);
        }
      });
    } else {
      this.uploadFileToApi($event);
    }
    this.uploadHandler.emit($event);
  }

  cancelUpload($event: any) {
    this.fileService.remove(this.control?.value.nome).subscribe(() => {
      this.control?.setValue(null);
      this.fileUpload?.clear();
      this.onRemove.emit($event);
    });
  }

  uploadFileToApi($event: any) {
    const data = $event.files[0];
 /*
    this.fileService.upload(data, this.repository?.id).subscribe((file: FileModel) => {
      file.ativo = true;
      this.control?.setValue(file);
      this.srcImage = undefined;
      this.fileImage = undefined;
      this.clearBasic();
      this.onSuccess.emit($event);
    }, error => {
      this.clearBasic();
    });*/
  }

  private loadImage() {
    this.fileImage = this.control?.value;

    if (this.fileImage) {
      this.fileService.download(this.fileImage.nome).subscribe(value => {
        const blob = new Blob([value], {type: value.type});
        this.srcImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      });
    }
  }

  private clearBasic() {
    if (this.mode === 'basic') {
      this.fileUpload?.clear();
    }
  }
}
