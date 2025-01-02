import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/jwt/token.service';
import { OrderResponse } from 'src/app/response/OrderResponse';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  userId!: number
  ordersDetails!: OrderResponse[]


  constructor(
    private orderService: OrderService,
    private tokenSvc: TokenService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getUserId();
    this.loadOrders();
  }


  loadOrders() {
    this.orderService.getAllOrdersByUserId(this.userId).subscribe(data => {
      this.ordersDetails = data;
      console.log(this.ordersDetails);
    });
  }

  formatToVietnameseDong(amount: number): string {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

}
