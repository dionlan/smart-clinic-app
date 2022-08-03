import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '../../permissions.service';
import { Permission } from '../../permission';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Credentials } from 'src/app/auth/models/credentials.mode';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  options: Permission[] = [];
  validateOptionsArray : string[] = [];
  id!: string;

  formReset: FormGroup = this.formBuilder.group({
    senha: ['', []]
  });
  hasUser: boolean = false;
  permissions: Permission[] = [];
  allTabsName: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfilesService,
    private permissionsService: PermissionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private message: MessageService,
    private modalService: NgbModal
  ) {
    this.permissionsService.getSubjectPermission()
    .subscribe(x => {
      this.onCbChange(x);
    });
    this.permissionsService.getAllSubjectPermission()
    .subscribe(x =>{
      this.checkAll(x);
    });
    this.allTabsName.push('home');
    this.allTabsName.push('admin');
    this.allTabsName.push('website');
    this.allTabsName.push('faq');
    this.allTabsName.push('knowledge');
    this.allTabsName.push('chat');
    this.allTabsName.push('demand');
    this.allTabsName.push('schedule');
    this.allTabsName.push('app');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.form = this.formBuilder.group({
      id: [this.id, []],
      nome: ['', [Validators.required]],
      ativo: ['', [Validators.required]],
    });
    this.permissionsService.list().subscribe(
      (res) => {
        this.options = res;
        this.form.addControl('permissionIds', this.formBuilder.array([], []));
        this.find();


      },
      (error) => {
        console.error(error);
      }
    );


  }
  checkUncheckAll(e: any){
    this.permissionsService.setAllSubjectPermission(e);

  }

  isChecked(value : string){
    let result = this.validateOptionsArray.filter(x =>{ return x == value } );

    return (result.length>0)? true : false;
  }

  find(){
    this.profileService
      .hasUser(this.id)
      .subscribe(
        x => {
          this.hasUser = x;
        }
      )
    this.profileService.find(this.id).subscribe(
      (res) => {
        this.form.patchValue({
          id:res.id,
          nome: res.nome,
          ativo: (res.ativo == true)?"true":"false"
        });
        let ids: number[] = res.permissoes.map((p) => p.id);
        ids.forEach((id) => {

          let option = this.options.find((p) => p.id == id);

          if (option != null) {
            option.checked = true;
            this.check(id);
          }
          const permissions: FormArray = this.form.get('permissionIds') as FormArray;
          this.permissionsService.setPermissions(permissions);
        });
        this.allTabsName.forEach(tab =>{
          this.setValidateOptions(tab)
        })


      });
  }


  setValidateOptions(tabname: string){
    let controlsOption:Permission[] = [];
    let controlsOptionValidation:Permission[] = [];
    for (var i = 0; i < this.options.length; i++) {
      if(this.options[i].tab?.endsWith(tabname)){
        let item = this.options[i];
        if (item.checked) {
          controlsOption.push(this.options[i] )
        }
        controlsOptionValidation.push(this.options[i])
      }
    }
    if(controlsOption.length == controlsOptionValidation.length){
      this.validateOptionsArray.push(tabname);
    }
  }


  checkAll(e: any) {
    const permiss: FormArray = this.form.get('permissionIds') as FormArray;
    const permissions: FormArray = this.form.get('permissionIds') as FormArray;

    const tabName = e.target.value;

    for (var i = 0; i < this.options.length; i++) {
      if(this.options[i].tab == tabName){
        this.options[i].checked = !this.options[i].checked;
        if (this.options[i].checked) {console.log(this.options[i])
          permissions.push(new FormControl(this.options[i].id));
          this.setValidateOptions(tabName)
        } else {console.log(this.options[i])
          let indice: number = 0;
          permissions.controls.forEach((item: any) => {
            if (item.value == this.options[i].id) {

              this.options[i].checked = false
              const index = this.validateOptionsArray.indexOf(tabName);
              if (index > -1) {
                this.validateOptionsArray.splice(index, 1); // 2nd parameter means remove one item only
              }
              permissions.removeAt(indice);
              return;
            }
            indice++;
          });
        }
      }
    }
    this.permissionsService.setPermissions(permissions);

  }
  onCbChange(e: any) {
    if (e.target.checked) {
      this.check(e.target.value);
    } else {
      this.uncheck(e.target.value);
    }
  }

  private check(id: number) {
    const permissionIds: FormArray = this.form.get(
      'permissionIds'
    ) as FormArray;
    permissionIds.push(new FormControl(id));
    this.permissionsService.setPermissions(permissionIds);
  }

  private uncheck(id: number) {
    const permissionIds: FormArray = this.form.get(
      'permissionIds'
    ) as FormArray;
    let i: number = 0;
    permissionIds.controls.forEach((item: any) => {
      if (item.value == id) {
        permissionIds.removeAt(i);
        return;
      }
      i++;
    });
    this.permissionsService.setPermissions(permissionIds);
  }

  public update(): void {
    window.scrollTo(0, 0);
    let obj: any = this.form.getRawValue();
    let profile: Profile = obj as Profile;
    let ids: number[] = obj.permissionIds;
    profile.permissoes = ids.map((id) => {
      let p: Permission = new Permission();
      p.id = id;
      return p;
    });
    this.profileService.update(profile).subscribe(
      () => {
        this.router.navigate(['/admin', 'perfis']);
      },
      (error) => {
        console.error(error);
        if(error.hasOwnProperty('error')) {

          this.message.add({
            severity: 'error',
            summary: 'Erro ao alterar',
            detail: Object.keys(error.error).map(k => error.error[k]).join(', ')
          });
        }
      }
    );
  }

  public delete(): void {
    this.profileService.delete(parseInt(this.id)).subscribe(
      (res) => {
        this.router.navigate(['/admin', 'perfis']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public open(content: any) {
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
