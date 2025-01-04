import { UserService } from 'src/app/service/user.service';
import { OrderService } from 'src/app/service/order.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';
import { ToastPopupService } from 'src/app/service/toast-popup.service';

import { Order } from 'src/app/model/Order';

@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {
  constructor(
    private toastPopupService: ToastPopupService,
    private OrderService: OrderService,
    private UserService: UserService
  ) { }


  //Variable for table
  pageOrder!: Order[];
  selectedCategoryId: number | null = null;

  formatDate(orderDate: string): String {
    const date = new Date(orderDate);
    return date.toISOString().slice(0, 10);
  }

  // Data table related
  displayedColumns: string[] = ['id', 'uid', 'username', 'address', 'orderdate', 'totalmoney', 'status', 'isdelete', 'utils'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.loadOrder();
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


  updateStatusPayload = {
    status: '',
  };

  updateOrder(order: any) {
    this.updateStatusPayload = {
      status: order.status,
    };
  }

  onEditSubmit(form: any) {
    const order: Order = form.value;
    // this.OrderService.updateOrderStatus(12, order.id, this.updateStatusPayload.status).subscribe({
    //   next: (response) => {
    //     this.toastPopupService.showToast('Edit user success', 'success');
    //     this.loadOrder();
    //   },
    //   error: (error) => {
    //     console.error(error);
    //     this.toastPopupService.showToast(error, 'error');
    //   }
    // })
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
