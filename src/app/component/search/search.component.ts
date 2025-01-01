import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {



  selectProduct(product: any) {
    window.location.href = `/detail-product/${product.id}`;
  }

  onSearch() {
    throw new Error('Method not implemented.');
  }
  searchControl = new FormControl('');
  products: any[] = [];
  isLoading = false;

  constructor(private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(600), // Add delay of 300ms
        distinctUntilChanged(),
        switchMap((query) => {
          if (query) {
            this.isLoading = true;
            return this.productService.searchProducts(query);
          } else {
            this.products = [];
            return [];
          }
        })
      )
      .subscribe({
        next: (results: any[]) => {
          this.isLoading = false;
          this.products = results;
        },
        error: () => {
          this.isLoading = false;
          this.products = [];
        },
      });
  }
}
