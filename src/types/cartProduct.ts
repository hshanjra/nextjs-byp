import { Product } from "./product";

export type CartProduct = Product & { qty: number };

export type Cart = {
  items: {
    key: {
      product: Product;
      qty: 1;
      shippingPrice: 25;
    };
  };
  totalQty: 0;
  subTotal: 0;
  tax: 0;
  totalShippingPrice: 0;
  totalAmount: 0;
  stateCode: "";
};
