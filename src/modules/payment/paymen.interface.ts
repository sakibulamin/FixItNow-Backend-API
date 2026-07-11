
export interface IPayment {
  bookingId: string;
  transactionId?: string;
  amount: number;
  method?: string;
  provider: "STRIPE" | "SSLCOMMERZ";
  status?: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  paidAt?: Date;
}

export interface IPaymentUpdate {
  status?: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  method?: string;
  transactionId?: string;
  paidAt?: Date;
}