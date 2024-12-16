import { Component } from '@angular/core';

@Component({
  selector: 'product-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  categories = ['Lego', 'Minecraft', 'Marvel']; // Example categories
  priceRange = 500000; // Default price range

  // Calculate the percentage for the slider's gradient
  get pricePercentage(): number {
    return (this.priceRange / 1000000) * 100;
  }

  onCategoryChange(category: string) {
    // console.log(`Category changed: ${category}`);
  }

  onPriceChange() {
    // console.log(`Selected price: ${this.priceRange}`);
  }
}
