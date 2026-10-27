import React, { useState } from 'react';
import { Bed, Users, Check, MessageCircle, Phone, Sparkles, ZoomIn } from 'lucide-react';
import { RoomType } from '../types/hotel';
import { ROOMS, HOTEL_INFO } from '../data/hotelData';

interface RoomListProps {
  selectedBranch: 'all' | 'cabang-1' | 'cabang-2';
  onSelectBranch: (branchId: 'all' | 'cabang-1' | 'cabang-2') => void;
  onOpenInquiry: (branchId: 'cabang-1' | 'cabang-2', roomName?: string) => void;
  onSelectPhoto: (imageUrl: string, title: string, caption: string) => void;
}

export const RoomList: React.FC<RoomListProps> = ({
  selectedBranch,
  onSelectBranch,
  onOpenInquiry,
  onSelectPhoto
}) => {
  const [filter, setFilter] = useState<'all' | 'cabang-1' | 'cabang-2'>(selectedBranch);

  // Sync if parent changed
  React.useEffect(() => {
    setFilter(selectedBranch);
  }, [selectedBranch]);

  const displayedRooms = ROOMS.filter(room => {
    if (filter === 'all') return true;
    return room.branchId === filter;
  });

  return (
    <section id="kamar" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <span>Daftar Pilihan</span>
            <span aria-hidden="true">·</span>
            <span>Tarif Transparan</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            Daftar Tipe Kamar &amp; Fasilitas
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Semua kamar terjaga kebersihannya, dilengkapi pendingin ruangan (AC), kasur empuk dengan linen higienis, serta kamar mandi dalam. Tanpa perantara atau biaya platform tersembunyi.
          </p>

          {/* Interactive Filter Control */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-lg text-xs font-medium text-stone-700 mt-3">
            <button
              onClick={() => {
                setFilter('all');
                onSelectBranch('all');
              }}
              className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-[#3B0D14] text-white shadow font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Semua Tipe Kamar ({ROOMS.length})
            </button>
            <button
              onClick={() => {
                setFilter('cabang-1');
                onSelectBranch('cabang-1');
              }}
              className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                filter === 'cabang-1'
                  ? 'bg-[#3B0D14] text-white shadow font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Cabang 1 - Jl. Rajawali ({ROOMS.filter(r => r.branchId === 'cabang-1').length})
            </button>
            <button
              onClick={() => {
                setFilter('cabang-2');
                onSelectBranch('cabang-2');
              }}
              className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                filter === 'cabang-2'
                  ? 'bg-[#3B0D14] text-white shadow font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Cabang 2 - Pusat Kota ({ROOMS.filter(r => r.branchId === 'cabang-2').length})
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {displayedRooms.map((room) => {
            const isCabang1 = room.branchId === 'cabang-1';

            return (
              <div
                key={room.id}
                className="bg-white rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Room Image Container */}
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden group">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Overlay Branch & Zoom */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-medium rounded bg-[#2D0A11]/90 text-amber-200 border border-amber-600/30">
                        {isCabang1 ? 'Cabang 1 (Jl. Rajawali)' : 'Cabang 2 (Pusat Kota)'}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectPhoto(room.image, room.name, room.description)}
                      className="absolute bottom-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded text-xs flex items-center gap-1 transition"
                      title="Perbesar Foto"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Lihat Foto</span>
                    </button>
                  </div>

                  {/* Room Details */}
                  <div className="p-5 space-y-3">
                    
                    {/* Header & Price */}
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                        {room.name}
                      </h3>
                      
                      {/* Price per night */}
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="font-serif text-2xl font-bold text-amber-900 tabular-nums">
                          {room.formattedPrice}
                        </span>
                        <span className="text-xs text-stone-500 font-sans">
                          / malam
                        </span>
                      </div>
                    </div>

                    {/* Metadata line (No pill boxes, clean typographic separators) */}
                    <div className="flex items-center gap-2 text-xs text-stone-600 pb-2 border-b border-stone-100">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-stone-400" />
                        <span>{room.bedType}</span>
                      </span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        <span>{room.capacity}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {room.description}
                    </p>

                    {/* Amenities list */}
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                        Fasilitas Kamar:
                      </span>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {room.features.slice(0, 5).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {room.features.length > 5 && (
                          <li className="text-[11px] text-stone-500 italic pl-5.5">
                            + {room.features.length - 5} fasilitas lainnya
                          </li>
                        )}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="p-5 pt-0 border-t border-stone-100 mt-4 space-y-2">
                  <button
                    onClick={() => onOpenInquiry(room.branchId, room.name)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#3B0D14] to-[#55141E] hover:brightness-110 active:scale-[0.99] text-amber-200 text-xs font-semibold rounded transition shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
                    <span>Tanya Ketersediaan Kamar Ini</span>
                  </button>

                  <div className="text-center">
                    <span className="text-[11px] text-stone-500">
                      Konfirmasi instan langsung oleh resepsionis 24 jam
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Extra Bed & Breakfast Notice Box */}
        <div className="mt-12 bg-white rounded-lg border border-amber-800/20 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                Informasi Tambahan &amp; Kasur Tambahan
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Extra Bed Hanya Rp 100.000 / Malam
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Butuh tempat tidur tambahan untuk keluarga atau rombongan? Hotel Ladena menyediakan fasilitas kasur tambahan (extra bed) bersih dan nyaman siap pakai.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded border border-stone-200 space-y-2 text-xs">
              <p className="font-semibold text-stone-900">
                Catatan Mengenai Sarapan:
              </p>
              <p className="text-stone-600">
                {HOTEL_INFO.breakfastNote}
              </p>
              <p className="text-[11px] text-amber-900 font-medium">
                Resepsionis kami dengan senang hati merekomendasikan spot sarapan terlezat di sekitar hotel (Mie Aceh, Nasi Gurih, Lontong Sayur, &amp; Kopi Aceh).
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
