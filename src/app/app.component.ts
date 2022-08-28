import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { MenuItem } from './core/models/menu-item.model';
import { BreadcrumbService } from './home/modules/layout/breadcrumb/breadcrumb.service';
import { LoadingService } from './home/modules/layout/loading/loading.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit{
  isLoggedIn$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private titleService: Title,
    private breadcrumbsService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.isLoggedIn$ = this.authService.isLoggedIn$;
    console.log('ISLOGGEIN app COMPONENT', this.isLoggedIn$)
  }

  ngOnInit() {
    this.translate.get('app.title').subscribe((res: string) => {
      this.setDocTitle(res);
    });
    this.observerBreadcrumbs();
    this.observerLoading();
  }

  private navigationStart():Observable<Event> {
    return this.router.events.pipe(filter(event => event instanceof NavigationStart));
  }

  private navigationEnd():Observable<Event> {
    return this.router.events.pipe(filter(event => event instanceof NavigationEnd));
  }

  private observerBreadcrumbs() {
    this.navigationEnd()
      .subscribe(() => this.breadcrumbsService.initBreadcrumbs(this.activatedRoute.root));
  }

  private observerLoading() {
    const loadingOffObservable = this.navigationStart()
      .subscribe(() => this.loadingService.show(true));
    const loadingOnObservable = this.navigationEnd().subscribe( next => {
      this.loadingService.hide(true);
      window.scrollTo(0, 0);
    });
    this.unsubscribe.push(loadingOffObservable);
    this.unsubscribe.push(loadingOnObservable);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
