import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required] ],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  login(): void {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
    }
  }
}
