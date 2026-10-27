import React, { useState } from 'react';
import { ZoomIn, Camera, Eye } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/hotelData';

interface GalleryProps {
  onSelectPhoto: (imageUrl: string, title: string, caption: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectPhoto }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Kamar', 'Fasilitas', 'Tarif Resmi', 'Cabang 1', 'Cabang 2'];

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => {
    if (activeCategory === 'Semua') return true;
    if (activeCategory === 'Cabang 1') return photo.branchId === 'cabang-1' || photo.branchId === 'all';
    if (activeCategory === 'Cabang 2') return photo.branchId === 'cabang-2' || photo.branchId === 'all';
    return photo.category === activeCategory;
  });

  return (
    <section id="galeri" className="py-16 bg-[#F6F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <span>Dokumentasi Foto Asli</span>
            <span aria-hidden="true">·</span>
            <span>Kondisi Real</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            Galeri Foto Hotel Ladena
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Lihat langsung suasana kamar tidur, penataan perabot, fasilitas pendingin AC, teko listrik, kulkas mini, dan bukti tarif resmi hotel.
          </p>

          {/* Categories Tab Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#3B0D14] text-amber-100 shadow-sm font-semibold'
                    : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo.imageUrl, photo.title, photo.caption)}
              className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium">
                  <Eye className="w-4 h-4 text-amber-300" />
                  <span>Lihat Ukuran Penuh</span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-[#2D0A11]/85 text-amber-200 rounded">
                    {photo.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-serif text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
