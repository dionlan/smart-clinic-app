import {ValidatorMessageAbstract} from "./validator-message.abstract";

export class RequiredPatternValidatorMessage extends ValidatorMessageAbstract {
  validatorName = 'pattern';
  getMessage(): string {
    return this.translateService.instant('validator.pattern')
      .replace('%requiredPattern%',this.validator?.requiredPattern);
  }

}
