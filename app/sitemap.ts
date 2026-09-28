import type {MetadataRoute} from 'next';
import {CALCS} from '@/lib/calculators';
import {SITE} from '@/lib/format';
export default function sitemap():MetadataRoute.Sitemap{return[{url:SITE,priority:1},{url:`${SITE}/kalkulator`,priority:0.9},...CALCS.map(c=>({url:`${SITE}/kalkulator/${c.slug}`,priority:0.8}))]}
