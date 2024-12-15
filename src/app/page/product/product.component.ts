import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product.model'
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,

  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  currentPage = 1;
  totalPages!: number
  products: Product[] = [

  ]


  // Lấy ra sản phẩm
  loadProducts(): void {
    this.productService.getAllPageable(this.currentPage - 1, 8).subscribe(
      data => {
        console.log(data);
        console.log(data.content);
        this.products = data.content;
        this.totalPages=data.totalPages
      }
    );
  }


  onPageChange(newPage: number): void {
    this.currentPage = newPage; // Update currentPage in the parent
    this.loadProducts();
  }

}
