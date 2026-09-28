'use client';
import {useRef,useState} from 'react';
import {bySlug,type Row} from '@/lib/calculators';
import {fmt} from '@/lib/format';
const nf=new Intl.NumberFormat('id-ID');
const clean=(s:string)=>{s=s.replace(/[^\d,]/g,'');const k=s.indexOf(',');if(k>=0)s=s.slice(0,k+1)+s.slice(k+1).replace(/,/g,'');return s.slice(0,18)};
const disp=(s:string)=>{const [i,d]=s.split(',');const g=i?nf.format(Number(i)):d!==undefined?'0':'';return d===undefined?g:`${g},${d}`};
export default function Calculator({slug}:{slug:string}){
 const c=bySlug(slug)!;
 const init=()=>Object.fromEntries(c.f.map(f=>[f.k,String(f.d).replace('.',',')]));
 const [v,setV]=useState<Record<string,string>>(init);
 const [er,setEr]=useState<Record<string,string>>({});
 const [res,setRes]=useState<Row[]|string|null>(null);
 const box=useRef<HTMLDivElement>(null);
 const go=(e:React.FormEvent)=>{e.preventDefault();
  const n:Record<string,number>={},E:Record<string,string>={};
  for(const f of c.f){const s=v[f.k],x=Number(s.replace(',','.'));if(!s||!isFinite(x))E[f.k]=`Isi ${f.l.toLowerCase()} dengan angka, contoh: ${disp(String(f.d).replace('.',','))}.`;else n[f.k]=x}
  setEr(E);const first=Object.keys(E)[0];
  if(first){setRes(null);document.getElementById(`f-${first}`)?.focus();return}
  const r=c.run(n);setRes(r.some(x=>!isFinite(x[1]))?'Hasil tidak dapat dihitung. Periksa input (pembagi tidak boleh 0).':r);
  requestAnimationFrame(()=>box.current?.scrollIntoView({block:'nearest',behavior:'smooth'}))};
 const last=Array.isArray(res)?res[res.length-1]:null;
 return(<form onSubmit={go} noValidate className="rounded-xl border border-slate-200 p-4 shadow-sm sm:p-6">
  <div className="grid gap-4 sm:grid-cols-2">{c.f.map(f=>{const id=`f-${f.k}`,rp=f.u==='Rp';return(<div key={f.k}>
   <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-900">{f.l}</label>
   <div className="fld" data-err={er[f.k]?'':undefined}>{rp&&<span>Rp</span>}
    {f.o?<select id={id} value={v[f.k]} onChange={e=>setV({...v,[f.k]:e.target.value})}>{f.o.map(([l,x])=><option key={l} value={x}>{l}</option>)}</select>
    :<input id={id} inputMode="decimal" autoComplete="off" value={disp(v[f.k])} placeholder={disp(String(f.d).replace('.',','))} aria-invalid={!!er[f.k]} aria-describedby={er[f.k]?`e-${f.k}`:undefined} onChange={e=>setV({...v,[f.k]:clean(e.target.value)})}/>}
    {f.u&&!rp&&<span>{f.u}</span>}</div>
   {er[f.k]&&<p id={`e-${f.k}`} className="mt-1 text-sm text-red-700">{er[f.k]}</p>}</div>)})}</div>
  <div className="mt-6 flex gap-3"><button type="submit" className="min-h-12 flex-1 rounded-lg bg-brand px-6 text-base font-semibold text-white hover:bg-brand-dark sm:flex-none sm:px-10">Hitung</button>
   <button type="button" onClick={()=>{setV(init());setEr({});setRes(null)}} className="min-h-12 rounded-lg border border-slate-300 px-6 text-base font-medium text-slate-800 hover:bg-slate-50">Reset</button></div>
  <div ref={box} aria-live="polite" className="scroll-mt-20">{typeof res==='string'?<p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">{res}</p>
   :last&&res&&<div className="mt-5 rounded-xl border border-brand/30 bg-brand-soft p-4 sm:p-5"><p className="text-xs font-bold tracking-widest text-brand-dark">HASIL PERHITUNGAN</p>
    <p className="mt-2 break-words text-3xl font-extrabold text-slate-900 sm:text-4xl">{fmt(last[1],last[2])}</p><p className="text-sm text-slate-700">{last[0]}</p>
    {res.length>1&&<dl className="mt-4 divide-y divide-brand/15 border-t border-brand/20">{res.map(([l,x,t])=><div key={l} className="flex justify-between gap-4 py-2.5"><dt className="text-slate-700">{l}</dt><dd className="text-right font-semibold text-slate-900">{fmt(x,t)}</dd></div>)}</dl>}</div>}</div></form>);
}
