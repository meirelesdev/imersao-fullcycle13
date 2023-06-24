import { NextRequest, NextResponse } from "next/server"

export async function GET(_request: NextRequest,
  { params }: { params: { wallet_id: string } }
) {
  const response = await fetch(`http://app:3000/wallets/${params.wallet_id}/assets`, {
    cache: 'no-cache', //processamento sempre dinamico
    next: {
      //revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
      revalidate: 1,
    },
  })
  return NextResponse.json(await response.json())
}