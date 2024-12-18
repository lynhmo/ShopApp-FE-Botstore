import { OrderDetail } from "./OrderDetail";
import { Product } from "./product.model";

export interface OrderDetailProduct extends OrderDetail {
  product: Product;
}
