import MyWallet from "../components/MyWallet";
import PageTitle from "../components/PageTitle";

export default async function HomePage({params}:{params: {wallet_id: string}}) {
  return (
    <main className="container mx-auto px-2">
      <PageTitle title="Meus investimentos"/>
      <MyWallet wallet_id={params.wallet_id}/>
    </main>
  )
}