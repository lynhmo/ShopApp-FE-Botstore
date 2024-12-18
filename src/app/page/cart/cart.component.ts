import { OrderDetail } from './../../model/OrderDetail';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { TokenService } from 'src/app/jwt/token.service';
import { Order } from 'src/app/model/Order';
import { OrderDetailProduct } from 'src/app/model/OrderDetailProduct';
import { Product } from 'src/app/model/product.model';
import { UpdateOrderDetails } from 'src/app/model/UpdateOrderDetails';
import { OrderService } from 'src/app/service/order.service';
import { OrderDetailService } from 'src/app/service/orderDetail.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastPopupService } from 'src/app/service/toast-popup.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private readonly PENDING_ORDER = 'pending_order';


  localStorage?: Storage
  pendingOrderId: number | null = null;
  inputQuantity!: number
  penddingOrder!: Order

  listProduct!: Product[]
  listOrderDetail!: OrderDetailProduct[]


  constructor(
    private orderDetailService: OrderDetailService,
    private productService: ProductService,
    private orderService: OrderService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }


  ngOnInit(): void {
    this.refreshOrder()
  }

  refreshOrder() {
    this.getPendingOrderId()
    this.getOrderDetails()
    this.getOrder()
  }

  getPendingOrderId(): void {
    this.pendingOrderId = this.localStorage?.getItem(this.PENDING_ORDER)
      ? Number(this.localStorage.getItem(this.PENDING_ORDER))
      : null;
  }

  getOrderDetails() {
    if (this.pendingOrderId == null) {
      throw new Error('Order ID is null');
    }

    this.orderDetailService.getAllOrderDetails(this.pendingOrderId).subscribe({
      next: (response) => {
        const orderDetails: OrderDetail[] = response.content;

        // Map OrderDetail to OrderDetailProduct
        const mappedDetails$ = orderDetails.map(orderDetail => {
          return this.productService.getProduct(orderDetail.product_id).pipe(
            map(product => ({
              ...orderDetail,
              product: product
            }))
          );
        });
        forkJoin(mappedDetails$).subscribe({
          next: (orderDetailProducts) => {
            this.listOrderDetail = orderDetailProducts;
            this.listOrderDetail.forEach(orderDetails => {
              if (orderDetails.product.thumbnail && !orderDetails.product.thumbnail.startsWith('data:image')) {
                orderDetails.product.thumbnail = `data:image/jpeg;base64,${orderDetails.product.thumbnail}`;
              }
            })
            console.log('Mapped Order Details:', this.listOrderDetail);
          },
          error: (err) => console.error('Error fetching product details:', err)
        });
      },
      error: (err) => console.error('Error fetching order details:', err)
    });
  }

  getOrder() {
    if (this.pendingOrderId == null) {
      throw new Error('Order ID is null');
    }
    this.orderService.getOrderById(this.pendingOrderId).subscribe({
      next: (order) => {
        this.penddingOrder = order
      }
    })
  }


  // Số lượng mua
  receiveInputData(data: number, orderDetail: OrderDetailProduct) {
    this.inputQuantity = data
    const updatedOrderDetail: UpdateOrderDetails = {
      order_id: orderDetail.order_id,
      product_id: orderDetail.product_id,
      number_of_product: data
    };
    if (this.pendingOrderId == null) {
      throw new Error('Order ID is null');
    }
    this.orderDetailService.updateOrderDetails(orderDetail.id, updatedOrderDetail).subscribe({
      next: (response) => {
        this.refreshOrder()
      },
      error: (err) => {
        console.error('Error updating OrderDetail:', err);
      },
    });
  }

  formatToVietnameseDong(amount: number): string {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}
