import { OrderStatus, OrderType } from "@prisma/client";

export class InitTransactionDto {
  asset_id: string;
  wallet_id: string;
  shares: number;
  price: number;
  type: OrderType;
}

export class InputExecuteTransactionDto {
  order_id: string;
  status: OrderStatus;
  related_investor_id: string;
  broker_transaction_id: string;
  negotiated_shares: number;
  price: number;
}

export type ExecuteTransactionMessage = {
  order_id: string;
  investor_id: string;
  assets_id: string;
  order_type: string;
  status: "OPEN" | "CLOSED";
  partial: number;
  shares: number;
  transactions: {
    transaction_id: string;
    buyer_id: string;
    seller_id: string;
    asset_id: string;
    shares: number;
    price: number;
  }[];
};
