import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export default class CustomValidator {
     static patternWithMessage(pattern: string | RegExp, message?: string): ValidatorFn {
       return (control: AbstractControl): ValidationErrors | null => {
         const regex:RegExp = (pattern instanceof RegExp ? pattern : RegExp(pattern));
         const valid = regex.test(control.value);
         return !valid ? {customValidatorPattern: {regex, recived: control.value, message}} : null;
       };
     }
}
