import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class CustomPatternValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'customValidatorPattern';
  getMessage(): string {
    return this.translateService.instant(
      this.validator.message ? this.validator.message : 'validator.customValidatorPattern'
    ).replace('%customValidatorPattern%', this.validator.regex);
  }

}
