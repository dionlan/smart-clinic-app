import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class RequiredTrueValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'requiredTrue';
  getMessage(): string {
    return this.translateService.instant('validator.requiredTrue');
  }

}
