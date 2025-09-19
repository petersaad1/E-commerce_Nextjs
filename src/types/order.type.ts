import { product } from './products.type';

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: product;
}

export interface Order {
  _id: string;
  id: number;
  isPaid: boolean;
  createdAt: string;
  totalOrderPrice: number;
  cartItems: OrderItem[];
  user?: string;
  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
  };
  paymentMethodType?: string;
  updatedAt?: string;
}

export interface OrdersResponse {
  results?: number;
  orders?: Order[];
  data?: Order[];
}