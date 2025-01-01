import { SuccessResponse } from './../../../../response/SuccessResponse';
import { ToastPopupService } from './../../../../service/toast-popup.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit, AfterViewInit {


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastPopupService: ToastPopupService
  ) { }


  pageProduct!: Product[];
  listCategory: Category[] = [];
  selectedCategoryId: number | null = null;
  displayedColumns: string[] = ['select', 'id', 'name', 'price', 'is_deleted', 'thumbnail', 'utils'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.loadProduct();
    this.loadCategory();
  }


  loadProduct() {
    this.productService.getAllPageable(0, 100, 1).subscribe(
      (response) => {
        this.pageProduct = response.content;
        this.dataSource = new MatTableDataSource(response.content);
        this.ngAfterViewInit();
      }
    );
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.listCategory = response;
      }
    })
  }

  product = {
    name: '',
    price: null,
    thumbnail: null,
    description: '',
    categoryId: null,
  };

  handleFileInput(event: any) {
    this.product.thumbnail = event.target.files[0];
  }

  onSubmit(form: any) {
    if (form.valid) {

      if (this.product.thumbnail == null || this.product.price == null || this.product.categoryId == null) {
        this.toastPopupService.showToast('Data missing', 'error');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('price', this.product.price);
      formData.append('thumbnail', this.product.thumbnail);
      formData.append('description', this.product.description);
      formData.append('categoryId', this.product.categoryId);


      this.productService.saveProduct(formData).subscribe({
        next: (response) => {
          this.toastPopupService.showToast('Add product success', 'success');
          this.loadProduct();
        },
        error: (error) => {
          console.error(error);
          this.toastPopupService.showToast(error, 'error');
        }
      });
      form.reset();
    } else {
      this.toastPopupService.showToast('Form is invalid', 'error');
    }
  }

  deleteProduct(product: any) {
    const tempProduct: Product = product as Product;
    this.productService.deleteProduct(tempProduct.id).subscribe({
      next: (response) => {
        this.toastPopupService.showToast('Delete product success', 'success');
        this.loadProduct();
      },
      error: (error) => {
        const SuccessResponse = error.error as SuccessResponse;
        this.toastPopupService.showToast(SuccessResponse.message, 'error');
      }
    });
  }


  tempUpdateProduct = {
    id: null as number | null,
    name: '',
    price: null as number | null,
    thumbnail: null as File | null,
    isDeleted: null as Boolean | null,
    description: '',
    category_id: null as number | null,
  };

  updateProduct(product: any) {
    const tempProduct: Product = product as Product;
    const [metadata, base64String] = tempProduct.thumbnail.split(',');
    const mimeType = metadata.match(/data:(.*);base64/)?.[1];

    if (!mimeType) {
      console.error('Invalid Base64 data');
      return;
    }

    // Convert base64 to binary data
    const binaryString = atob(base64String);
    const binaryData = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i);
    }

    // Create a File instance
    const fileName = 'image.jpg';
    const file = new File([binaryData], fileName, { type: mimeType });

    this.tempUpdateProduct = {
      id: tempProduct.id,
      name: tempProduct.name,
      price: tempProduct.price,
      isDeleted: tempProduct.is_deleted,
      thumbnail: file,
      description: tempProduct.description,
      category_id: tempProduct.category_id,
    }

  }

  onEditSubmit(form: any) {
    console.log(form.value);
    this.productService.updateProduct(form.value).subscribe({
      next: (response) => {
        this.toastPopupService.showToast('Update product success', 'success');
        this.loadProduct();
      },
      error: (error) => {
        console.error(error);
        this.toastPopupService.showToast(error, 'error');
      }
    });
  }

  formatToVietnameseDong(amount: number): string {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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

  selection = new SelectionModel<Product>(true, []);

  isMoreThan2Selected(): boolean {
    return this.selection.selected.length > 1;
  }

  isDeleteALL(): boolean {
    return this.selection.selected.length == this.dataSource?.data.length;
  }

  deleteSelected() {
    const ids: number[] = this.selectedProductList.map(product => product.id);
    this.productService.deleteManyProducts(ids).subscribe({
      next: (response) => {
        this.toastPopupService.showToast('Delete product success', 'success');
        this.loadProduct();
      },
      error: (error) => {
        console.error(error);
        this.toastPopupService.showToast(error, 'error');
      }
    });
  }
  deleteAllSelected() {
    confirm('Are you sure to delete all selected products?') ? this.deleteSelected() : null;
  }

  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }



  selectedProductList: Product[] = [];


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      console.log('ALL: ' + this.isAllSelected());

      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {

      this.selectedProductList = this.selection.selected; //////////////////////////////////////

      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    this.selectedProductList = this.selection.selected; //////////////////////////////////////
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}


