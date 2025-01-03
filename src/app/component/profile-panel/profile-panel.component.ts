import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TokenService } from 'src/app/jwt/token.service';
import { UserResponse } from 'src/app/model/user-response';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss']
})
export class ProfilePanelComponent implements OnInit {
  localStorage?: Storage;

  constructor(
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  _userData: UserResponse = {
    id: 0,
    fullName: '',
    address: '',
    is_active: false,
    dateOfBirth: new Date(),
    facebook_account_id: 0,
    google_account_id: 0,
    role: {
      id: 0,
      name: ''
    }
  }

  ngOnInit(): void {
    this.loadUserData();
  }
  formattedDate!: string;

  loadUserData() {
    this._userData = this.localStorage?.getItem('user') ? JSON.parse(this.localStorage?.getItem('user') as string) : null;
    const date = new Date(this._userData.dateOfBirth);
    this.formattedDate = date.toISOString().slice(0, 10);
  }

  isEditing = false;
  originalData = { ...this._userData };

  toggleEdit() {
    if (this.isEditing) {
      this.originalData = { ...this._userData };
      const sendData = {
        id: this._userData.id,
        fullname: this._userData.fullName,
        address: this._userData.address,
        date_of_birth: this.formattedDate,
        role_id: this._userData.role.id
      }

      this.userService.editUser(sendData).subscribe({
        next: (response) => {
          this.originalData = { ...response };
          this.localStorage?.setItem('user', JSON.stringify(response));
        }
      });
    }
    this.isEditing = !this.isEditing;
  }

  cancelEdit() {
    // this._userData = { ...this.originalData };
    this.isEditing = false;
  }
}
