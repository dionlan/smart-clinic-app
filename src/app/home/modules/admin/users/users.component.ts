import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from '../profiles/profile';
import { ProfilesService } from '../profiles/profiles.service';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';
import { User } from './user';
import { UserService } from './users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from "rxjs";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})

export class UsersComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formReset!: FormGroup;
  params!: SearchParams;
  result: SearchResult[] = [];
  profiles: Profile[] = [];
  onEmptyResultSubject: Subject<boolean> = new Subject<boolean>();
  switch: boolean = true;
  checked: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profilesService: ProfilesService,
    private message: MessageService,
    private translateService: TranslateService,
    private authService: AuthService,
    private modalService: NgbModal,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.formReset = this.formBuilder.group({
      senha: ['', []]
    });
    this.form = this.formBuilder.group({
      id: ['', []],
      nome: ['', []],
      email: ['', []],
      ativo: ['', []],
      switch: [true],
      perfil: ['', []],
      perfilDescricao: ['', []],
      dataCadastro: ['', []],
    });
    this.params = this.form.getRawValue() as SearchParams;
    this.list();
    this.subscribeOnEmptyResult();
  }

  ngOnDestroy(): void {
    this.onEmptyResultSubject.unsubscribe();
  }

  subscribeOnEmptyResult() {
    this.onEmptyResultSubject.subscribe(() => {
      this.reset();
    });
  }

  public search($event:any): void {
    if($event!=null )$event.preventDefault();
    this.params = this.form.getRawValue() as SearchParams;
    this.list();
    return;
  }

  private list(): void {
    let params = this.params;
    params.PageNumber = 1;
    params.PageSize = 10;
    this.userService.listUsers(this.params).subscribe(
      (res) => {
        this.result = res.items;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public delete(user: User): void {
    this.userService.delete(user.id).subscribe(
      () => {
        this.list();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public toggleActive(user: User): void {
    this.userService.toggleActive(user).subscribe(
      () => {
        this.list();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public reset(){
    this.form = this.formBuilder.group({
      name: ['', []],
      email: ['', []]
    });
    this.search(null);
  }
}
