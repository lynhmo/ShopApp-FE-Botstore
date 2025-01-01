import { TokenService } from './../../jwt/token.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailProduct } from 'src/app/model/OrderDetailProduct';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  private readonly ORDER_PROCDUCT = 'order_product';
  private readonly PENDING_ORDER = 'pending_order';

  localStorage?: Storage
  orderIdPending!: number
  sessionStorages?: Storage

  listOrderDetail!: OrderDetailProduct[]

  countdown: number = 10; // 10-second countdown
  private intervalId: any;

  constructor(
    private orderService: OrderService,
    private tokenService: TokenService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
    this.sessionStorages = document.defaultView?.sessionStorage;
  }

  ngOnInit(): void {
    this.getIdOrderPending();
    this.sessionStorages?.setItem('payment-status', 'true');
    this.getOrderedProduct();
    this.startCountdown();
  }


  getOrderedProduct() {
    this.listOrderDetail = JSON.parse(
      this.sessionStorages?.getItem(this.ORDER_PROCDUCT) || '[]'
    );
  }


  ngOnDestroy(): void {
    // Clear the timer when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.goToHome(); // Navigate to the home page when countdown ends
      }
    }, 1000);
  }

  goToHome(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Stop the countdown
    }
    window.location.href = ''
  }

  formatToVietnameseDong(amount: number): string {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }



  getIdOrderPending() {
    this.orderService.getPendingOrderIds(this.tokenService.getUserId())
      .subscribe({
        next: (pendingIds) => {
          this.orderIdPending = pendingIds[0];
          this.localStorage?.setItem(
            this.PENDING_ORDER,
            this.orderIdPending.toString()
          );
        },
        error: (err) => {
          console.error('Error fetching pending order IDs:', err);
        }
      });
  }
}
