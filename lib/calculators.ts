// Tambah kalkulator baru = tambah 1 objek di array CALCS. Halaman, SEO, sitemap, pencarian & related otomatis.
export type Row=[string,number,string];
export type Field={k:string;l:string;d:number;u?:string;o?:[string,number][]};
export type Calc={slug:string;name:string;cat:string;desc:string;kw:string;icon:string;f:Field[];fm:string;run:(v:Record<string,number>)=>Row[]};
export const CATS:Record<string,{n:string;i:string}>={keu:{n:'Keuangan',i:'💰'},bgn:{n:'Bangunan',i:'🏗️'},umkm:{n:'Jualan & UMKM',i:'🛒'},fnb:{n:'F&B',i:'🍔'},mat:{n:'Matematika',i:'📐'},rmh:{n:'Rumah',i:'🏠'},tools:{n:'Tools',i:'📷'}};
const R=(l:string,v:number,t='rp'):Row=>[l,v,t];
const F=(k:string,l:string,d=0,u?:string):Field=>({k,l,d,u});
const S=(k:string,l:string,o:[string,number][]):Field=>({k,l,d:o[0][1],o});
const C=(x:number)=>Math.ceil(x-1e-9);
const hppRun=(v:Record<string,number>)=>{const t=(v.a+v.b+v.c+v.d)*(1+v.w/100);return[R('Total biaya',t),R('HPP per produk',t/v.q)]};
const hppF=(a:string,b:string,c:string,d:string,q:string)=>[F('a',a,0,'Rp'),F('b',b,0,'Rp'),F('c',c,0,'Rp'),F('d',d,0,'Rp'),F('w','Waste / susut',5,'%'),F('q',q,1)];
const HPPFM='Total biaya = (bahan + kemasan + tenaga kerja + overhead) × (1 + waste%). HPP per produk = total biaya ÷ jumlah produk.';
const mutu:[string,number][]=[['K-175',336],['K-225',371],['K-250',384],['K-300',413]];
export const CALCS:Calc[]=[
{slug:'gaji',name:'Kalkulator Gaji Bersih',cat:'keu',icon:'💵',desc:'Hitung gaji bersih dari gaji pokok, tunjangan, bonus, potongan, BPJS, dan pajak.',kw:'gaji take home pay slip gaji bpjs pajak karyawan',
 f:[F('p','Gaji pokok',5000000,'Rp'),F('t','Tunjangan',0,'Rp'),F('b','Bonus',0,'Rp'),F('x','Potongan lain',0,'Rp'),F('bp','BPJS (% dari gaji pokok + tunjangan)',3,'%'),F('pj','Pajak (% dari gaji kotor)',0,'%')],
 fm:'Gaji kotor = pokok + tunjangan + bonus. Gaji bersih = gaji kotor − (BPJS + pajak + potongan lain). Persentase BPJS dan pajak Anda isi sendiri karena aturan dapat berubah; samakan dengan slip gaji Anda.',
 run:v=>{const k=v.p+v.t+v.b,bp=(v.p+v.t)*v.bp/100,pj=k*v.pj/100,tot=bp+pj+v.x;return[R('Gaji kotor',k),R('BPJS',bp),R('Pajak',pj),R('Total potongan',tot),R('Gaji bersih',k-tot)]}},
{slug:'thr',name:'Kalkulator THR',cat:'keu',icon:'🎁',desc:'Estimasi Tunjangan Hari Raya berdasarkan gaji dan lama bekerja.',kw:'thr tunjangan hari raya lebaran karyawan bonus',
 f:[F('g','Gaji bulanan',5000000,'Rp'),F('m','Masa kerja',6,'bulan')],
 fm:'Masa kerja ≥ 12 bulan: THR = 1 × gaji bulanan. Masa kerja < 12 bulan: THR = masa kerja ÷ 12 × gaji bulanan. Kebijakan perusahaan atau perjanjian kerja bisa berbeda.',
 run:v=>[R('Estimasi THR',v.m>=12?v.g:v.g*v.m/12)]},
{slug:'lembur',name:'Kalkulator Lembur',cat:'keu',icon:'⏰',desc:'Estimasi upah lembur berdasarkan gaji bulanan dan jumlah jam lembur.',kw:'lembur overtime upah jam kerja',
 f:[F('g','Gaji bulanan',5000000,'Rp'),F('j','Jam lembur',2,'jam'),S('h','Jenis hari',[['Hari kerja',0],['Hari libur (5 hari kerja/minggu)',1]])],
 fm:'Upah per jam = gaji bulanan ÷ 173. Hari kerja: jam pertama 1,5×, jam berikutnya 2×. Hari libur: 8 jam pertama 2×, jam ke-9 3×, jam ke-10 dan seterusnya 4×. Asumsi umum; cek aturan perusahaan.',
 run:v=>{const u=v.g/173,j=v.j;const m=v.h?(j<=8?j*2:16+3+Math.max(j-9,0)*4):(j<=1?j*1.5:1.5+(j-1)*2);return[R('Upah per jam',u),R('Estimasi uang lembur',u*m)]}},
{slug:'diskon',name:'Kalkulator Diskon',cat:'keu',icon:'🏷️',desc:'Hitung potongan harga dan harga akhir setelah diskon.',kw:'diskon potongan harga persen sale belanja',
 f:[F('h','Harga awal',250000,'Rp'),F('d','Diskon',20,'%')],fm:'Jumlah diskon = harga awal × diskon%. Harga akhir = harga awal − jumlah diskon.',
 run:v=>[R('Jumlah diskon',v.h*v.d/100),R('Harga setelah diskon',v.h*(1-v.d/100))]},
{slug:'cicilan',name:'Kalkulator Cicilan',cat:'keu',icon:'🏦',desc:'Estimasi cicilan bulanan dengan DP, bunga, dan tenor.',kw:'cicilan kredit angsuran dp bunga tenor kpr motor',
 f:[F('h','Harga barang',15000000,'Rp'),F('dp','DP',3000000,'Rp'),F('b','Bunga flat per tahun',10,'%'),F('t','Tenor',12,'bulan')],
 fm:'Pinjaman = harga − DP. Total bunga = pinjaman × bunga% × tenor ÷ 12 (bunga flat). Cicilan = (pinjaman + bunga) ÷ tenor.',
 run:v=>{const p=v.h-v.dp,b=p*v.b/100*v.t/12;return[R('Jumlah pinjaman',p),R('Cicilan per bulan',(p+b)/v.t),R('Total bunga',b),R('Total pembayaran',p+b)]}},
{slug:'volume-beton',name:'Kalkulator Volume Beton',cat:'bgn',icon:'🧱',desc:'Hitung volume beton dalam m³ untuk lantai, kolom, atau pondasi.',kw:'volume beton kubikasi m3 cor plat lantai',
 f:[F('p','Panjang',5,'m'),F('l','Lebar',4,'m'),F('t','Tinggi / tebal',0.12,'m'),F('w','Waste',5,'%')],fm:'Volume = panjang × lebar × tebal × (1 + waste%).',
 run:v=>[R('Volume bersih',v.p*v.l*v.t,'m³'),R('Volume + waste',v.p*v.l*v.t*(1+v.w/100),'m³')]},
{slug:'kebutuhan-semen',name:'Kalkulator Kebutuhan Semen',cat:'bgn',icon:'🏗️',desc:'Estimasi kebutuhan semen (kg dan sak) untuk volume beton dan mutu tertentu.',kw:'semen sak beton mutu k225 cor',
 f:[F('v','Volume beton',1,'m³'),S('m','Mutu beton (kg semen per m³)',mutu)],fm:'Semen (kg) = volume × kebutuhan semen per m³ (K-175 ≈ 336, K-225 ≈ 371, K-250 ≈ 384, K-300 ≈ 413). 1 sak = 50 kg.',
 run:v=>[R('Kebutuhan semen',v.v*v.m,'kg'),R('Jumlah sak (50 kg)',C(v.v*v.m/50),'sak')]},
{slug:'kebutuhan-pasir',name:'Kalkulator Kebutuhan Pasir',cat:'bgn',icon:'⛱️',desc:'Estimasi kebutuhan pasir untuk beton, pasangan bata, atau plesteran.',kw:'pasir m3 beton plester pasangan',
 f:[F('v','Volume pekerjaan',1,'m³'),S('j','Jenis pekerjaan (m³ pasir per m³)',[['Beton',0.5],['Pasangan bata',0.45],['Plesteran',0.55]])],fm:'Pasir = volume pekerjaan × koefisien pasir. Koefisien: beton 0,5; pasangan bata 0,45; plesteran 0,55 (asumsi umum).',
 run:v=>[R('Kebutuhan pasir',v.v*v.j,'m³')]},
{slug:'kebutuhan-hebel',name:'Kalkulator Kebutuhan Hebel',cat:'bgn',icon:'🧱',desc:'Hitung jumlah bata ringan (hebel) untuk dinding termasuk cadangan.',kw:'hebel bata ringan dinding pintu jendela',
 f:[F('p','Panjang dinding',10,'m'),F('t','Tinggi dinding',3,'m'),S('u','Ukuran hebel (m² per buah)',[['60 × 20 cm',0.12],['60 × 25 cm',0.15]]),F('a','Luas pintu',2,'m²'),F('b','Luas jendela',1.5,'m²'),F('w','Waste',5,'%')],
 fm:'Luas dinding = panjang × tinggi − pintu − jendela. Jumlah = luas ÷ luas per hebel. Cadangan = jumlah × waste%.',
 run:v=>{const l=v.p*v.t-v.a-v.b,n=C(l/v.u),c=C(n*v.w/100);return[R('Luas dinding bersih',l,'m²'),R('Jumlah hebel',n,'pcs'),R('Cadangan',c,'pcs'),R('Total kebutuhan',n+c,'pcs')]}},
{slug:'kebutuhan-keramik',name:'Kalkulator Kebutuhan Keramik',cat:'bgn',icon:'🔲',desc:'Hitung jumlah keramik dan dus untuk lantai ruangan.',kw:'keramik lantai dus ubin',
 f:[F('p','Panjang ruangan',4,'m'),F('l','Lebar ruangan',3,'m'),S('u','Ukuran keramik (m² per buah)',[['40 × 40 cm',0.16],['60 × 60 cm',0.36],['30 × 30 cm',0.09]]),F('i','Isi per dus',6,'pcs'),F('w','Waste',10,'%')],
 fm:'Luas = panjang × lebar. Jumlah = luas ÷ luas per keramik × (1 + waste%). Dus = jumlah ÷ isi per dus.',
 run:v=>{const l=v.p*v.l,n=C(l/v.u*(1+v.w/100));return[R('Luas lantai',l,'m²'),R('Jumlah keramik',n,'pcs'),R('Estimasi dus',C(n/v.i),'dus')]}},
{slug:'kebutuhan-cat',name:'Kalkulator Kebutuhan Cat',cat:'bgn',icon:'🎨',desc:'Estimasi liter dan kaleng cat untuk mengecat dinding.',kw:'cat dinding liter kaleng lapisan',
 f:[F('p','Panjang dinding',5,'m'),F('t','Tinggi',3,'m'),F('n','Jumlah dinding',4),F('x','Luas pintu/jendela',4,'m²'),F('d','Daya sebar cat',10,'m²/liter'),F('l','Jumlah lapisan',2),F('k','Isi per kaleng',5,'liter')],
 fm:'Luas = panjang × tinggi × jumlah dinding − pintu/jendela. Cat (liter) = luas × lapisan ÷ daya sebar.',
 run:v=>{const a=v.p*v.t*v.n-v.x,l=a*v.l/v.d;return[R('Luas area',a,'m²'),R('Kebutuhan cat',l,'liter'),R('Estimasi kaleng',C(l/v.k),'kaleng')]}},
{slug:'hpp',name:'Kalkulator HPP',cat:'umkm',icon:'📦',desc:'Hitung Harga Pokok Produksi per produk dari bahan, kemasan, tenaga kerja, dan overhead.',kw:'hpp harga pokok produksi modal jualan umkm',
 f:hppF('Bahan baku','Kemasan','Tenaga kerja','Overhead','Jumlah produk'),fm:HPPFM,run:hppRun},
{slug:'harga-jual',name:'Kalkulator Harga Jual',cat:'umkm',icon:'💸',desc:'Tentukan harga jual dari HPP dan target keuntungan.',kw:'harga jual markup untung seller online',
 f:[F('h','HPP',20000,'Rp'),F('t','Target keuntungan',30,'%'),F('b','Biaya tambahan per produk',2000,'Rp')],fm:'Harga jual = (HPP + biaya tambahan) × (1 + target%). Margin = keuntungan ÷ harga jual.',
 run:v=>{const m=v.h+v.b,j=m*(1+v.t/100);return[R('Harga jual',j),R('Keuntungan per produk',j-m),R('Margin',(j-m)/j*100,'%')]}},
{slug:'profit',name:'Kalkulator Profit',cat:'umkm',icon:'📈',desc:'Hitung profit per produk dan total dari penjualan.',kw:'profit laba untung penjualan',
 f:[F('m','Harga modal',20000,'Rp'),F('j','Harga jual',30000,'Rp'),F('q','Jumlah terjual',100),F('b','Biaya tambahan total',50000,'Rp')],fm:'Profit per produk = jual − modal. Total profit = profit per produk × jumlah − biaya tambahan.',
 run:v=>{const t=(v.j-v.m)*v.q-v.b;return[R('Profit per produk',v.j-v.m),R('Total profit',t),R('Margin',t/(v.j*v.q)*100,'%')]}},
{slug:'margin',name:'Kalkulator Margin',cat:'umkm',icon:'🧮',desc:'Hitung margin keuntungan dari harga modal dan harga jual.',kw:'margin persen laba markup',
 f:[F('m','Harga modal',20000,'Rp'),F('j','Harga jual',30000,'Rp')],fm:'Profit = jual − modal. Margin = profit ÷ harga jual × 100%. Markup = profit ÷ modal × 100%.',
 run:v=>[R('Profit',v.j-v.m),R('Margin',(v.j-v.m)/v.j*100,'%'),R('Markup',(v.j-v.m)/v.m*100,'%')]},
{slug:'bep',name:'Kalkulator BEP',cat:'umkm',icon:'⚖️',desc:'Hitung titik impas (Break Even Point) dalam unit dan rupiah.',kw:'bep break even point titik impas',
 f:[F('t','Biaya tetap per bulan',5000000,'Rp'),F('j','Harga jual per unit',30000,'Rp'),F('v','Biaya variabel per unit',18000,'Rp')],fm:'BEP unit = biaya tetap ÷ (harga jual − biaya variabel). BEP rupiah = BEP unit × harga jual.',
 run:v=>{const u=C(v.t/(v.j-v.v));return[R('BEP',u,'unit'),R('BEP dalam rupiah',u*v.j)]}},
{slug:'hpp-makanan',name:'Kalkulator HPP Makanan',cat:'fnb',icon:'🍛',desc:'Hitung HPP per porsi makanan dari bahan, kemasan, gas, dan tenaga kerja.',kw:'hpp makanan porsi resep warung katering',
 f:hppF('Bahan makanan','Kemasan / bungkus','Tenaga kerja','Gas, listrik & lainnya','Jumlah porsi'),fm:HPPFM,run:hppRun},
{slug:'hpp-minuman',name:'Kalkulator HPP Minuman',cat:'fnb',icon:'🥤',desc:'Hitung HPP per cup minuman dari bahan, cup, topping, dan tenaga kerja.',kw:'hpp minuman kopi cup boba',
 f:hppF('Bahan minuman (kopi, susu, sirup, es)','Cup, tutup & sedotan','Tenaga kerja','Overhead','Jumlah cup'),fm:HPPFM,run:hppRun},
{slug:'food-cost',name:'Kalkulator Food Cost',cat:'fnb',icon:'🍽️',desc:'Hitung persentase food cost, HPP per porsi, dan margin menu.',kw:'food cost persen menu resto cafe',
 f:[F('h','Total harga bahan',150000,'Rp'),F('q','Jumlah porsi',10),F('j','Harga jual per porsi',25000,'Rp')],fm:'HPP per porsi = total bahan ÷ porsi. Food cost % = HPP per porsi ÷ harga jual × 100%.',
 run:v=>{const h=v.h/v.q;return[R('HPP per porsi',h),R('Food cost',h/v.j*100,'%'),R('Margin per porsi',v.j-h)]}},
{slug:'persentase',name:'Kalkulator Persentase',cat:'mat',icon:'％',desc:'Hitung persen, kenaikan, penurunan, dan perubahan persentase.',kw:'persen persentase kenaikan penurunan',
 f:[S('m','Jenis hitungan',[['A adalah berapa persen dari B',0],['Naikkan A sebesar B%',1],['Turunkan A sebesar B%',2],['Persentase perubahan dari A ke B',3]]),F('a','Nilai A',50),F('b','Nilai B',200)],
 fm:'A dari B: A ÷ B × 100. Naik: A × (1 + B%). Turun: A × (1 − B%). Perubahan: (B − A) ÷ A × 100.',
 run:v=>[v.m===0?R('Hasil',v.a/v.b*100,'%'):v.m===1?R('Hasil',v.a*(1+v.b/100),''):v.m===2?R('Hasil',v.a*(1-v.b/100),''):R('Perubahan',(v.b-v.a)/v.a*100,'%')]},
];
export const bySlug=(s:string)=>CALCS.find(c=>c.slug===s);
export const related=(c:Calc)=>CALCS.filter(x=>x.slug!==c.slug&&x.cat===c.cat).concat(CALCS.filter(x=>x.cat!==c.cat)).slice(0,4);
export const searchCalcs=(q:string)=>{const t=q.toLowerCase().split(/\s+/).filter(Boolean);return t.length?CALCS.filter(c=>t.every(w=>(c.name+' '+c.kw+' '+CATS[c.cat].n).toLowerCase().includes(w))):[]};
