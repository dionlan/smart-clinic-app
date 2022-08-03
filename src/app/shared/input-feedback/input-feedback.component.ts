import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ValidatorMessageAbstract } from "./validator-messages/validator-message.abstract";
import validatorsList from "./validator-messages";
import { Subscription } from "rxjs";


@Component({
  selector: 'input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: ['./input-feedback.component.scss']
})
export class InputFeedbackComponent implements OnDestroy, AfterViewInit {

  hasError = false;
  message = '';
  @Input('control') control?: AbstractControl | null;
  private chain: ValidatorMessageAbstract[] = validatorsList(this.translateService);
  private subscriptionStatusChanges?: Subscription;

  constructor(private translateService: TranslateService) {
  }


  ngAfterViewInit(): void {
    this.subscriptionStatusChanges = this.control?.statusChanges.subscribe(status => {
      this.hasError = status === 'INVALID' && this.control?.errors !== null;
      if (!this.hasError) {
        return;
      }

      if (this.control?.errors?.incorrect) {
        this.message = this.control?.errors.message;
      } else {
        this.message = this.chain.map(v => v.verify(this.control?.errors as ValidationErrors))
          .filter(v => v !== null)
          .join(', ');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionStatusChanges?.unsubscribe();
  }

}
