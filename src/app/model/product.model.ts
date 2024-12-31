export interface Product {
  createAt: string,
  updateAt: string,
  id: number,
  name: string,
  price: number,
  thumbnail: string;
  description: string,
  is_deleted: boolean,
  category_id: number
}
