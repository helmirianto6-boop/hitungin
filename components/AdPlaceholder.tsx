// Ganti isi komponen ini dengan slot AdSense setelah disetujui. min-height mencegah layout shift.
export default function AdPlaceholder({className=''}:{className?:string}){
 return <div aria-hidden className={`flex min-h-[100px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-300 ${className}`}>Ruang iklan</div>;
}
