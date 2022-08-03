import { FormComponent } from 'src/app/shared/form/form.component';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../profiles/profile';
import { User } from '../user';
import { UserService } from '../users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from "@ngx-translate/core";
import CustomValidator from 'src/app/shared/validators/custom-validator';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Credentials } from 'src/app/auth/models/credentials.mode';
import { SearchParams } from '../../profiles/search-params';
import { ProfilesService } from '../../profiles/profiles.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends FormComponent implements OnInit {

  profiles: Profile[] = [];
  id!: string;
  formReset: FormGroup = this.formBuilder.group({
    senha: ['', []]
  });

  user!:User;

  form: FormGroup = this.formBuilder.group({
    id: [this.id, []],
    nome: ['', [Validators.required,
      Validators.maxLength(150),
      CustomValidator.patternWithMessage(
        new RegExp('^[a-zA-Z À-ü]*$','i'),
        'O campo deve conter apenas letras'
      )
    ]],
    email: ['', [Validators.required]],
    cpf: ['', [Validators.required,CustomValidator.patternWithMessage(
      new RegExp('^[0-9.-]*$','i'),
      'O campo deve conter apenas numeros'
    )]],
    senha: ['', []],
    ativo: ['', [Validators.required]],
    profileId: ['', [Validators.required]],
    resetPassword: ['', []],
    imagem: ['', []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profilesService: ProfilesService,
    private router: Router,
    private message: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    let params:SearchParams = {'radio_status':'true'} as SearchParams;

    this.profilesService.list(params).subscribe(
      (res) => {
        this.profiles = res;
      },
      (error) => {
        console.error(error);
      }
    );
    this.userService.find(this.id).subscribe(
      (res: User) => {
        this.user = res;
        let arrIdPermission: number[] = [] ;

        res.perfis.forEach(x => {
          arrIdPermission.push(x.id);
        })
        this.form.patchValue(res);
        this.form.get('ativo')?.setValue(res.ativo ? 'true' : 'false');
        this.form.get('imagem')?.setValue(res.imagem)
        this.form
          .get('profileId')
          ?.setValue(res.perfis.length > 0 ? arrIdPermission : []);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public update(): void {
    let user: User = this.form.getRawValue() as User;
    user.perfis = [] as Profile[];
    user.profileId.forEach(item =>{
      let profile: Profile = {
        'id':item
      } as Profile;

      user.perfis.push(profile);
    })

    this.validate(this.form);
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const controlErrors: any = this.form!.get(key)!.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
           console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
      return;
    }
    this.userService.update(user).subscribe(
      () => {
        this.message.add({
          severity: 'success',
          summary: this.translateService.instant('home.admin.users.edit.header'),
          detail: this.translateService.instant('message.success')
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public delete(): void {
    this.userService.delete(parseInt(this.id)).subscribe(
      () => {
        this.router.navigate(['/admin', 'usuarios']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public openReset(content: any, user: User) {


    this.modalService.open(content, {}).result.then(
      (result) => {
        let login: Credentials = this.formReset.getRawValue() as Credentials;

        this.authService.checkUser(login).subscribe(
          (res) => {
            if(res){
              this.authService
                .resetPasswordUser(user)
                .subscribe((success)=>{
                  this.message.add({
                    severity: 'success',
                    summary: 'Senha redefinida com sucesso'
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
            this.formReset.setValue({
              'senha': ''
            });

          },
          (error) => {
            console.error(error);
          }
        );
      },
      (reason) => {     }
    );
  }
  public open(content: any,user: User) {
    this.modalService.open(content, {}).result.then(
      (result) => {
        let login: Credentials = this.formReset.getRawValue() as Credentials;

        this.authService.checkUser(login).subscribe(
          (res) => {
            if(res){
              this.delete();
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
        this.formReset.setValue({
          'senha': ''
        });
      },
      (reason) => { }
    );
  }
}
