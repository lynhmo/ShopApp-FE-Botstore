import { Order } from './../../model/Order';
import { TokenService } from 'src/app/jwt/token.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastPopupService } from 'src/app/service/toast-popup.service';
import { OrderDetailService } from 'src/app/service/orderDetail.service';
import { OrderService } from 'src/app/service/order.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly PENDING_ORDER = 'pending_order';
  localStorage?: Storage;

  constructor(
    private tokenService: TokenService,
    private toastPopupService: ToastPopupService,
    private orderDetailService: OrderDetailService,
    private orderService: OrderService,
    @Inject(DOCUMENT) private document: Document
    // CART SERVICE to get total cart number items
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  orderIdPending!: number
  productInCart!: number

  ngOnInit(): void {
    this.getIdOrderPending()

  }

  getIdOrderPending() {
    this.orderService.getPendingOrderIds(this.tokenService.getUserId()).subscribe({
      next: (pendingIds) => {
        this.orderIdPending = pendingIds[0];
        this.getProductInCart()
        this.localStorage?.setItem(this.PENDING_ORDER, this.orderIdPending.toString());
      },
      error: (err) => {
        console.error('Error fetching pending order IDs:', err);
      }
    });
  }


  getProductInCart() {
    this.orderDetailService.getProductNumberInOrder(this.orderIdPending).subscribe({
      next: (value) => {
        this.productInCart = value
      },
      error: (err) => {
        console.error('Error :', err);
      }
    });
  }




  cartItems(): number {
    return this.productInCart
  }



  isTokenExisted(): boolean {
    if (this.tokenService.getToken() == '') {
      return false
    }
    const token: string = this.tokenService.getToken()
    return this.tokenService.isTokenExpiredV2()
  }

  isAdmin() {
    return this.tokenService.isAdmin()
  }


  isDropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  logOut() {
    this.tokenService.removeToken()
    localStorage.clear();
    this.toastPopupService.showToast('Logged out successfully', 'success')
  }


}
