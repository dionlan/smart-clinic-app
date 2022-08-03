import {Component, Inject, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {DOCUMENT} from "@angular/common";
import { MenuService } from 'src/app/shared/menu/menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() toggleMenuSubject?:Subject<boolean>;
  mainMenuItems?:any;

  constructor(@Inject(DOCUMENT) private document:Document, private menuService: MenuService) {
    this.configureMenu();

  }

  ngOnInit(): void {
    this.configureToggleMenu();
  }

  private configureToggleMenu() {
    this.toggleMenuSubject?.subscribe((toggle) => {
      this.document.body.classList.toggle('sb-sidenav-toggled');
    });
  }

  private configureMenu() {
    this.mainMenuItems =  this.menuService.getMenuItems();
  }

  isCollapsed(menu:any): boolean {
    return this.menuService.isCollapsed(menu);
  }

  setColappsed(id:string) {
    return this.menuService.setColappsed(id);
  }

}
