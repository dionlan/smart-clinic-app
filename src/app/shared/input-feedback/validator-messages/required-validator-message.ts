import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class RequiredValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'required';
  getMessage(): string {
    return this.translateService.instant('validator.required');
  }

}
