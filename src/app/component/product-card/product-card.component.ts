import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  implements OnInit {
  @Input() product: any;
  stars: number[] = [];

  ngOnInit(): void {
    console.log(this.product);

    // const fullStars = Math.floor(this.product.rating);
    // this.stars = Array(fullStars).fill(0);
  }
}
