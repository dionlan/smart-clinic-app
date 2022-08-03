import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../../profiles/profile';
import { ProfilesService } from '../../profiles/profiles.service';
import { User } from '../user';
import { UserService } from '../users.service';
import { FormComponent } from "../../../../../shared/form/form.component";
import CustomValidator from "../../../../../shared/validators/custom-validator";
import { MessageService } from "primeng/api";
import { SearchParams } from '../../profiles/search-params';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent extends FormComponent implements OnInit {
  userForm!: FormGroup;
  profiles: Profile[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profilesService: ProfilesService,
    private message: MessageService,
    private router: Router,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('here on new')
    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required,
        Validators.maxLength(150),
        CustomValidator.patternWithMessage(
          new RegExp('^[a-zA-Z À-ü]*$','i'),
          'O campo deve conter apenas letras'
        )
      ]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required,CustomValidator.patternWithMessage(
        new RegExp('^[0-9.-]*$','i'),
        'O campo deve conter apenas numeros'
      )]],
      ativo: ['true', [Validators.required]],
      profileId: ['', [Validators.required]],
      resetPassword: ['', []],
      imagem: [null, []],
    });
    let params:SearchParams = {'radio_status':'true'} as SearchParams;

    this.profilesService.list(params).subscribe(
      (res) => {
        this.profiles = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public create(): void {

    this.validate(this.userForm);
    if (this.userForm.invalid) {
      console.log("invalid")
      return;
    }

    let user: User = this.userForm.getRawValue() as User;
    user.perfis = [] as Profile[];
    user.profileId.forEach(item =>{
      let profile: Profile = {
        'id':item
      } as Profile;

      user.perfis.push(profile);
    })

    this.userService.create(user).subscribe(
      () => {

        this.message.add({
          severity: 'success',
          summary: this.translateService.instant('home.admin.users.new.header'),
          detail: this.translateService.instant('message.success')
        });

        this.router.navigate(['/admin', 'usuarios']);
      },
      (error) => {
        console.log(error);
        if(error.hasOwnProperty('error')) {

          this.message.add({
            severity: 'error',
            summary: 'Erro ao cadastrar',
            detail: Object.keys(error.error).map(k => error.error[k]).join(', ')
          });
        }
      }
    );
  }
}
