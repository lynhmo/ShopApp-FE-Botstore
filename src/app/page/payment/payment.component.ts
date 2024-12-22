import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  private readonly PENDING_ORDER = 'pending_order';
  localStorage?: Storage
  order!: Order;
  pendingOrderId: number | null = null;
  totalMoney: number = 0;
  shippedCost: number = 0;


  constructor(
    private router: Router,
    private orderService: OrderService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }


  ngOnInit(): void {
    this.getPendingOrder();
    this.totalMoney = this.order.total_money;

  }



  getPendingOrder(): void {
    this.pendingOrderId = this.localStorage?.getItem(this.PENDING_ORDER)
      ? Number(this.localStorage.getItem(this.PENDING_ORDER))
      : null;
    if (this.pendingOrderId == null) {
      this.router.navigate(['/cart']);
      throw new Error('Pending order not found');
    }
    this.getOrder();
    console.log(this.order);

  }


  getOrder() {
    if (this.pendingOrderId == null) {
      throw new Error('Order ID is null');
    }
    this.orderService.getOrderById(this.pendingOrderId).subscribe({
      next: (order) => {
        this.order = order
        this.totalMoney = order.total_money
        this.calShipingCost(this.totalMoney);
      }
    })
  }

  private calShipingCost(money: number): void {
    if (money < 200000 && money > 0) {
      this.shippedCost = 20000
    } else if (money >= 200000 && money <= 500000) {
      this.shippedCost = 10000
    } else if (money > 500000) {
      this.shippedCost = 0
    }
  }


  formatToVietnameseDong(amount: number): string {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}
