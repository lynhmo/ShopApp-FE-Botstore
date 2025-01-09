import { OrderService } from 'src/app/service/order.service';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';

import { DOCUMENT } from '@angular/common';
import { UserResponse } from 'src/app/model/user-response';
import { OrderDetailService } from 'src/app/service/orderDetail.service';
import { OrderDetailWithImage } from 'src/app/response/OrderDetailWithImage';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements AfterViewInit, OnInit {
  @Input() check!: boolean;
  @Input() orderID!: number;
  @Output() checkChange = new EventEmitter<boolean>();

  constructor(
    private orderDetailService: OrderDetailService,
    @Inject(DOCUMENT) private document: Document
  ) { this.localStorage = document.defaultView?.localStorage; }


  localStorage?: Storage
  user!: UserResponse

  //Variable for table
  orderDetails!: OrderDetailWithImage[];

  // Data table related
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'totalmoney'];
  dataSource!: MatTableDataSource<OrderDetailWithImage>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  // Trở về trang hoá đơn
  goBack() {
    this.check = false
    this.checkChange.emit(this.check)
  }

  ngOnInit(): void {
    this.loadOrderDetail()
  }



  loadOrderDetail() {
    this.orderDetailService.getAllOrderDetail(this.orderID).subscribe({
      next: (response) => {
        this.orderDetails = response;
        console.log(response);

        this.dataSource = new MatTableDataSource(response);
        this.ngAfterViewInit();
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
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
