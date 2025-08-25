import type { Product } from '../types'

const img = (id: number) => `https://picsum.photos/seed/ecom-${id}/800/600`

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Headphones X100',
    brand: 'Sonic',
    price: 2199,
    rating: 4.6,
    image: img(1),
    category: 'Electronics',
    stock: 42,
    description: 'Aktif gürültü engelleme, 40 saat pil, Bluetooth 5.3.'
  },
  {
    id: 'p2',
    name: 'Smartwatch Pro 2',
    brand: 'Pulse',
    price: 3499,
    rating: 4.4,
    image: img(2),
    category: 'Electronics',
    stock: 30,
    description: 'AMOLED ekran, EKG, GPS, suya dayanıklı (5 ATM).'
  },
  {
    id: 'p3',
    name: 'Minimal Sneakers',
    brand: 'Stride',
    price: 1299,
    rating: 4.3,
    image: img(3),
    category: 'Fashion',
    stock: 58,
    description: 'Hafif EVA taban, nefes alan kumaş, günlük kullanım.'
  },
  {
    id: 'p4',
    name: 'Classic Denim Jacket',
    brand: 'Indigo',
    price: 999,
    rating: 4.1,
    image: img(4),
    category: 'Fashion',
    stock: 17,
    description: 'Dayanıklı denim, regular fit, dört cepli tasarım.'
  },
  {
    id: 'p5',
    name: 'Ceramic Cookware Set (6 pcs)',
    brand: 'Chefio',
    price: 1899,
    rating: 4.5,
    image: img(5),
    category: 'Home',
    stock: 21,
    description: 'PTFE/PFOA içermez, indüksiyon uyumlu, ısıya dayanıklı kapaklar.'
  },
  {
    id: 'p6',
    name: 'Aroma Diffuser',
    brand: 'CalmAir',
    price: 499,
    rating: 4.2,
    image: img(6),
    category: 'Home',
    stock: 65,
    description: 'Ultrasonik difüzör, 7 renk gece lambası, zamanlayıcı.'
  },
  {
    id: 'p7',
    name: 'Trail Running Backpack 12L',
    brand: 'Peak',
    price: 899,
    rating: 4.7,
    image: img(7),
    category: 'Sports',
    stock: 24,
    description: 'Hidratasyon uyumlu, nefes alan sırt paneli, çoklu cepler.'
  },
  {
    id: 'p8',
    name: 'Adjustable Dumbbells (2×20kg)',
    brand: 'IronFlex',
    price: 2799,
    rating: 4.5,
    image: img(8),
    category: 'Sports',
    stock: 12,
    description: 'Hızlı ağırlık değişimi, kaymaz tutuş, kompakt tasarım.'
  },
  {
    id: 'p9',
    name: 'Vitamin C Serum 30ml',
    brand: 'Glow',
    price: 349,
    rating: 4.2,
    image: img(9),
    category: 'Beauty',
    stock: 80,
    description: '%15 C vitamini, hyaluronik asit, parlaklık etkisi.'
  },
  {
    id: 'p10',
    name: 'Matte Lipstick Duo',
    brand: 'Velvet',
    price: 259,
    rating: 4.0,
    image: img(10),
    category: 'Beauty',
    stock: 36,
    description: 'Yoğun renk, mat bitiş, nemlendirici formül.'
  },
  {
    id: 'p11',
    name: '4K Action Camera',
    brand: 'Voyager',
    price: 2299,
    rating: 4.4,
    image: img(11),
    category: 'Electronics',
    stock: 19,
    description: '4K60, elektronik sabitleme, su geçirmez kasa (30m).'
  },
  {
    id: 'p12',
    name: 'Bluetooth Speaker Mini',
    brand: 'Boom',
    price: 589,
    rating: 4.1,
    image: img(12),
    category: 'Electronics',
    stock: 73,
    description: '12 saat pil, IPX7 su geçirmezlik, stereo eşleşme.'
  },
  {
    id: 'p13',
    name: 'Cotton Oversize Tee',
    brand: 'Softest',
    price: 279,
    rating: 4.3,
    image: img(13),
    category: 'Fashion',
    stock: 100,
    description: '%100 pamuk, oversize kesim, yumuşak dokulu.'
  },
  {
    id: 'p14',
    name: 'Espresso Maker',
    brand: 'Aroma',
    price: 1999,
    rating: 4.4,
    image: img(14),
    category: 'Home',
    stock: 15,
    description: '15 bar basınç, süt köpürtücü, programlanabilir shot.'
  },
  {
    id: 'p15',
    name: 'Yoga Mat Pro',
    brand: 'Zen',
    price: 459,
    rating: 4.6,
    image: img(15),
    category: 'Sports',
    stock: 47,
    description: 'Kaymaz yüzey, 6mm kalınlık, taşıma kayışı dahil.'
  },
  {
    id: 'p16',
    name: 'Hair Dryer Ionic',
    brand: 'Breeze',
    price: 749,
    rating: 4.2,
    image: img(16),
    category: 'Beauty',
    stock: 28,
    description: 'İyon teknolojisi, 3 ısı ayarı, difüzör başlık.'
  },
  {
    id: 'p17',
    name: 'Robot Vacuum S7',
    brand: 'Sweepy',
    price: 6499,
    rating: 4.5,
    image: img(17),
    category: 'Home',
    stock: 8,
    description: 'Lidar haritalama, mop özelliği, akıllı rota planlama.'
  },
  {
    id: 'p18',
    name: 'Gaming Mouse RGB',
    brand: 'Clutch',
    price: 599,
    rating: 4.3,
    image: img(18),
    category: 'Electronics',
    stock: 40,
    description: '26k DPI sensör, 6 programlanabilir tuş, hafif.\n'
  },
  {
    id: 'p19',
    name: 'Air Fryer 4L',
    brand: 'Crispy',
    price: 1899,
    rating: 4.4,
    image: img(19),
    category: 'Home',
    stock: 22,
    description: 'Yağsız pişirme, dijital ekran, 8 ön ayar.'
  },
  {
    id: 'p20',
    name: 'Moisturizing Cream',
    brand: 'Hydra',
    price: 299,
    rating: 4.1,
    image: img(20),
    category: 'Beauty',
    stock: 55,
    description: 'Seramid + gliserin, tüm cilt tipleri için.'
  },
  {
    id: 'p21',
    name: 'Portable Projector',
    brand: 'Castor',
    price: 3299,
    rating: 4.2,
    image: img(21),
    category: 'Electronics',
    stock: 10,
    description: '1080p native, Android TV, Wi‑Fi/BT, 200\" görüntü.'
  },
  {
    id: 'p22',
    name: 'Leather Belt',
    brand: 'Crafted',
    price: 399,
    rating: 4.0,
    image: img(22),
    category: 'Fashion',
    stock: 35,
    description: 'Hakiki deri, mat toka, ayarlanabilir.'
  },
  {
    id: 'p23',
    name: 'Foam Roller',
    brand: 'Recover',
    price: 249,
    rating: 4.3,
    image: img(23),
    category: 'Sports',
    stock: 60,
    description: 'Kas gevşetme, derin doku masajı, orta sertlik.'
  },
  {
    id: 'p24',
    name: 'Scented Candle Set',
    brand: 'Aura',
    price: 329,
    rating: 4.1,
    image: img(24),
    category: 'Home',
    stock: 44,
    description: '3’lü set, lavanta/vanilya/sandal, pamuk fitil.'
  }
]
