import { OrderDetailResponse } from "./OrderDetailResponse"

export interface OrderResponse {
  orderId: number,
  userId: number,
  fullname: string,
  email: string,
  phoneNumber: string,
  address: string,
  note: string,
  orderDate: string,
  status: string,
  totalMoney: number,
  shippingMethod: string
  shippingAddress: string
  shippingDate: string,
  trackingNumber: string
  paymentMethod: string
  active: boolean,
  orderDetails: OrderDetailResponse[]
}
