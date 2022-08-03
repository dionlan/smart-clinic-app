import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from '../profiles/profile';
import { ProfilesService } from '../profiles/profiles.service';
import { SearchParams } from './search-params';
import { SearchParams as SP } from 'src/app/home/modules/admin/profiles/search-params';
import { SearchResult } from './search-result';
import { User } from './user';
import { UserService } from './users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from "rxjs";
import {MessageService} from "primeng/api";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Credentials } from 'src/app/auth/models/credentials.mode';


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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profilesService: ProfilesService,
    private message: MessageService,
    private translateService: TranslateService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.formReset = this.formBuilder.group({
      senha: ['', []]
    });
    this.form = this.formBuilder.group({
      name: ['', []],
      email: ['', []],
      cpf: ['', []],
      radio_status: ['true', []],
      profileId: [[], []],
    });
    this.params = this.form.getRawValue() as SearchParams;
    this.list();
    let paramsProfile:SP = {'radio_status':'true'} as SP;
    this.profilesService.list(paramsProfile).subscribe(
      (res) => {
        this.profiles = res;
      },
      (error) => {
        console.error(error);
      }
    );
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



  public profileNames(user: User): string {
    return user.perfis.map((p) => p.nome).join(', ');
  }

  public search($event:any): void {
    if($event!=null )$event.preventDefault();
    this.params = this.form.getRawValue() as SearchParams;
    this.list();
    return;
  }

  private list(): void {
    this.userService.list(this.params).subscribe(
      (res) => {
        this.result = res;
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
      email: ['', []],
      cpf: ['', []],
      radio_status: ['true', []],
      profileId: [[], []],
    });
    this.search(null);
  }

  public openReset(content: any, user: User) {
    this.formReset.get("senha")?.setValue("");
    this.modalService.open(content, {}).result.then(
      (result) => {
        let login: Credentials = this.formReset.getRawValue() as Credentials;

        this.authService.checkUser(login).subscribe(
          (res) => {
            if(res){
              this.authService
                .resetPasswordUser(user)
                .subscribe(
                  (success)=>{
                    this.message.add({
                      severity: 'success',
                      summary: this.translateService.instant('Resetar senha'),
                      detail: this.translateService.instant('message.success')
                    });
                },
                (err) =>{

                });

            } else {
              this.message.add({
                severity: 'error',
                summary: 'Senha inválida'
              });
            }
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (reason) => {     }
    );
  }

  public open(content: any, user: User) {
    this.modalService.open(content, {}).result.then(
      (result) => {
        this.delete(user);
      },
      (reason) => {}
    );
  }
}
