import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class MinLengthValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'minlength';
  getMessage(): string {
    return this.translateService.instant('validator.minlength')
      .replace('%requiredLength%',this.validator?.requiredLength);
  }

}
