import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  toggleMenuSubject: Subject<boolean> = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  public logout() {
    if (this.authService.logout()) {
      this.router.navigate(['login']);
    }
  }
}
