import { TokenService } from 'src/app/jwt/token.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastPopupService } from 'src/app/service/toast-popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{



  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private toastPopupService:ToastPopupService
    // CART SERVICE to get total cart number items
  ) { }

  cartItems(): number{
    return 10 // <======
  }

  ngOnInit(): void {
  }

  isTokenExisted(): boolean {
    if(this.tokenService.getToken() == ''){
      return false
    }
    const token:string = this.tokenService.getToken()
    return this.tokenService.isTokenExpiredV2()
  }

  isAdmin(){
    return this.tokenService.isAdmin()
  }


  isDropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  logOut(){
    this.tokenService.removeToken()
    this.toastPopupService.showToast('Logged out successfully','success')
  }


}
