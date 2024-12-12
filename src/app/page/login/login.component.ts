import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isResgisterForm: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['']
    });
  }
  onSubmit(): void {
    if (!this.isResgisterForm) {
      if (this.loginForm.valid) {
        console.log('Login form Submitted', this.loginForm.value);
        return
      }
      console.log("FAIL LOGIN");
    } else {
      const password:string = this.loginForm.get('retypePassword')?.value;
      const retypePassword:string = this.loginForm.get('password')?.value;

      if (retypePassword == password) {
        console.log('Register form Submitted', this.loginForm.value);
        return
      }
      console.log("Fail REGISTER");
    }
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  openRegister(): void {
    this.isResgisterForm = true
  }

  openLogin(): void {
    this.isResgisterForm = false
  }


}
