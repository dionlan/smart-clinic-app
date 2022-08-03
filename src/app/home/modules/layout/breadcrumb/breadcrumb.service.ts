import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Injectable({providedIn: "root"})
export class BreadcrumbService {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  private sub?: Subject<MenuItem[]>;
  menuItems: MenuItem[] = [];

  constructor(private translateService: TranslateService) {
  }

  init(sub: Subject<MenuItem[]>) {
    this.sub = sub;
  }

  public display(list: MenuItem[]) {
    this.sub?.next(list);
  }

  public initBreadcrumbs(route: ActivatedRoute) {
    const breadCrumbs = this.createBreadcrumbs(route);
    this.sub?.next(breadCrumbs);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbService.ROUTE_DATA_BREADCRUMB];
      if (!this.isNullOrUndefined(label)) {
        breadcrumbs.push({label: this.translateService.instant(label), url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  isNullOrUndefined(value: any) {
    return value === undefined || value === null;
  }
}
