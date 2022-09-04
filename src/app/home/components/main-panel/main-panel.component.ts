import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss'],
})
export class MainPanelComponent implements OnInit {
  @Input()
  module!: string;

  @Input()
  component!: string;

  @Input()
  action!: string;

  @Input()
  icon!: string;

  @Input()
  svg!: string;

  @Input()
  header!: string;

  @Input()
  title?: string;

  @Input()
  footerText?: string;

  @Input()
  loaded: boolean = false;

  @Input()
  isSVG: boolean = false;

  constructor() {}

  ngOnInit(): void {

  }
}
