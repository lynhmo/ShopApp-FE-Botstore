import { ErrorResponse } from './../../../../response/ErrorResponse';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';
import { Category } from 'src/app/model/category';
import { ToastPopupService } from 'src/app/service/toast-popup.service';
import { UserService } from 'src/app/service/user.service';
import { UserResponse } from 'src/app/model/user-response';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class TableComponent implements AfterViewInit {
  localStorage?: Storage

  constructor(
    private toastPopupService: ToastPopupService,
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }



  //Variable for table
  pageUser!: UserResponse[];
  listCategory: Category[] = [];
  selectedCategoryId: number | null = null;


  currUser!: UserResponse



  // Data table related
  displayedColumns: string[] = ['id', 'name', 'username', 'address', 'active', 'role', 'utils'];
  dataSource!: MatTableDataSource<UserResponse>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.loadUser();
    this.loadCurrUser()
  }

  loadCurrUser() {
    this.currUser = this.localStorage?.getItem('user') ? JSON.parse(this.localStorage?.getItem('user') as string) : null;
  }

  loadUser() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.pageUser = response;
        this.dataSource = new MatTableDataSource(response);
        this.ngAfterViewInit();
      }
    });
  }


  deleteUser(user: any) {
    if (confirm('Bạn có chắc chắn vô hiệu hoá người dùng ?')) {
      const tempUser: UserResponse = user as UserResponse;
      this.userService.deleteUser(tempUser.id).subscribe({
        next: (response) => {
          this.toastPopupService.showToast('Vô hiệu hoá người dùng', 'success');
          this.loadUser();
        },
        error: (error) => {
          const ErrorResponse = error as ErrorResponse
          this.toastPopupService.showToast(ErrorResponse.errorMsg, 'error');
        }
      });
    }
  }


  tempUpdateUser = {
    id: null as number | null,
    fullname: '',
    username: '',
    isActive: null as Boolean | null,
    address: '',
    role_id: null as number | null,
  };

  updateUser(user: any) {
    this.tempUpdateUser = {
      id: user.id,
      fullname: user.fullName,
      username: user.phoneNumber,
      isActive: user.isActive,
      address: user.address,
      role_id: user.role.id,
    };
  }

  onEditSubmit(form: any) {
    this.userService.editUser(this.tempUpdateUser).subscribe({
      next: (response) => {
        this.toastPopupService.showToast('Edit user success', 'success');
        this.loadUser();
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
