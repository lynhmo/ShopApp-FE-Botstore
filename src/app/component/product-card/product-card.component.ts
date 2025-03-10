import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;
  stars: number[] = [];

  constructor(
    private router: Router,
  ) { }

  goToProduct(): void {
    this.router.navigate(['/detail-product/' + this.product.id]);
  }
}
