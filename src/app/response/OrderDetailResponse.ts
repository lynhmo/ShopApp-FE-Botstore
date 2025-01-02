import { ProductResponse } from "./ProductResponse"

export interface OrderDetailResponse {
  product: ProductResponse
  price: number
  numberOfProducts: number
  totalMoney: number
}
