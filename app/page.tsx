import Link from 'next/link';
import Search from '@/components/Search';
import CalcCard from '@/components/CalcCard';
import {CALCS,CATS,bySlug} from '@/lib/calculators';
const POP=['gaji','thr','cicilan','diskon','hpp','harga-jual','kebutuhan-cat','kebutuhan-semen'];
export default function Home(){
 return(<main id="konten">
  <section className="bg-brand-soft px-4 py-10 sm:py-16"><div className="mx-auto max-w-2xl text-center"><h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Semua Kalkulator yang Kamu Butuhkan</h1>
   <p className="mt-3 text-base text-slate-700 sm:text-lg">Hitung gaji, cicilan, kebutuhan bangunan, HPP, harga jual, dan berbagai kebutuhan lainnya dengan cepat dan gratis.</p><div className="mt-6"><Search big/></div></div></section>
  <div className="mx-auto max-w-6xl space-y-12 px-4 pt-10">
   <section aria-labelledby="pop"><h2 id="pop" className="h2">Kalkulator Populer</h2><div className="grid gap-2 md:grid-cols-2">{POP.map(s=><CalcCard key={s} c={bySlug(s)!}/>)}</div></section>
   <section id="kategori" aria-labelledby="kat"><h2 id="kat" className="h2">Kategori</h2><div className="flex flex-wrap gap-2">{Object.entries(CATS).filter(([k])=>CALCS.some(c=>c.cat===k)).map(([k,c])=><Link key={k} href={`/kalkulator#${k}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-medium text-slate-800 hover:border-brand hover:bg-brand-soft"><span aria-hidden>{c.i}</span>{c.n}</Link>)}</div></section>
   <section aria-labelledby="baru"><h2 id="baru" className="h2">Kalkulator Terbaru</h2><div className="grid gap-2 md:grid-cols-2">{CALCS.slice(-6).reverse().map(c=><CalcCard key={c.slug} c={c}/>)}</div></section>
   <section id="tentang" aria-labelledby="ttg" className="max-w-2xl"><h2 id="ttg" className="h2">Mengapa Hitungin?</h2><p className="text-slate-700">Hitungin adalah kumpulan kalkulator online untuk kebutuhan sehari-hari di Indonesia, dari gaji dan cicilan sampai HPP dan bahan bangunan.</p>
    <ul className="mt-3 space-y-1.5 text-slate-700">{['Gratis, tanpa biaya','Mudah digunakan, nyaman di HP','Tanpa login atau daftar akun','Hasil instan, dihitung di perangkatmu'].map(t=><li key={t} className="flex gap-2"><span aria-hidden className="font-bold text-brand">✓</span>{t}</li>)}</ul></section>
  </div></main>);
}
