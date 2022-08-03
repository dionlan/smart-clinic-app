import {ValidationErrors} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

export abstract class ValidatorMessageAbstract {

  protected validatorName:string = '';
  protected validator?:any;

  constructor(protected translateService: TranslateService) {
  }

  verify(keys: ValidationErrors): string | null {
    if(!Object.keys(keys).includes(this.validatorName)){
      return null;
    }
    this.validator = keys[this.validatorName];
    return this.getMessage()
  }
  protected abstract getMessage(): string;
}
