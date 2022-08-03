import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class NullValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'nullValidator';
  getMessage(): string {
    return this.translateService.instant('validator.nullValidator');
  }

}
