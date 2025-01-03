import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/jwt/token.service';
import { ErrorResponse } from 'src/app/response/ErrorResponse';
import { SuccessResponse } from 'src/app/response/SuccessResponse';
import { ToastPopupService } from 'src/app/service/toast-popup.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent {
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenSVC: TokenService,
    private toast: ToastPopupService) {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  updatePassword() {
    const uid = this.tokenSVC.getUserId();
    const passwordPayload = this.passwordForm.value;
    this.userService.updatePassword(uid, passwordPayload).subscribe(
      (res) => {
        const response = res as SuccessResponse;
        this.toast.showToast(response.message, 'success');
      },
      (error) => {
        const errorResponse = error.error as ErrorResponse;
        const errorMsg = errorResponse?.errorMsg || 'An unknown error occurred.';
        this.toast.showToast(`Error: ${errorMsg}`, 'error');
      }
    );
  }


  onSubmit() {
    if (this.passwordForm.valid) {
      this.updatePassword();
    } else {
      console.error('Form is invalid');
    }
  }
}
