import type {Metadata} from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import {SITE} from '@/lib/format';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(SITE),title:{default:'Hitungin – Kalkulator Online Gratis Indonesia',template:'%s | Hitungin'},description:'Kalkulator online gratis: gaji, THR, cicilan, HPP, harga jual, kebutuhan semen, cat, dan lainnya. Tanpa login, hasil instan.'};
export const viewport={width:'device-width',initialScale:1};
export default function Root({children}:{children:React.ReactNode}){
 return(<html lang="id"><body>
  <a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Lewati ke konten</a>
  <Header/>{children}
  <footer className="mt-16 border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-600"><p><Link href="/kalkulator" className="font-medium text-brand underline">Semua Kalkulator</Link></p><p className="mt-2">© {new Date().getFullYear()} Hitungin. Hasil kalkulator bersifat estimasi.</p></footer></body></html>);
}
