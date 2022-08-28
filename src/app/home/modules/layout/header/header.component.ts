import { SafeUrl } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from "rxjs";
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../admin/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  nomeUsuario: string = '';
  idUsuario: string = '';
  idImagem: string = '';
  srcImage: SafeUrl | undefined;
  @Input() previewWidth = 50;
  @Input() previewHeight = 50;

  @Input() toggleMenuSubject?: Subject<boolean>;
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem(AuthService.TOKEN) as any;
    const userData = jwt_decode(token) as any;
    console.log('USER DATA DECODE TOKEN :', userData)
    this.nomeUsuario = userData.nome as string;
    this.idUsuario = userData.sub as string;
  }

  public toggleMenu() {
    this.toggleMenuSubject?.next(true);
  }

  public logout() {
    if (this.authService.logout()) {
      this.router.navigate(['login']);
    }
  }
}
