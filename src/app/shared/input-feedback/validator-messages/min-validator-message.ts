import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class MinValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'min';
  getMessage(): string {
    return this.translateService.instant('validator.min')
      .replace('%min%',this.validator?.min);
  }

}
