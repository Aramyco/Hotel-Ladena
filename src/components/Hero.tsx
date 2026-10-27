import React from 'react';
import { Phone, MessageCircle, MapPin, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO, BRANCHES } from '../data/hotelData';

interface HeroProps {
  onOpenInquiry: (branchId?: 'cabang-1' | 'cabang-2', roomName?: string) => void;
  onSelectBranch: (branchId: 'cabang-1' | 'cabang-2') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, onSelectBranch }) => {
  return (
    <section id="beranda" className="relative bg-[#20060B] text-stone-100 overflow-hidden border-b border-[#3D0E18]">
      {/* Subtle gold ambient glow in background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8C6B13]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5C1421]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Headline, Value Proposition, Action Block */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Location Tag */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
              <span className="flex items-center gap-1.5 text-amber-200">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Pusat Kota Kutacane, Kab. Aceh Tenggara
              </span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span className="text-stone-300">2 Pilihan Cabang</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF3E0] leading-[1.15]" style={{ textWrap: 'balance' }}>
              Istirahat Nyaman &amp; Tenang di Pusat Kota Kutacane
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-sans">
              Selamat datang di <strong>Hotel Ladena</strong>. Kami menyediakan kamar bersih, berpendingin AC, 
              dengan fasilitas lengkap dan harga terjangkau di dua cabang strategis pusat kota Kutacane.
            </p>

            {/* Highlight Trust Badges (Anti-slop clean text layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 text-xs text-stone-300 border-y border-[#3D0E18]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Pemesanan Langsung Tanpa Ribet (Resepsionis 24 Jam)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Tarif Resmi Transparan Mulai Rp 200.000 / Malam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Area Parkir Aman &amp; Kamar Mandi Dalam Bersih</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Akses Cepat ke Masjid Agung, Perkantoran &amp; Kuliner</span>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1F070B] bg-gradient-to-r from-[#ECD488] via-[#D4AF37] to-[#B89225] hover:brightness-105 active:scale-[0.99] rounded transition shadow-md whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan Cepat via WhatsApp</span>
              </button>

              <a
                href={`tel:${HOTEL_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-stone-200 border border-[#521723] hover:border-amber-400 hover:text-white bg-[#2A0910] rounded transition whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="tabular-nums font-sans">Telepon: {HOTEL_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* 2 Branches Quick Selector Link */}
            <div className="pt-1 flex items-center gap-3 text-xs text-stone-400">
              <span className="text-amber-200/80 font-medium">Pilihan Cabang:</span>
              <button
                onClick={() => {
                  onSelectBranch('cabang-1');
                  const el = document.getElementById('cabang');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 underline decoration-amber-500/50 underline-offset-4 transition"
              >
                Cabang 1 (Jl. Rajawali)
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => {
                  onSelectBranch('cabang-2');
                  const el = document.getElementById('cabang');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 underline decoration-amber-500/50 underline-offset-4 transition"
              >
                Cabang 2 (Pusat Kota)
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-lg overflow-hidden border border-[#4D1420] shadow-2xl bg-[#170408] group">
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[420px] w-full overflow-hidden relative">
                <img
                  src="/assets/aistudio/1_ef08b4c2.webp"
                  alt="Kamar Superior Hotel Ladena Kutacane"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Measured Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-stone-100 flex flex-col justify-end">
                <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-1">
                  <span>Foto Asli Kamar Superior I</span>
                  <span className="font-serif text-[#D4AF37] font-semibold">Hotel Ladena</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  Kamar Ber-AC, Kulkas Mini, Meja Rias &amp; Teko Listrik
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-stone-300">
                  <span>Kebersihan Terjamin</span>
                  <span aria-hidden="true">·</span>
                  <span>Linen Bersih &amp; Rapi</span>
                  <span aria-hidden="true">·</span>
                  <span>Handuk Higienis</span>
                </div>
              </div>

            </div>

            {/* Subtle notice banner */}
            <div className="mt-3 px-4 py-2.5 bg-[#2A0910] border border-[#44121B] rounded text-xs text-stone-300 flex items-center justify-between">
              <span className="text-stone-300">
                Punya rencana kunjungan ke Kutacane?
              </span>
              <button
                onClick={() => onOpenInquiry()}
                className="text-[#E3C565] hover:text-white font-medium hover:underline text-xs shrink-0 ml-2"
              >
                Cek Ketersediaan Kamar →
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
