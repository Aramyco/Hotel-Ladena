import { Branch, RoomType, GalleryPhoto, Landmark } from '../types/hotel';

export const HOTEL_INFO = {
  name: 'Hotel Ladena',
  tagline: 'Kenyamanan Istirahat Terbaik di Pusat Kota Kutacane',
  description: 'Hotel Ladena menghadirkan akomodasi bersih, nyaman, dan strategis di pusat kota Kutacane, Aceh Tenggara. Dengan dua cabang pilihan, kami siap menyambut perjalanan dinas, liburan keluarga, maupun transit perjalanan Anda.',
  phoneDisplay: '0852 6227 4700',
  phoneRaw: '085262274700',
  whatsappRaw: '6285262274700',
  whatsappUrl: 'https://wa.me/6285262274700',
  mapsUrl: 'https://maps.app.goo.gl/sGjJhJdneeZgEpLdA',
  city: 'Kutacane, Kab. Aceh Tenggara',
  province: 'Aceh',
  checkIn: '14.00 WIB',
  checkOut: '12.00 WIB',
  breakfastNote: 'Kami Tidak Menyiapkan Sarapan Pagi (Tersedia teko listrik di kamar & dekat dengan beragam sentra kuliner khas Kutacane di pusat kota).',
};

export const BRANCHES: Branch[] = [
  {
    id: 'cabang-1',
    name: 'Hotel Ladena 1 (Jl. Rajawali)',
    shortName: 'Cabang 1 (Jl. Rajawali)',
    locationTag: 'Pusat Kota Kutacane',
    address: 'Jalan Rajawali, Kutacane, Kab. Aceh Tenggara, Aceh',
    phone: '0852 6227 4700',
    whatsapp: '6285262274700',
    mapsUrl: 'https://maps.app.goo.gl/sGjJhJdneeZgEpLdA',
    description: 'Cabang utama dengan suasana asri, tenang, dan sangat dekat dengan pusat perkantoran serta jalan protokol Kutacane. Dilengkapi pilihan kamar Superior lengkap dengan kulkas mini dan teko pemanas.',
    heroImage: '/assets/aistudio/1_ef08b4c2.webp',
    roomCount: '5 Tipe Kamar',
    distanceToCenter: '0 Menit dari Pusat Kota',
    features: [
      'Lokasi Tenang di Pusat Kota',
      'Area Parkir Kendaraan Aman',
      'Pilihan Kamar King Bed & Lemari Luas',
      'Kulkas Mini & Teko Pemanas (Tipe Superior I)',
      'Resepsionis Ramah 24 Jam'
    ]
  },
  {
    id: 'cabang-2',
    name: 'Hotel Ladena 2 (Pusat Kota)',
    shortName: 'Cabang 2 (Pusat Kota)',
    locationTag: 'Kawasan Komersial & Bisnis',
    address: 'Pusat Kota Kutacane, Kab. Aceh Tenggara, Aceh',
    phone: '0852 6227 4700',
    whatsapp: '6285262274700',
    mapsUrl: 'https://maps.app.goo.gl/sGjJhJdneeZgEpLdA',
    description: 'Cabang kedua yang berada di jantung perputaran niaga dan kuliner Kutacane. Sangat ideal bagi tamu dinas, pebisnis, atau rombongan keluarga yang menginginkan akses cepat ke segala sudut kota.',
    heroImage: '/assets/aistudio/3_8ed06f82.webp',
    roomCount: 'Pilihan Superior & Twin Bed',
    distanceToCenter: 'Kawasan Sentra Bisnis & Kuliner',
    features: [
      'Akses Mudah ke Fasilitas Publik & Bank',
      'Pilihan Twin Bed Bersih & Nyaman',
      'Pendingin Ruangan (AC) Dingin Optimal',
      'Kamar Mandi Dalam Bersih & Higienis',
      'Bebas Ribet - Langsung Kontak Resepsionis'
    ]
  }
];

export const ROOMS: RoomType[] = [
  // Cabang 1 Rooms (Based on official tariff board)
  {
    id: 'c1-superior-1',
    branchId: 'cabang-1',
    name: 'Superior Room I',
    price: 400000,
    formattedPrice: 'Rp 400.000',
    bedType: '1 King / Double Bed Nyaman',
    capacity: '2 Orang Dewasa',
    image: '/assets/aistudio/1_ef08b4c2.webp',
    isPopular: true,
    description: 'Kamar terbaik dengan fasilitas terlengkap. Dilengkapi kulkas mini, teko listrik untuk kopi/teh, meja kerja/rias, kursi santai rotan, dan pendingin ruangan AC sejuk.',
    features: [
      'Pendingin Ruangan (AC)',
      'TV Layar Datar',
      'Kulkas Mini Pribadi',
      'Teko Pemanas Air Listrik & Cangkir',
      'Meja Rias & Kursi Rotan Santai',
      'Kamar Mandi Dalam dengan Shower',
      'Handuk Bersih & Perlengkapan Mandi',
      'Air Mineral Kemasan'
    ]
  },
  {
    id: 'c1-superior-2',
    branchId: 'cabang-1',
    name: 'Superior Room II',
    price: 350000,
    formattedPrice: 'Rp 350.000',
    bedType: '1 Double Bed Luas',
    capacity: '2 Orang Dewasa',
    image: '/assets/aistudio/2_5084574d.webp',
    description: 'Kamar luas dengan perabot kayu klasik elegan, lemari pakaian besar berpintu cermin, meja rias panjang, kursi santai, dan suasana istirahat yang sangat tenang.',
    features: [
      'Pendingin Ruangan (AC)',
      'TV Layar Datar',
      'Lemari Pakaian Besar dengan Cermin',
      'Meja Rias Kayu & Cermin Lebar',
      'Sepasang Kursi Santai',
      'Kamar Mandi Dalam Bersih',
      'Handuk Bersih & Perlengkapan Mandi',
      'Air Mineral'
    ]
  },
  {
    id: 'c1-superior-3',
    branchId: 'cabang-1',
    name: 'Superior Room III',
    price: 300000,
    formattedPrice: 'Rp 300.000',
    bedType: '1 Double Bed / 2 Twin Bed',
    capacity: '2 Orang Dewasa',
    image: '/assets/aistudio/3_8ed06f82.webp',
    description: 'Pilihan favorit untuk kenyamanan istirahat maksimal dengan harga terjangkau. Ruangan sejuk, bersih, dan higienis dengan tempat tidur empuk berlinen putih.',
    features: [
      'Pendingin Ruangan (AC)',
      'TV Layar Datar',
      'Meja Samping & Stopkontak',
      'Kamar Mandi Dalam',
      'Handuk Bersih',
      'Air Mineral'
    ]
  },
  {
    id: 'c1-superior-4',
    branchId: 'cabang-1',
    name: 'Superior Room IV',
    price: 250000,
    formattedPrice: 'Rp 250.000',
    bedType: '1 Double Bed',
    capacity: '1 - 2 Orang Dewasa',
    image: '/assets/aistudio/2_5084574d.webp',
    description: 'Kamar ekonomis nyaman dengan pendingin ruangan, kamar mandi dalam, dan tempat tidur empuk berkualitas untuk istirahat setelah seharian beraktivitas.',
    features: [
      'Pendingin Ruangan (AC)',
      'TV Layar Datar',
      'Kamar Mandi Dalam',
      'Handuk & Sabun',
      'Air Mineral'
    ]
  },
  {
    id: 'c1-superior-5',
    branchId: 'cabang-1',
    name: 'Superior Room V',
    price: 200000,
    formattedPrice: 'Rp 200.000',
    bedType: '1 Double / Single Bed',
    capacity: '1 - 2 Orang',
    image: '/assets/aistudio/1_ef08b4c2.webp',
    description: 'Pilihan paling hemat dengan standar kebersihan Hotel Ladena yang terjaga. Sangat cocok untuk perjalanan hemat, urusan cepat, atau transit.',
    features: [
      'Pendingin Ruangan / Kipas Angin Nyaman',
      'Tempat Tidur Bersih',
      'Kamar Mandi Dalam',
      'Handuk & Air Mineral'
    ]
  },

  // Cabang 2 Rooms
  {
    id: 'c2-superior-deluxe',
    branchId: 'cabang-2',
    name: 'Superior Deluxe Room (Cabang 2)',
    price: 400000,
    formattedPrice: 'Rp 400.000',
    bedType: '1 King / Double Bed Nyaman',
    capacity: '2 Orang Dewasa',
    image: '/assets/aistudio/1_ef08b4c2.webp',
    isPopular: true,
    description: 'Kamar representatif di Cabang 2 pusat kota dengan dekorasi rapi, pendingin ruangan dingin optimal, TV, meja kerja, dan kamar mandi dalam.',
    features: [
      'Pendingin Ruangan (AC)',
      'TV Layar Datar',
      'Meja Kerja & Kursi',
      'Teko Pemanas Air (Permintaan Resepsionis)',
      'Kamar Mandi Dalam dengan Shower',
      'Handuk Bersih & Amenities',
      'Akses Langsung ke Pusat Niaga'
    ]
  },
  {
    id: 'c2-superior-twin',
    branchId: 'cabang-2',
    name: 'Superior Twin Bed Room (Cabang 2)',
    price: 350000,
    formattedPrice: 'Rp 350.000',
    bedType: '2 Single Bed Terpisah',
    capacity: '2 Orang Dewasa',
    image: '/assets/aistudio/3_8ed06f82.webp',
    description: 'Dirancang khusus untuk rekan kerja, teman perjalanan, atau keluarga dengan dua tempat tidur terpisah yang nyaman dan berlinen putih higienis.',
    features: [
      '2 Single Bed Terpisah',
      'Pendingin Ruangan (AC)',
      'TV Layar Datar',
      'Meja & Stopkontak di Setiap Ranjang',
      'Kamar Mandi Dalam Bersih',
      'Handuk Bersih Masing-Masing Tamu'
    ]
  },
  {
    id: 'c2-superior-standard',
    branchId: 'cabang-2',
    name: 'Superior Standard Room (Cabang 2)',
    price: 250000,
    formattedPrice: 'Rp 250.000',
    bedType: '1 Double Bed',
    capacity: '1 - 2 Orang',
    image: '/assets/aistudio/2_5084574d.webp',
    description: 'Pilihan kamar standar berpendingin ruangan dengan kasur empuk dan fasilitas esensial yang lengkap untuk kenyamanan tidur Anda.',
    features: [
      'Pendingin Ruangan (AC)',
      'TV Layar Datar',
      'Kamar Mandi Dalam',
      'Handuk & Air Mineral'
    ]
  },
  {
    id: 'c2-economy',
    branchId: 'cabang-2',
    name: 'Economy Room (Cabang 2)',
    price: 200000,
    formattedPrice: 'Rp 200.000',
    bedType: '1 Double Bed',
    capacity: '1 - 2 Orang',
    image: '/assets/aistudio/1_ef08b4c2.webp',
    description: 'Kamar ekonomis hemat di lokasi sangat strategis pusat kota Kutacane. Bersih, aman, dan praktis.',
    features: [
      'Tempat Tidur Bersih',
      'Pendingin Ruangan / Kipas',
      'Kamar Mandi Dalam',
      'Air Mineral'
    ]
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    branchId: 'cabang-1',
    title: 'Superior Room I - Fasilitas Lengkap',
    category: 'Kamar',
    imageUrl: '/assets/aistudio/1_ef08b4c2.webp',
    caption: 'Kamar Superior Room I di Cabang 1 dilengkapi kulkas mini, teko elektrik, cangkir, meja rias & sepasang kursi rotan santai.'
  },
  {
    id: 'gal-2',
    branchId: 'cabang-1',
    title: 'Superior Room II - Lemari & Meja Rias Klasik',
    category: 'Kamar',
    imageUrl: '/assets/aistudio/2_5084574d.webp',
    caption: 'Kamar Superior Room II dengan perabot kayu elegan, lemari pakaian cermin besar, dan tempat tidur empuk berseprai rapi.'
  },
  {
    id: 'gal-3',
    branchId: 'cabang-2',
    title: 'Superior Twin Bed Room',
    category: 'Kamar',
    imageUrl: '/assets/aistudio/3_8ed06f82.webp',
    caption: 'Kamar Twin Bed berpendingin AC dengan dua ranjang nyaman terpisah dan guling serta bantal berkualitas tinggi.'
  },
  {
    id: 'gal-4',
    branchId: 'all',
    title: 'Papan Tarif Resmi Hotel Ladena',
    category: 'Tarif Resmi',
    imageUrl: '/assets/aistudio/price_b68c3ce4.jpg',
    caption: 'Daftar tarif resmi Hotel Ladena Jl. Rajawali Kutacane. Transparan dan tanpa biaya tersembunyi.'
  },
  {
    id: 'gal-5',
    branchId: 'cabang-1',
    title: 'Detail Fasilitas Teh & Kulkas Mini',
    category: 'Fasilitas',
    imageUrl: '/assets/aistudio/1_ef08b4c2.webp',
    caption: 'Kenyamanan ekstra di kamar dengan adanya fasilitas pemanas air, air mineral, handuk bersih, dan lemari es mini.'
  },
  {
    id: 'gal-6',
    branchId: 'cabang-2',
    title: 'Suasana Kamar Bersih & Tenang',
    category: 'Suasana',
    imageUrl: '/assets/aistudio/3_8ed06f82.webp',
    caption: 'Pencahayaan alami dan tirai gelap (blackout curtains) untuk istirahat malam yang berkualitas dan privasi terjaga.'
  }
];

export const NEARBY_LANDMARKS: Landmark[] = [
  {
    name: 'Masjid Agung At-Taqwa Kutacane',
    distance: '± 3 Menit',
    type: 'Landmark Ikonik',
    description: 'Masjid kebanggaan masyarakat Aceh Tenggara dengan arsitektur megah dan taman asri.'
  },
  {
    name: 'Pusat Perkantoran Pemkab Aceh Tenggara',
    distance: '± 4 Menit',
    type: 'Pusat Pemerintahan',
    description: 'Akses cepat ke kantor bupati, dinas-dinas pemerintahan, dan instansi daerah.'
  },
  {
    name: 'Sentra Kuliner & Pasar Kutacane',
    distance: '± 2 Menit',
    type: 'Kuliner & Belanja',
    description: 'Deretan warung kopi khas Aceh, aneka rumah makan Minang, kuliner malam, dan pasar buah.'
  },
  {
    name: 'Pintu Gerbang TNGL & Ketambe Rafting',
    distance: '± 35 Menit',
    type: 'Wisata Alam Leuser',
    description: 'Titik awal petualangan melihat orangutan liar Leuser dan arung jeram Sungai Alas.'
  }
];

export const HOTEL_AMENITIES = [
  {
    title: 'Lokasi Inti Pusat Kota',
    description: 'Dekat dengan segala fasilitas penting di Kutacane, hemat waktu dan mudah kemana saja.',
  },
  {
    title: 'Pendingin Ruangan (AC) Dingin',
    description: 'Semua kamar pilihan dilengkapi AC terawat untuk kenyamanan tidur yang optimal.',
  },
  {
    title: 'Kamar Mandi Dalam Bersih',
    description: 'Shower air bersih mengalir lancar, handuk dicuci higienis, dan sabun mandi disediakan.',
  },
  {
    title: 'Area Parkir Kendaraan Aman',
    description: 'Parkir mobil dan sepeda motor tamu aman di area properti hotel.',
  },
  {
    title: 'Resepsionis 24 Jam',
    description: 'Layanan check-in ramah kapan pun Anda tiba di Kutacane, siang maupun malam.',
  },
  {
    title: 'Bebas Ribet Tanpa Online Booking',
    description: 'Cukup telepon atau kirim pesan WhatsApp, kamar langsung dikonfirmasi oleh resepsionis.',
  }
];
