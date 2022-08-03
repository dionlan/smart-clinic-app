import { Component, Input, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { BreadcrumbService } from "./breadcrumb.service";
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  module!: string;

  @Input()
  component!: string;

  @Input()
  action!: string;

  subject = new Subject<MenuItem[]>();
  menuItems:MenuItem[] = [];

  constructor(private service:BreadcrumbService) {
    this.service.init(this.subject);
    this.subject.subscribe(menuItems => {
      this.menuItems = menuItems;
    })
  }

  ngOnInit(): void {

  }
}
