import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  tabs = [
    { label: 'Thông tin cá nhân', icon: 'edit', tabname: 'profile' },
    { label: 'Lịch sử đơn hàng', icon: 'history', tabname: 'order' },
    { label: 'Thay đổi mật khẩu', icon: 'lock', tabname: 'password' },
  ];

  activeTab = 1;

  @ViewChild('highlight') highlight!: ElementRef;

  constructor(private renderer: Renderer2) { }

  setActiveTab(index: number, event: MouseEvent) {
    this.activeTab = index;

    // Get clicked element's position
    const target = event.target as HTMLElement;
    const parent = target.closest('.tab') as HTMLElement;

    if (parent && this.highlight) {
      const parentRect = parent.getBoundingClientRect();
      const leftPanelRect = (parent.parentElement as HTMLElement).getBoundingClientRect();

      this.renderer.setStyle(this.highlight.nativeElement, 'top', `${parent.offsetTop}px`);
      this.renderer.setStyle(this.highlight.nativeElement, 'height', `${parentRect.height}px`);
    }
  }
}
