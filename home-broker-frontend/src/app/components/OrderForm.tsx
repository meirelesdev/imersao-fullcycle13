import { revalidateTag } from "next/cache";
import { Label, TextInput, Button } from "./flowbite-components";

async function initTransaction(formData: FormData) {
  'use server';
  const shares = formData.get('shares');
  const price = formData.get('price');
  const asset_id = formData.get('asset_id');
  const wallet_id = formData.get('wallet_id');
  const type = formData.get('type');
  const response = await fetch(`http://app:3000/wallets/${wallet_id}/orders`, {
      headers: {
        "Content-Type": "application/json"
      },
    method: 'POST',
    body: JSON.stringify({
      shares,
      price,
      asset_id,
      type,
      status: "OPEN",
      Asset: {
        id: asset_id,
        Symbol: "PETR4",
        price: 30
      }
    })
  })
  revalidateTag(`orders-wallet-${wallet_id}`)
  return await response.json()
}

export function OrderForm(props: {wallet_id: string, asset_id: string, type: 'BUY' | 'SELL'}) {
  return (
    <div>
      <form action={initTransaction}>
        <input name="asset_id" type="hidden" defaultValue={props.asset_id} />
        <input name="wallet_id" type="hidden" defaultValue={props.wallet_id} />
        <input name="type" type="hidden" defaultValue={props.type} />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shares" value="Quantidade" />
          </div>
          <TextInput 
            id="shares"
            name="shares"
            required
            type="number"
            min={1}
            step={1}
            defaultValue={1}
          />
        </div>
        <br/>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Preço R$" />
          </div>
          <TextInput 
            id="price"
            name="price"
            required
            type="number"
            min={1}
            step={0.1}
          />
        </div>
        <br/>
        <Button type="submit" color={props.type === "BUY"? "green": "red"}>
          Confirmar {props.type === "BUY" ? "compra": "venda"}
        </Button>
      </form>
    </div>
  )
}