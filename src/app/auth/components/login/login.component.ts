import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/shared/form/form.component';
import { Credentials } from '../../models/credentials.mode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormComponent implements OnInit  {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){
      super();
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required] ],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  public login(): void {
    let login: Credentials = this.loginForm.getRawValue() as Credentials;
    this.validate(this.loginForm);
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        const controlErrors: any = this.loginForm!.get(key)!.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
           console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
      return;
    }
    this.authService.login(login).subscribe(
      (res) => {

        console.log('ressssssss LOGIN SUCESSO!', res)
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('ERRO LOGIN',error);
      }
    );
  }
}
