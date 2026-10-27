export interface RoomType {
  id: string;
  branchId: 'cabang-1' | 'cabang-2';
  name: string;
  price: number;
  formattedPrice: string;
  bedType: string;
  capacity: string;
  image: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Branch {
  id: 'cabang-1' | 'cabang-2';
  name: string;
  shortName: string;
  locationTag: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  description: string;
  heroImage: string;
  roomCount: string;
  distanceToCenter: string;
  features: string[];
}

export interface GalleryPhoto {
  id: string;
  branchId: 'all' | 'cabang-1' | 'cabang-2';
  title: string;
  category: 'Kamar' | 'Fasilitas' | 'Tarif Resmi' | 'Suasana';
  imageUrl: string;
  caption: string;
}

export interface Landmark {
  name: string;
  distance: string;
  type: string;
  description: string;
}
