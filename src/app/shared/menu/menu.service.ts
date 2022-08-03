import { Injectable } from '@angular/core';
import { MenuItemsConfig } from "./menu-items.config";
import { Router } from "@angular/router";

export interface MenuId {
  collapsed: boolean;
  routerLink: string[];
}
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuId: Map<string, MenuId> = new Map();

  constructor(private router: Router) {
    const menus:Map<string, MenuId> = new Map();
    this.getMenuItems().forEach(m => this.extractMenusId(m, menus));
    this.menuId = menus;
  }

  getMenuItems(){
    return MenuItemsConfig;
  }
  getMenuIds() {
    return this.menuId;
  }

  isCollapsed(menu:any) {
    if(!menu.children) {
      return this.menuId.get(menu.title)?.collapsed ?? true;
    }
    const result = menu.children
      .filter((i:any) => {
        const linkUrl = this.router.serializeUrl(this.router.createUrlTree(i.routerLink));
        return this.router.url.includes(linkUrl);
      });

    if(result.length) {
      this.menuId.get(menu.title)!.collapsed = false;
    }

    return this.menuId.get(menu.title)?.collapsed ?? true;
  }

  setColappsed(id:string) {
    const value = this.menuId.get(id)!.collapsed;
    this.menuId.get(id)!.collapsed = !value;
  }

  private extractMenusId(menu: any, menus:Map<string, MenuId>) {
    if(menu?.children?.length){
      menus.set(menu.title, {collapsed: true, routerLink:menu.routerLink});
      menu?.children.forEach((mi:any) => this.extractMenusId(mi, menus));
    }
  }
}
