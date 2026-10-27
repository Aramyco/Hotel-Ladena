import React from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { HOTEL_INFO, BRANCHES } from '../data/hotelData';

interface FooterProps {
  onOpenInquiry: (branchId?: 'cabang-1' | 'cabang-2') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  return (
    <footer className="bg-[#1F070C] text-stone-300 border-t border-[#3E1019] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#350C15]">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#D4AF37] text-[#20060B] font-serif font-bold flex items-center justify-center">
                L
              </div>
              <span className="font-serif text-lg font-bold text-amber-200">
                HOTEL LADENA
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Penginapan nyaman, bersih, dan strategis di pusat kota Kutacane, Kabupaten Aceh Tenggara. Pilihan tepat untuk perjalanan dinas, transit, maupun liburan keluarga.
            </p>
            <div className="pt-1">
              <span className="text-[11px] text-amber-300 font-medium">
                Resepsionis Siap Melayani 24 Jam
              </span>
            </div>
          </div>

          {/* Col 2: Cabang 1 */}
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide">
              Cabang 1 (Jl. Rajawali)
            </h4>
            <p className="text-stone-400 text-xs">
              Jalan Rajawali, Kutacane, Kab. Aceh Tenggara, Aceh
            </p>
            <p className="text-stone-400 text-xs">
              Kamar Superior I s/d V, parkir aman, suasana tenang.
            </p>
            <a
              href={HOTEL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-white transition pt-1"
            >
              <span>Petunjuk Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 3: Cabang 2 */}
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide">
              Cabang 2 (Pusat Kota)
            </h4>
            <p className="text-stone-400 text-xs">
              Pusat Kota Kutacane, Kab. Aceh Tenggara, Aceh
            </p>
            <p className="text-stone-400 text-xs">
              Kawasan komersial, perbankan, dan sentra kuliner kota.
            </p>
            <button
              onClick={() => onOpenInquiry('cabang-2')}
              className="text-amber-300 hover:text-white transition pt-1 text-left block"
            >
              Tanya Kamar Cabang 2 →
            </button>
          </div>

          {/* Col 4: Quick Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide">
              Kontak Langsung
            </h4>
            <div className="space-y-1.5 text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href={`tel:${HOTEL_INFO.phoneRaw}`} className="hover:text-white tabular-nums">
                  {HOTEL_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href={HOTEL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp Resepsionis
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenInquiry()}
                className="w-full py-2 px-3 bg-[#3B0D14] hover:bg-[#50121C] text-amber-200 border border-[#551622] rounded text-center transition"
              >
                Kirim Pesan Tanya Kamar
              </button>
            </div>
          </div>

        </div>

        {/* Quiet copyright strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Hotel Ladena Kutacane. Semua hak dilindungi undang-undang.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Kutacane · Aceh Tenggara</span>
            <span aria-hidden="true">·</span>
            <a href="#beranda" className="hover:text-amber-300 transition">Kembali ke Atas ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
