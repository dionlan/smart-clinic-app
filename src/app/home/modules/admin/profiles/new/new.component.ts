import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionsService } from '../../permissions.service';
import { Permission } from '../../permission';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { FormComponent } from 'src/app/shared/form/form.component';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent extends FormComponent implements OnInit {
  form!: FormGroup;
  permissions: Permission[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfilesService,
    private message: MessageService,
    private permissionsService: PermissionsService,
    private router: Router
  ) {
    super();
    this.permissionsService.getSubjectPermission()
    .subscribe(x => {
      this.onCbChange(x);
    });
    this.permissionsService.getAllSubjectPermission()
    .subscribe(x =>{
      this.checkAll(x);
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      ativo: ["true", [Validators.required]],
    });
    this.permissionsService.list().subscribe(
      (res) => {
        this.permissions = res;
        this.form.addControl('permissionIds', this.formBuilder.array([], []));
      },
      (error) => {
        console.error(error);
      }
    );
  }
  checkUncheckAll(e: any){
    this.permissionsService.setAllSubjectPermission(e);

  }
  checkAll(e: any) {
    const permiss: FormArray = this.form.get('permissionIds') as FormArray;
    const permissions: FormArray = this.form.get('permissionIds') as FormArray;
    const tabName = e.target.value;

    for (var i = 0; i < this.permissions.length; i++) {
      if(this.permissions[i].tab == tabName){
        this.permissions[i].checked = !this.permissions[i].checked;
        if (this.permissions[i].checked) {
          permissions.push(new FormControl(this.permissions[i].id));
        } else {
          let indice: number = 0;
          permissions.controls.forEach((item: any) => {
            if (item.value == this.permissions[i].id) {
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
    const permissions: FormArray = this.form.get('permissionIds') as FormArray;

    if (e.target.checked) {
      permissions.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      permissions.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          permissions.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.permissionsService.setPermissions(permissions);
  }

  onCbObjectChange(e: Permission) {
    const permissions: FormArray = this.form.get('permissionIds') as FormArray;

    if (e.checked) {
      permissions.push(new FormControl(e.id));
    } else {
      let i: number = 0;
      permissions.controls.forEach((item: any) => {
        if (item.value == e.id) {
          permissions.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.permissionsService.setPermissions(permissions);
  }

  public create(): void {
    window.scrollTo(0, 0);
    let obj: any = this.form.getRawValue();
    let profile: Profile = obj as Profile;
    let ids: number[] = obj.permissionIds;
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
    profile.permissoes = ids.map((id) => {
      let p: Permission = new Permission();
      p.id = id;
      return p;
    });
    this.profileService.create(profile).subscribe(
      () => {
        this.router.navigate(['/admin', 'perfis']);
      },
      (error) => {
        console.error(error);
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
