import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { MenuItem } from './core/models/menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoggedIn$: Observable<boolean>;
  title = 'smart-clinic-app';

  menuItems: MenuItem[] = [
    {
      matIcon: 'home',
      routerLink: '/home',
      toolTipText: 'Home'
    }];

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private titleService: Title) {

    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit() {
    this.translate.get('app.title').subscribe((res: string) => {
      this.setDocTitle(res);
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
