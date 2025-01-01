import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/jwt/token.service';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/service/order.service';
import { PaymentService } from 'src/app/service/payment.service';
import { ToastPopupService } from 'src/app/service/toast-popup.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  private readonly PENDING_ORDER = 'pending_order';
  localStorage?: Storage
  sessionStorages?: Storage
  order!: Order;
  pendingOrderId: number | null = null;
  totalMoney: number = 0;
  shippedCost: number = 0;

  paymentMethod: string = 'cash'
  shippingMethod: string = 'ghtk'


  returnOrderId: string | null = null;
  resultCode: string | null = null;
  returnMessage: string | null = null;


  constructor(
    private router: Router,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private toast: ToastPopupService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
    this.sessionStorages = document.defaultView?.sessionStorage;
  }


  ngOnInit(): void {
    this.getPendingOrder();
    this.getResultMOMO();
    this.totalMoney = this.order.total_money;
  }


  getResultMOMO(): void {
    this.route.queryParamMap.subscribe(params => {
      this.returnOrderId = params.get('extraData');
      this.resultCode = params.get('resultCode');
      this.returnMessage = params.get('message');
    });
    if (this.returnOrderId != null
      && this.returnMessage != null
      && this.resultCode != null
      && this.resultCode == '0') {
      // set pending order to success
      this.orderService.updateOrderStatus(Number(this.returnOrderId),
        this.tokenService.getUserId(), 'processing')
        .subscribe({
          next: (response) => {
            console.log(response);
          }
        });

      // clear pending order local storage
      this.localStorage?.removeItem(this.PENDING_ORDER);
      // redirect to order success page
      this.router.navigate(['/order-success']);
      this.toast.showToastTime(this.returnMessage, 'success', 5000)

    } else if (this.returnOrderId != null
      && this.returnMessage != null
      && this.resultCode != null
      && this.resultCode != '0') {

      this.toast.showToastTime(this.returnMessage, 'error', 5000)
    }
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

  pay() {
    if (this.paymentMethod == 'cash') {
      this.payCash();
    } else {
      this.payWithMomo();
    }
  }



  payCash(): void {
    if (this.pendingOrderId == null) {
      throw new Error('Order ID is null');
    }
    let status: string = 'processing';
    this.orderService.updateOrderStatus(this.pendingOrderId, this.tokenService.getUserId(), status)
      .subscribe({
        next: (response) => {
          // clear pending order local storage
          this.localStorage?.removeItem(this.PENDING_ORDER);
          // redirect to order success page
          this.router.navigate(['/order-success']);
          this.toast.showToastTime('Thanh toán thành công!', 'success', 5000)
        }
      });
  }

  payWithMomo(): void {
    if (this.order.id == null) {
      throw new Error('Order ID is null');
    } else {
      this.paymentService.momoPay(this.paymentMethod, this.totalMoney + this.shippedCost, this.order.id)
        .subscribe({
          next: (response) => {
            window.location.href = response.payUrl;
          }
        })
    }
  }


  formatToVietnameseDong(amount: number): string {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}
