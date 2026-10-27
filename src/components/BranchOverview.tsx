import React from 'react';
import { MapPin, Phone, MessageCircle, Bed, Navigation, Sparkles, Building } from 'lucide-react';
import { Branch } from '../types/hotel';
import { BRANCHES, HOTEL_INFO } from '../data/hotelData';

interface BranchOverviewProps {
  selectedBranch: 'all' | 'cabang-1' | 'cabang-2';
  onSelectBranch: (branchId: 'all' | 'cabang-1' | 'cabang-2') => void;
  onOpenInquiry: (branchId: 'cabang-1' | 'cabang-2', roomName?: string) => void;
}

export const BranchOverview: React.FC<BranchOverviewProps> = ({
  selectedBranch,
  onSelectBranch,
  onOpenInquiry
}) => {
  return (
    <section id="cabang" className="py-16 bg-[#F6F2EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <span>Akomodasi Nyaman</span>
            <span aria-hidden="true">·</span>
            <span>2 Cabang Strategis</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            Dua Pilihan Cabang Hotel Ladena di Pusat Kota
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Keduanya berlokasi strategis di pusat kota Kutacane, memudahkan akses Anda ke perkantoran pemerintah, sentra bisnis, perbankan, dan ragam kuliner khas Aceh Tenggara.
          </p>

          {/* Clean Segmented Tab Control */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-lg text-xs font-medium text-stone-700 mt-2">
            <button
              onClick={() => onSelectBranch('all')}
              className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                selectedBranch === 'all'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Semua Cabang (2)
            </button>
            <button
              onClick={() => onSelectBranch('cabang-1')}
              className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                selectedBranch === 'cabang-1'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Cabang 1 (Jl. Rajawali)
            </button>
            <button
              onClick={() => onSelectBranch('cabang-2')}
              className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                selectedBranch === 'cabang-2'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Cabang 2 (Pusat Kota)
            </button>
          </div>
        </div>

        {/* 2 Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {BRANCHES.filter(b => selectedBranch === 'all' || b.id === selectedBranch).map((branch) => {
            const isCabang1 = branch.id === 'cabang-1';

            return (
              <div
                key={branch.id}
                className="bg-white rounded-lg border border-stone-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Branch Photo Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <img
                      src={branch.heroImage}
                      alt={branch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#2D0A11]/90 text-amber-200 text-xs font-serif font-semibold tracking-wider rounded border border-amber-600/30">
                        {isCabang1 ? 'CABANG UTAMA' : 'CABANG STRATEGIS'}
                      </span>
                    </div>

                    {/* Bottom overlay text */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs text-amber-300 font-medium">{branch.locationTag}</p>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                        {branch.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {branch.description}
                    </p>

                    {/* Address & Contact Info Box */}
                    <div className="bg-[#FAF8F5] p-4 rounded border border-stone-200 space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-stone-700">
                        <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-900">Alamat: </span>
                          <span>{branch.address}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-stone-700">
                        <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                        <div>
                          <span className="font-semibold text-stone-900">Kontak Resepsionis: </span>
                          <span className="font-mono">{branch.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Keunggulan Cabang:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                        {branch.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-amber-700 rounded-full shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-6 pt-0 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onOpenInquiry(branch.id)}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#3B0D14] hover:bg-[#50121C] text-amber-100 text-xs font-semibold rounded transition shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Tanya Kamar Cabang Ini</span>
                  </button>

                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded hover:bg-stone-50 transition"
                  >
                    <Navigation className="w-3.5 h-3.5 text-stone-600" />
                    <span>Buka Rute Maps</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
