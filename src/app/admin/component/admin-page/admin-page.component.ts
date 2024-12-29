import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor(private router: Router) {
  }

  buttons = [
    { label: 'Quản lý người dùng' },
    { label: 'Quản lý sản phẩm' },
    { label: 'Quản lý ABC' },
    { label: 'Quản lý 1123' },
  ];

  activeButtonIndex: number | null = null;

  setActive(index: number): void {
    this.activeButtonIndex = index;
  }
  goToHome(): void {
    this.router.navigate(['/']);
  }

}
