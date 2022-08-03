import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class MaxValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'max';
  getMessage(): string {
    return this.translateService.instant('validator.max')
      .replace('%max%',this.validator?.max);
  }

}
