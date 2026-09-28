'use client';
import {useId,useState} from 'react';
import Link from 'next/link';
import {searchCalcs,CATS} from '@/lib/calculators';
export default function Search({big}:{big?:boolean}){
 const id=useId();const [q,setQ]=useState('');
 const t=q.toLowerCase().split(/\s+/).filter(Boolean);const r=searchCalcs(q).slice(0,8);
 return(<div role="search" className="relative w-full text-left">
  <label htmlFor={id} className="sr-only">Cari kalkulator</label>
  <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
  <input id={id} type="search" autoComplete="off" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Escape'&&setQ('')} placeholder="Cari kalkulator gaji, THR, semen, HPP..."
   className={`w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-base placeholder:text-slate-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 ${big?'h-14 shadow-sm':'h-12'}`}/>
  {t.length>0&&<ul className="absolute z-40 mt-1 max-h-[70vh] w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
   {r.length?r.map(c=>{const k=c.kw.split(' ').filter(w=>t.some(x=>w.includes(x))).slice(0,3).join(', ');
    return <li key={c.slug}><Link href={`/kalkulator/${c.slug}`} onClick={()=>setQ('')} className="flex min-h-14 items-center gap-3 px-4 py-2 hover:bg-brand-soft"><span aria-hidden className="text-xl">{c.icon}</span>
     <span className="min-w-0"><span className="block font-semibold text-slate-900">{c.name}</span><span className="block truncate text-sm text-slate-600">{CATS[c.cat].n}{k&&` · ${k}`}</span></span></Link></li>})
   :<li className="px-4 py-3 text-sm text-slate-600">Tidak ada hasil untuk “{q}”. <Link href="/kalkulator" className="font-medium text-brand underline">Lihat semua kalkulator</Link></li>}</ul>}</div>);
}
