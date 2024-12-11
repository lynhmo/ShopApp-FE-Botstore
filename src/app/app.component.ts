import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Check if the current route is 'login'
      this.isLoginPage = this.router.url === '/login';
    });
  }

  checkLoginPage(){
    if (this.isLoginPage) {
      return ""
    }
    return "my-4"
  }
}
