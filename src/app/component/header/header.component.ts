import { TokenService } from 'src/app/jwt/token.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) { }


  ngOnInit(): void {
  }

  isTokenExisted(): boolean {
    if(this.tokenService.getToken() == ''){
      return false
    }
    const token:string = this.tokenService.getToken()
    return this.tokenService.isTokenExpiredV2()
  }


  isDropdownVisible = false;

  showDropdown(): void {
    this.isDropdownVisible = true;
  }

  hideDropdown(): void {
    this.isDropdownVisible = false;
  }
}
