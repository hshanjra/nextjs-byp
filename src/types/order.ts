export type Order = {
  _id: string;
  userId: string;
  orderId: string;
  orderItems: [];
  shippingAddress: {};
  billingAddress: {};
  paymentMethod: string;
  paymentResponse: {
    txnId: string;
    status: string;
  };
  taxPrice: number;
  totalShippingPrice: number;
  totalQty: number;
  orderStatus: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  createdAt: string;
};
