import { OrderForm } from "./OrderForm";

export default function TransactionForm(props: {wallet_id: string, asset_id: string, type: "BUY" | "SELL"}) {
  return (
    <OrderForm 
            wallet_id={props.wallet_id}
            asset_id={props.asset_id}
            type={props.type}
            />
  )
}