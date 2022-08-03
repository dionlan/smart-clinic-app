import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class EmailValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'email';
  getMessage(): string {
    return this.translateService.instant('validator.email');
  }

}
