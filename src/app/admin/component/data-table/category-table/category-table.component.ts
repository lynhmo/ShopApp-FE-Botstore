import { ToastPopupService } from './../../../../service/toast-popup.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { ErrorResponse } from 'src/app/response/ErrorResponse';

@Component({
  selector: 'category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit, AfterViewInit {
  constructor(
    private categoryService: CategoryService,
    private toastPopupService: ToastPopupService
  ) { }

  listCategory: Category[] = [];
  selectedCategoryId: number | null = null;


  displayedColumns: string[] = ['id', 'name', 'is_deleted', 'utils'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.loadCategory();
  }


  loadCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.listCategory = response;
        this.dataSource = new MatTableDataSource(response);
        this.ngAfterViewInit();
      }
    })
  }

  onSubmit(form: any) {
    if (form.valid) {

      this.categoryService.addCategory(this.addCategory.name).subscribe({
        next: (response) => {
          this.toastPopupService.showToast('Thêm danh mục thành công', 'success');
          this.loadCategory();
        },
        error: (error) => {
          console.error(error);
          this.toastPopupService.showToast(error, 'error');
        }
      });

    } else {
      this.toastPopupService.showToast('Thêm danh mục thất bại', 'error');
    }
  }

  onDelete(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe({
      next: (response) => {
        this.toastPopupService.showToast('Xoá danh mục thành công', 'success');
        this.loadCategory();
      },
      error: (error) => {
        const SuccessResponse = error.error as ErrorResponse
        this.toastPopupService.showToast(SuccessResponse.errorMsg, 'error');
      }
    });
  }

  addCategory = {
    name: ''
  }

  updateCateogy = {
    id: null as number | null,
    name: '',
    isDeleted: null as Boolean | null,
  };

  onUpdate(category: Category) {
    this.updateCateogy = category
  }

  onEditSubmit(form: any) {

    if (this.updateCateogy.id == null) {
      throw Error("ID trống")
    }

    this.categoryService.updateCategory(this.updateCateogy.id, this.updateCateogy.name).subscribe({
      next: (response) => {
        this.toastPopupService.showToast('Cập nhật danh mục thành công', 'success');
        this.loadCategory();
      },
      error: (error) => {
        console.error(error);
        this.toastPopupService.showToast(error, 'error');
      }
    });
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

  addData() {
  }
}
