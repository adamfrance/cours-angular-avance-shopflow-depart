export interface OrderProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountedTotal: number;
  thumbnail: string;
}

// Une commande correspond à un panier validé de l'API DummyJSON
export interface Order {
  id: number;
  products: OrderProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface OrderPage {
  carts: Order[];
  total: number;
  skip: number;
  limit: number;
}
