import { Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../components/flowbite-components";
import { Order } from "../models"
import PageTitle from "./PageTitle";
import { isHomeBrokerClosed } from "../utils";

async function getOrders(wallet_id: string): Promise<Order[]> {
const response = await fetch(
  `http://app:3000/wallets/${wallet_id}/orders`, 
{
        cache: 'no-cache',
        next: {
          tags: [`orders-wallet-${wallet_id}`],
          revalidate: isHomeBrokerClosed() ? 60 * 60 : 5
          // revalidate: 5
        }
      }
      );
  return response.json()
}

export default async function MyOrders(props:{wallet_id: string}) {
const orders = await getOrders(props.wallet_id);
return (
  <div>
      <PageTitle title="Minhas ordens" />
      <Table>
        <TableHead>
          <TableHeadCell>asset_id</TableHeadCell>
          <TableHeadCell>quant.</TableHeadCell>
          <TableHeadCell>preço</TableHeadCell>
          <TableHeadCell>tipo</TableHeadCell>
          <TableHeadCell>status</TableHeadCell>

        </TableHead>
        <TableBody>
          {orders.map((order) =>(
            <TableRow className="border-gray bg-gray-800" key={order.id}>
              <TableCell className="whitespace-nowrap font-medium text-white">
                {order.Asset.id}
              </TableCell>
              <TableCell >
                {order.shares}
              </TableCell>
              <TableCell >
                {order.price}
              </TableCell>
              <TableCell >
                <Badge>{order.type}</Badge>
              </TableCell>
              <TableCell >
                <Badge>{order.status}</Badge>
              </TableCell>
            </TableRow>
            )
            )}
        </TableBody>
      </Table>
  </div>
)
}