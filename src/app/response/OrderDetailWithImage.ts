import { ProductResponse } from "./ProductResponse"

export interface OrderDetailWithImage {
  createAt: string
  updateAt: string
  id: number
  price: number
  is_deleted: boolean
  order: any
  product: ProductResponse
  number_of_products: number
  total_money: number
  color: string
}
