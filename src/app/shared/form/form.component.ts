import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";


export class FormComponent {

  validate(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.validate(control);
      }
    });
  }

  setFormErrors(form: FormGroup, httpError: HttpErrorResponse) {
    if (httpError.status === 400 && httpError.error) {
      if (!httpError.error.message) {
        Object.entries(httpError.error).forEach(error => {
          const control = form.controls[error[0]];
          control.setErrors({incorrect: true, message: error[1]});
          control.markAsTouched();
        })
      }
    }
  }

}
