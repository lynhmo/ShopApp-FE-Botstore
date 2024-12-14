import { HttpClient } from '@angular/common/http';
import { Register } from './../../model/register';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SuccessResponse } from 'src/app/response/SuccessResponse';
import { ErrorResponse } from 'src/app/response/ErrorResponse';
import { Toast } from 'bootstrap';
import { TokenResponse } from 'src/app/response/TokenResponse';
import { TokenService } from 'src/app/jwt/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isResgisterForm: boolean = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {



    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['']
    });


  }


  onSubmit(): void {
    if (!this.isResgisterForm) {
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe({
          next: (response: TokenResponse) => {
            this.showToast('Login successful!', 'success');
            this.tokenService.setToken(response.access_token)
            this.goToHome()
          },
          complete: () => {
          },
          error: (error: any) => {
            const errorResponse = error.error as ErrorResponse;
            this.showToast(`Error: ${errorResponse.errorMsg}`, 'error');
          }
        })
      }
    } else {
      const password: string = this.loginForm.get('retypePassword')?.value;
      const retypePassword: string = this.loginForm.get('password')?.value;

      if (retypePassword == password) {
        this.authService.register(this.loginForm.value).subscribe({
          next: (response: SuccessResponse) => {
            this.showToast('Registration successful!', 'success');
            this.openLogin()
          },
          complete: () => {
          },
          error: (error: any) => {
            const errorResponse = error.error as ErrorResponse;
            this.showToast(`Error: ${errorResponse.errorMsg}`, 'error');
          }
        })
      }
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



  showToast(message: string, type: 'success' | 'error') {
    const toastContainer = document.getElementById('toastContainer');
    const toastTemplate = document.getElementById('toastTemplate')?.cloneNode(true) as HTMLElement;

    if (toastTemplate) {
      toastTemplate.style.display = 'block';
      toastTemplate.querySelector('.toast-body')!.textContent = message;

      toastTemplate.classList.remove('text-bg-primary', 'text-bg-success', 'text-bg-danger');
      if (type === 'success') {
        toastTemplate.classList.add('text-bg-success');
      } else {
        toastTemplate.classList.add('text-bg-danger');
      }

      toastTemplate.classList.add('slide-in');

      toastContainer?.appendChild(toastTemplate);
      const toast = new Toast(toastTemplate);
      toast.show();

      setTimeout(() => {
        toastTemplate.remove();
      }, 2000);
    }
  }


}
