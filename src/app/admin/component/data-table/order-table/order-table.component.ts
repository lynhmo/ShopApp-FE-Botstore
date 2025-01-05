import { UserService } from 'src/app/service/user.service';
import { OrderService } from 'src/app/service/order.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';
import { ToastPopupService } from 'src/app/service/toast-popup.service';

import { Order } from 'src/app/model/Order';
import { DOCUMENT } from '@angular/common';
import { UserResponse } from 'src/app/model/user-response';

@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {
  constructor(
    private toastPopupService: ToastPopupService,
    private OrderService: OrderService,
    @Inject(DOCUMENT) private document: Document
  ) { this.localStorage = document.defaultView?.localStorage; }

  localStorage?: Storage
  user!: UserResponse

  //Variable for table
  pageOrder!: Order[];
  selectedCategoryId: number | null = null;

  formatDate(orderDate: string): String {
    const date = new Date(orderDate);
    return date.toISOString().slice(0, 10);
  }

  // Data table related
  displayedColumns: string[] = ['id', 'uid', 'username', 'address', 'orderdate', 'totalmoney', 'status', 'utils'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.loadOrder();
    this.user = this.localStorage?.getItem('user') ? JSON.parse(this.localStorage?.getItem('user') as string) : null;
  }

  loadOrder() {
    this.OrderService.getAll().subscribe({
      next: (response) => {
        this.pageOrder = response;
        this.dataSource = new MatTableDataSource(response);
        this.ngAfterViewInit();
      }
    });
  }


  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }


  orderStatus = [
    { value: 'cancelled', name: 'Đã huỷ' },
    { value: 'shipped', name: 'Đang chuyển hàng' },
    { value: 'delivered', name: 'Đã chuyển hàng' },
    { value: 'processing', name: 'Đang xử lý' },
  ]


  updateStatusPayload = {
    id: null,
    status: '',
  };

  updateOrder(order: any) {
    this.updateStatusPayload = {
      id: order.id,
      status: order.status,
    };
  }

  onEditSubmit(form: any) {
    const order: Order = form.value;
    this.OrderService.updateOrderStatus(order.id, this.user.id, this.updateStatusPayload.status).subscribe({
      next: (response) => {
        this.toastPopupService.showToast('Sửa thông tin đơn hàng thành công', 'success');
        this.loadOrder();
      },
      error: (error) => {
        console.error(error);
        this.toastPopupService.showToast(error, 'error');
      }
    })
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
    paginatorIntl.firstPageLabel = '';
    paginatorIntl.lastPageLabel = '';
    this.paginator._intl.getRangeLabel = paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const initialText = ``;  // Sửa dòng để thay chữ ở pagination
      if (length == 0 || pageSize == 0) {
        return `${initialText} 0 -- ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
      return `${initialText} ${startIndex + 1} To ${endIndex} Total ${length}`; // Sửa dòng để thay chữ ở pagination
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
