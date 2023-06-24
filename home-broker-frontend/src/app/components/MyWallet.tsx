'use client';

import Link from "next/link"
import { Table, TableBody, TableHead, TableCell, TableHeadCell, TableRow } from "../components/flowbite-components"
import { WalletAsset } from "../models"
import { fetcher } from "../utils";
import useSWR from "swr";

// async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]> {
// const response = await fetch(`http://app:3000/wallets/${wallet_id}/assets`,{cache: 'no-store',})
// return response.json()
// }

export default function MyWallet(props:{wallet_id: string}) {
// const walletAssets = await getWalletAssets(props.wallet_id)
const {data: walletAssets, error} = useSWR<WalletAsset[]>(`http://localhost:3001/api/wallets/${props.wallet_id}/assets`, fetcher, {
  fallbackData: [],
  revalidateOnFocus: false,
  revalidateOnReconnect: false
})

if (error) return <div>failed to load</div>
if (!walletAssets) return <div>loading...</div>

return (
  <ul>
    <Table>
      <TableHead>
        <TableHeadCell>Nome</TableHeadCell>
        <TableHeadCell>Preço R$</TableHeadCell>
        <TableHeadCell>Quant.</TableHeadCell>
        <TableHeadCell><span className="sr-only">Comprar/Vender</span></TableHeadCell>
      </TableHead>
      <TableBody className="divide-y">
          {walletAssets.map((walletAsset, key) =>(
            <TableRow 
              className="border-gray-700 bg-gray-800" 
              key={key}>
                <TableCell className="whitespace-nowrap font-medium text-white">
                    {walletAsset.Asset.id} ({walletAsset.Asset.symbol})
                </TableCell>
                <TableCell>{walletAsset.Asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Link 
                    className="font-medium hover:underline text-cyan-500"
                    href={`/${props.wallet_id}/home-broker/${walletAsset.Asset.id}`}>Comprar/Vender</Link>
                </TableCell>
          </TableRow>)
          )}
      </TableBody>
    </Table>
    
  </ul>
)
}