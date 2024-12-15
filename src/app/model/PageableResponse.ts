export interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  numberOfElements: number; // page có bao nhiêu enity. do page cuối thường thiếu sản phẩm
  totalElements: number;
  size: number;
  number: number; // current page
  first: boolean;
  last: boolean;
}
