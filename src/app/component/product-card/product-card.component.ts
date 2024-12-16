import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  implements OnInit {
  @Input() product: any;
  stars: number[] = [];

  constructor(
    private router: Router,
  ){}



  goToProduct(): void {
    this.router.navigate(['/detail-product/'+this.product.id]);
  }

  ngOnInit(): void {
    console.log(this.product);
    // const fullStars = Math.floor(this.product.rating);
    // this.stars = Array(fullStars).fill(0);
  }
}
