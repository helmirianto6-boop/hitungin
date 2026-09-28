import type {Metadata} from 'next';
import Link from 'next/link';
import CalcCard from '@/components/CalcCard';
import {CALCS,CATS} from '@/lib/calculators';
export const metadata:Metadata={title:'Semua Kalkulator Online Gratis',description:'Daftar lengkap kalkulator Hitungin: keuangan, bangunan, jualan & UMKM, F&B, dan matematika.',alternates:{canonical:'/kalkulator'}};
export default function All(){
 const cats=Object.entries(CATS).filter(([k])=>CALCS.some(c=>c.cat===k));
 return(<main id="konten" className="mx-auto max-w-6xl px-4 py-8"><h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Semua Kalkulator</h1>
  <p className="mt-2 text-slate-700">Pilih kalkulator sesuai kebutuhanmu. Semua gratis dan tanpa login.</p>
  <nav id="kategori" aria-label="Kategori" className="mt-5 flex flex-wrap gap-2">{cats.map(([k,c])=><Link key={k} href={`#${k}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-medium hover:border-brand hover:bg-brand-soft"><span aria-hidden>{c.i}</span>{c.n}</Link>)}</nav>
  {cats.map(([k,c])=><section key={k} id={k} aria-labelledby={`h-${k}`} className="mt-10"><h2 id={`h-${k}`} className="h2">{c.i} {c.n}</h2><div className="grid gap-2 md:grid-cols-2">{CALCS.filter(x=>x.cat===k).map(x=><CalcCard key={x.slug} c={x}/>)}</div></section>)}</main>);
}
