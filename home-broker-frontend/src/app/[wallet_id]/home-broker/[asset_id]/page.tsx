import { ChartComponent } from "../../../components/ChartComponent";
import MyOrders from "../../../components/MyOrders";
import PageTitle from "../../../components/PageTitle";
import TransactionForm from "../../../components/TransactionForm";
import { TabGroup, TabItem, Card } from "../../../components/flowbite-components";
import { HiArrowUp, HiShoppingCart } from "../../../components/react-icons/hi";


export default async function HomeBrockerPage({params}:{params: {wallet_id: string, asset_id: string}}) {
  return (
    <main className="flex flex-grow flex-col container mx-auto p-2" >
      <PageTitle title={`Home Broker - ${params.asset_id}`} />
    <div className="grid grid-cols-5 flex-grow gap-2 mt-2">
      <div className="col-span-2">
        <div>
        <Card theme={{
                root: {
                  children: "flex h-full flex-col justify-center gap-4 py-4 px-2"
                }
          }}>
          <TabGroup aria-label="Default tabs" style="pills" >
            <TabItem active title="Comprar" icon={HiShoppingCart}>
              <TransactionForm wallet_id={params.wallet_id} asset_id={params.asset_id} type="BUY" />
            </TabItem>
            <TabItem  title="Venda" icon={HiArrowUp}>
              <TransactionForm wallet_id={params.wallet_id} asset_id={params.asset_id} type="SELL" />
            </TabItem>
          </TabGroup>
        </Card>
        </div>
        <div className="mt-2">
        <Card theme={{
                root: {
                  children: "flex h-full flex-col justify-center gap-4 py-4 px-2"
                }
          }}>
          <MyOrders wallet_id={params.wallet_id}/>
        </Card>
        </div>
      </div>
      <div className="col-span-3 flex flex-grow">
        <ChartComponent header="Asset 1 - R$ 100"/>
      </div>
    </div>
    </main>
  )
}