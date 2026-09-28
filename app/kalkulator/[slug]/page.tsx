import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Calculator from '@/components/Calculator';
import CalcCard from '@/components/CalcCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import {CALCS,CATS,bySlug,related} from '@/lib/calculators';
import {fmt,SITE} from '@/lib/format';
type P={params:Promise<{slug:string}>};
export const dynamicParams=false;
export const generateStaticParams=()=>CALCS.map(c=>({slug:c.slug}));
export async function generateMetadata({params}:P):Promise<Metadata>{const c=bySlug((await params).slug);if(!c)return{};
 return{title:`${c.name} Online Gratis`,description:`${c.desc} Gratis, tanpa login, lengkap dengan rumus dan contoh perhitungan.`,alternates:{canonical:`/kalkulator/${c.slug}`},openGraph:{title:c.name,description:c.desc,url:`/kalkulator/${c.slug}`,locale:'id_ID'}}}
export default async function Page({params}:P){
 const c=bySlug((await params).slug);if(!c)notFound();
 const cat=CATS[c.cat];
 const ex=c.run(Object.fromEntries(c.f.map(f=>[f.k,f.d])));
 const note=c.cat==='bgn'?'Kebutuhan aktual dapat berbeda tergantung material, metode pengerjaan, dan kondisi lapangan.':'Aturan dan kebijakan yang berlaku dapat berbeda.';
 const faq=[[`Apakah ${c.name} ini gratis?`,'Ya, gratis tanpa login. Semua perhitungan dilakukan langsung di browser Anda.'],[`Seberapa akurat hasil ${c.name}?`,c.cat==='bgn'?`Hasil merupakan estimasi berdasarkan asumsi yang ditampilkan. ${note}`:'Hasil merupakan estimasi berdasarkan rumus yang ditampilkan. Aturan, tarif, atau kebijakan yang berlaku bisa berbeda, jadi gunakan sebagai perkiraan.']];
 const ld=[{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Beranda','/'],[cat.n,`/kalkulator#${c.cat}`],[c.name,`/kalkulator/${c.slug}`]].map(([n,u],i)=>({'@type':'ListItem',position:i+1,name:n,item:SITE+u}))},
  {'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}];
 return(<main id="konten" className="mx-auto max-w-6xl px-4 py-5 md:py-8">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
  <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600"><ol className="flex flex-wrap items-center gap-x-2">
   <li><Link href="/" className="hover:text-brand hover:underline">Beranda</Link></li><li aria-hidden>›</li>
   <li><Link href={`/kalkulator#${c.cat}`} className="hover:text-brand hover:underline">{cat.n}</Link></li><li aria-hidden>›</li><li aria-current="page" className="font-medium text-slate-900">{c.name}</li></ol></nav>
  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]"><div className="min-w-0 space-y-10">
   <div className="space-y-6"><header><h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{c.name}</h1><p className="mt-2 text-slate-700">{c.desc}</p></header>
    <Calculator slug={c.slug}/>
    <p className="text-sm text-slate-600">Catatan: hasil merupakan estimasi berdasarkan asumsi yang digunakan. {note}</p></div>
   <AdPlaceholder/>
   <section aria-labelledby="cara"><h2 id="cara" className="h2">Cara menghitung</h2><ol className="list-decimal space-y-1 pl-5 text-slate-700"><li>Isi semua kolom yang tersedia.</li><li>Tekan tombol <b>Hitung</b>.</li><li>Lihat hasil di kartu hasil. Tekan <b>Reset</b> untuk mengulang.</li></ol><p className="mt-3 break-words text-slate-700"><b>Rumus:</b> {c.fm}</p></section>
   <section aria-labelledby="contoh"><h2 id="contoh" className="h2">Contoh perhitungan</h2><p className="break-words text-slate-700">Dengan input: {c.f.map(f=>`${f.l} ${f.o?f.o.find(o=>o[1]===f.d)![0]:f.u==='Rp'?fmt(f.d,'rp'):fmt(f.d,f.u||'')}`).join(', ')}.</p>
    <dl className="mt-3 divide-y divide-slate-200 rounded-lg bg-slate-50 px-4">{ex.map(([l,v,t])=><div key={l} className="flex justify-between gap-4 py-2.5"><dt className="text-slate-700">{l}</dt><dd className="text-right font-semibold text-slate-900">{fmt(v,t)}</dd></div>)}</dl></section>
   <section aria-labelledby="faq"><h2 id="faq" className="h2">Pertanyaan umum</h2><div className="space-y-2">{faq.map(([q,a])=><details key={q} className="rounded-lg border border-slate-200 px-4"><summary className="min-h-12 cursor-pointer py-3 font-medium text-slate-900">{q}</summary><p className="pb-3 text-slate-700">{a}</p></details>)}</div></section>
   <section aria-labelledby="rel"><h2 id="rel" className="h2">Kalkulator terkait</h2><div className="grid gap-2 sm:grid-cols-2">{related(c).map(r=><CalcCard key={r.slug} c={r}/>)}</div></section>
  </div><aside aria-label="Iklan" className="hidden lg:block"><div className="sticky top-20"><AdPlaceholder className="min-h-[600px]"/></div></aside></div></main>);
}
