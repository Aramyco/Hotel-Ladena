import React from 'react';
import { ZoomIn, Phone, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface TariffSectionProps {
  onOpenInquiry: (branchId?: 'cabang-1' | 'cabang-2', roomName?: string) => void;
  onSelectPhoto: (imageUrl: string, title: string, caption: string) => void;
}

export const TariffSection: React.FC<TariffSectionProps> = ({ onOpenInquiry, onSelectPhoto }) => {
  const tariffs = [
    { name: 'Superior Room I', price: 'Rp. 400.000', note: 'Fasilitas Terlengkap (Kulkas Mini, Teko Listrik, AC, TV)' },
    { name: 'Superior Room II', price: 'Rp. 350.000', note: 'Kamar Luas, Lemari Cermin Besar, Meja Rias & AC' },
    { name: 'Superior Room III', price: 'Rp. 300.000', note: 'Double / Twin Bed Pilihan Nyaman & Bersih' },
    { name: 'Superior Room IV', price: 'Rp. 250.000', note: 'Kamar Ber-AC dengan Tempat Tidur Empuk' },
    { name: 'Superior Room V', price: 'Rp. 200.000', note: 'Pilihan Paling Hemat & Higienis di Pusat Kota' },
    { name: 'Extra Bed', price: 'Rp. 100.000', note: 'Kasur Tambahan Lengkap dengan Bantal & Selimut' },
  ];

  return (
    <section id="tarif" className="py-16 bg-[#260A10] text-stone-100 border-y border-[#3E1019]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <span>Daftar Harga Resmi</span>
            <span aria-hidden="true">·</span>
            <span>Tanpa Biaya Tersembunyi</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FDF6E3]">
            Tarif Resmi Hotel Ladena Kutacane
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Papan tarif resmi yang dipasang di resepsionis. Semua harga transparan dan berlaku sama untuk setiap tamu yang memesan langsung.
          </p>
        </div>

        {/* Content Split: Official Board Photo + Detailed Breakdown Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Official Price Board Image with interactive Zoom */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative rounded-lg overflow-hidden border-2 border-amber-600/40 shadow-2xl bg-[#170508] max-w-sm group">
              <img
                src="/assets/aistudio/price_b68c3ce4.jpg"
                alt="Papan Tarif Resmi Hotel Ladena Kutacane"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              <button
                onClick={() =>
                  onSelectPhoto(
                    '/assets/aistudio/price_b68c3ce4.jpg',
                    'Papan Tarif Resmi Hotel Ladena',
                    'Daftar tarif resmi hotel yang dipasang di meja resepsionis Hotel Ladena Kutacane.'
                  )
                }
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium cursor-pointer"
              >
                <ZoomIn className="w-5 h-5 text-amber-300" />
                <span>Klik untuk Memperbesar Foto</span>
              </button>

              <div className="p-3 bg-[#1C060B] border-t border-[#3B0E17] text-center">
                <span className="text-[11px] text-amber-200/90 font-serif">
                  Dokumen Asli: Papan Tarif Resmi Resepsionis Hotel Ladena
                </span>
              </div>
            </div>
          </div>

          {/* Right: Modern Structured Rate Table */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1C060B] rounded-lg border border-[#3E1019] overflow-hidden shadow-xl">
              
              {/* Header row */}
              <div className="px-6 py-4 bg-gradient-to-r from-[#3D0E18] to-[#260A10] border-b border-[#4A141F] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-amber-200">
                    TARIF HOTEL LADENA
                  </h3>
                  <p className="text-xs text-stone-300">
                    Jalan Rajawali Kutacane, Kab. Aceh Tenggara
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-300 font-mono">
                    Telp: {HOTEL_INFO.phoneDisplay}
                  </span>
                </div>
              </div>

              {/* Table rows */}
              <div className="divide-y divide-[#350C15]">
                {tariffs.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-[#280A11] transition-colors"
                  >
                    <div>
                      <span className="font-medium text-stone-100 text-sm sm:text-base">
                        {item.name}
                      </span>
                      <p className="text-xs text-stone-400">
                        {item.note}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="font-serif font-bold text-lg text-amber-300 tabular-nums">
                        {item.price}
                      </span>
                      <span className="text-xs text-stone-400 ml-1">
                        / malam
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note from Official Board */}
              <div className="p-4 bg-[#140407] border-t border-[#350C15] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
                <span className="italic text-amber-200/80">
                  * Catatan: Kami Tidak Menyiapkan Sarapan Pagi
                </span>
                <span className="font-serif text-stone-300">
                  Terima Kasih Atas Kunjungannya
                </span>
              </div>

            </div>

            {/* Direct Booking Helper strip */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold text-[#1F070B] bg-gradient-to-r from-[#E3C565] via-[#D4AF37] to-[#B89225] hover:brightness-105 active:scale-[0.99] rounded transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan Kamar Sesuai Tarif Resmi</span>
              </button>

              <a
                href={`tel:${HOTEL_INFO.phoneRaw}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 text-xs font-medium text-stone-200 border border-[#4F1521] bg-[#22070D] hover:bg-[#320B13] rounded transition"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="tabular-nums">Hubungi: {HOTEL_INFO.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
