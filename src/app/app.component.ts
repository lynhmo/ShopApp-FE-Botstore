import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  isAdminPage: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'login' or 'admin'
        this.isLoginPage = this.router.url.startsWith('/login');
        this.isAdminPage = this.router.url.startsWith('/admin');
      }
    });
  }

  checkLoginPage() {
    return this.isLoginPage || this.isAdminPage ? "" : "my-4";
  }
}
