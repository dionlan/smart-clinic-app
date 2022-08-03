import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class MaxLengthValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'maxlength';
  getMessage(): string {
    return this.translateService.instant('validator.maxlength')
      .replace('%requiredLength%',this.validator?.requiredLength);
  }

}
