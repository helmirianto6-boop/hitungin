'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Search from './Search';
export default function Header(){
 const home=usePathname()==='/';const l='rounded-md px-2.5 py-3 hover:text-brand';
 return(<header className="border-b border-slate-200 bg-white md:sticky md:top-0 md:z-30"><div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 px-4 py-1 md:py-2">
  <Link href="/" className="py-2 text-xl font-extrabold text-brand">Hitungin</Link>
  <nav aria-label="Menu utama" className="ml-auto flex items-center text-sm font-medium text-slate-700 md:ml-4">
   <Link href="/" className={`${l} hidden md:block`}>Beranda</Link><Link href="/kalkulator" className={l}>Semua Kalkulator</Link>
   <Link href="/kalkulator#kategori" className={l}>Kategori</Link><Link href="/#tentang" className={`${l} hidden md:block`}>Tentang</Link></nav>
  {!home&&<div className="order-last w-full pb-2 md:order-none md:ml-auto md:w-80 md:pb-0"><Search/></div>}</div></header>);
}
