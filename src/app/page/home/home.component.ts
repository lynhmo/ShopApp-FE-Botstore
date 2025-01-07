import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/response/ProductResponse';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private productService: ProductService,

  ) { }



  ngOnInit(): void {
    this.loadNewProducts()
  }


  newProductList!: ProductResponse[]
  cheapProductList!: ProductResponse[]
  popularProductList!: ProductResponse[]

  loadNewProducts(): void {
    this.productService.getNewProduct().subscribe({
      next: (value) => {
        console.log(value);
        this.newProductList = value
      },
    })
    this.productService.getCheapProduct().subscribe({
      next: (value) => {
        console.log(value);
        this.cheapProductList = value
      },
    })
    this.productService.getPopularProduct().subscribe({
      next: (value) => {
        console.log(value);
        this.popularProductList = value
      },
    })
  }


}
