import { Component, Input } from '@angular/core';
import { Product } from '../../component/product-card/product'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products: Product[] = [
    {
      title: 'test1',
      rating: 1,
      price: 0,
      discount: 0,
      description: '',
      stock: 0,
      type: '',
      category: '',
      isDeleted: false,
      imageUrl: 'assets/image/slider/slider2.jpg'
    },
    {
      title: 'test1',
      rating: 1,
      price: 1,
      discount: 1,
      description: '',
      stock: 1,
      type: '',
      category: '',
      isDeleted: false,
      imageUrl: 'assets/image/slider/slider1.jpg'
    },
    {
      title: 'test1',
      rating: 2,
      price: 2,
      discount: 2,
      description: '',
      stock: 2,
      type: '',
      category: '',
      isDeleted: false,
      imageUrl: 'assets/image/slider/slider4.jpg'
    },
    {
      title: 'test1',
      rating: 2,
      price: 2,
      discount: 2,
      description: '',
      stock: 2,
      type: '',
      category: '',
      isDeleted: false,
      imageUrl: 'assets/image/slider/slider6.jpg'
    },
    {
      title: 'test1',
      rating: 2,
      price: 2,
      discount: 2,
      description: '',
      stock: 2,
      type: '',
      category: '',
      isDeleted: false,
      imageUrl: 'assets/image/slider/slider5.jpg'
    }
  ]



}
