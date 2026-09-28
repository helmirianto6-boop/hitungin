const nf=new Intl.NumberFormat('id-ID',{maximumFractionDigits:2});
export const fmt=(v:number,t:string)=>!isFinite(v)?'-':t==='rp'?'Rp '+nf.format(Math.round(v)):t==='%'?nf.format(v)+' %':nf.format(v)+(t?' '+t:'');
export const SITE=process.env.NEXT_PUBLIC_SITE_URL||'https://hitungin.id';
