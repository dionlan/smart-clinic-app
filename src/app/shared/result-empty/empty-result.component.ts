import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-empty-result',
  templateUrl: './empty-result.component.html',
  styleUrls: ['./empty-result.component.scss']
})
export class EmptyResultComponent implements OnInit, OnDestroy {

  constructor() { }
  @Input() subject?: Subject<boolean>;
  @Input() message = 'shared.emptyResult';
  @Input() labelButton = 'shared.clearSearch';
  @Input() showButton = true;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //this.subject?.unsubscribe();
  }

  clear() {
    this.subject?.next(true);
  }



}
