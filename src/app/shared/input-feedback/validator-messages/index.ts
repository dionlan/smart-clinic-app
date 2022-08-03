import {RequiredValidatorMessage} from "./required-validator-message";
import {RequiredTrueValidatorMessage} from "./required-true-validator-message";
import {EmailValidatorMessage} from "./email-validator-message";
import {NullValidatorMessage} from "./null-validator-message";
import {MinLengthValidatorMessage} from "./min-length-validator-message";
import {MaxLengthValidatorMessage} from "./max-length-validator-message";
import {MaxValidatorMessage} from "./max-validator-message";
import {MinValidatorMessage} from "./min-validator-message";
import {RequiredPatternValidatorMessage} from "./required-pattern-validator-message";
import {TranslateService} from "@ngx-translate/core";
import {CustomPatternValidatorMessage} from "./custom-pattern-validator-message";

const validatorsList = (translateService: TranslateService) => [
  new RequiredValidatorMessage(translateService),
  new RequiredTrueValidatorMessage(translateService),
  new EmailValidatorMessage(translateService),
  new NullValidatorMessage(translateService),
  new MinLengthValidatorMessage(translateService),
  new MaxLengthValidatorMessage(translateService),
  new MaxValidatorMessage(translateService),
  new MinValidatorMessage(translateService),
  new RequiredPatternValidatorMessage(translateService),
  new CustomPatternValidatorMessage(translateService),
];
export default validatorsList;

