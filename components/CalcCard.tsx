import Link from 'next/link';
import type {Calc} from '@/lib/calculators';
export default function CalcCard({c}:{c:Calc}){
 return <Link href={`/kalkulator/${c.slug}`} className="flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 hover:border-brand hover:bg-brand-soft">
  <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-xl">{c.icon}</span>
  <span className="min-w-0"><span className="block font-semibold text-slate-900">{c.name}</span><span className="block truncate text-sm text-slate-600">{c.desc}</span></span></Link>;
}
