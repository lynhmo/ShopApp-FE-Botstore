import { animate, query, sequence, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('200ms ease', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
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

  activeButtonIndex: number = 0;

  setActive(index: number): void {
    this.activeButtonIndex = index;
  }
  goToHome(): void {
    this.router.navigate(['/']);
  }

}
