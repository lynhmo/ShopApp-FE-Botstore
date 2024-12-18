export interface Order {
  createAt: string
  updateAt: string
  id: number
  email: string
  address: string
  note: string
  status: string
  active: boolean
  is_deleted: boolean
  user_id: string
  fullname: string
  phone_number: string
  order_date: number
  total_money: number
  shipping_method: string
  shipping_address: string
  shipping_date: string
  tracking_number: string
  payment_method: string

}
