'use client';
import { Navbar } from 'flowbite-react';
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';


export default function DefaultNavbar(){
  const pathname = usePathname();
  const params = useParams();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='http://localhost:3000'>
        <Image 
          alt='Logo fullcycle'
          className='mr-3 h-6 sm:h9'
          src="/logo.png"
          width={37}
          height={40}
          />
        <span className='self-center whitespace-nowrap text-xl font-semibold text-white'>FullCycle Invest</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          active={pathname === `/${params.wallet_id}`}
          as={Link}
          href={`/${params.wallet_id}`}
          >
          Home
        </Navbar.Link>
        <Navbar.Link href='#'>Ativos</Navbar.Link>
      </Navbar.Collapse>
      <div className='flex md:order-2 text-white'>Olá {params.wallet_id}</div>
    </Navbar>
  )
}