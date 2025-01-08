import { OrderDetailService } from 'src/app/service/orderDetail.service';
import { AddProductToOrderRequest } from './../../model/AddProductToOrderRequest';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { DOCUMENT } from '@angular/common';
import { ProductResponse } from 'src/app/response/ProductResponse';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  private readonly PENDING_ORDER = 'pending_order';
  localStorage?: Storage

  pendingOrderId: number | null = null;
  productId!: number; // ID extracted from URL
  product!: Product;  // Product details fetched from API
  isLoading = true;
  category!: Category;
  ProductList!: ProductResponse[]


  thumbnail!: string
  productName!: string
  categoryName!: string
  price!: number
  inputQuantity: number = 1
  description!: string
  categoryID!: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private orderDetailService: OrderDetailService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('productID');
      if (id) {
        this.productId = +id;
        this.loadProductDetails();
      }
    });
    this.description = this.product?.description
  }

  loadListProduct(categoryId: number) {
    this.productService.getSameCategory(categoryId).subscribe({
      next: (value) => {
        console.log(value);
        this.ProductList = value
      }
    })
  }




  loadProductDetails(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (data) => {
        this.product = data; // Assign data to product
        if (this.product.thumbnail && !this.product.thumbnail.startsWith('data:image')) {
          this.product.thumbnail = `data:image/jpeg;base64,${this.product.thumbnail}`;
        }

        this.loadCategory(this.product.category_id)
        this.loadListProduct(this.product.category_id)
        this.thumbnail = this.product.thumbnail
        this.productName = this.product.name
        this.price = this.product.price


        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err); // Log the error
        this.isLoading = false;
      }
    });
  }

  loadCategory(categoryID: number) {
    this.categoryService.getCategory(categoryID).subscribe({
      next: (data) => {
        this.category = data;
        this.categoryName = this.category.name
      },
      error: (err) => {
        console.error('API Error:', err); // Log the error
      }
    });
  }


  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }

  get formattedPrice(): string {
    return this.formatPrice(this.price);
  }


  // Số lượng mua
  receiveInputData(data: number) {
    this.inputQuantity = data
  }

  getPendingOrderId(): void {
    this.pendingOrderId = this.localStorage?.getItem(this.PENDING_ORDER)
      ? Number(this.localStorage.getItem(this.PENDING_ORDER))
      : null;
  }


  addToCart() {
    this.getPendingOrderId()
    if (this.pendingOrderId == null) {
      this.router.navigate(['/login']);
      throw new Error('Order ID is null');
    }
    const requestBody: AddProductToOrderRequest = {
      order_id: this.pendingOrderId,
      product_id: this.productId,
      number_of_product: this.inputQuantity
    }
    this.orderDetailService.addOrderDetail(requestBody).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.error('API Error:', err); // Log the error
      }
    })
    window.location.reload();
  }
}
