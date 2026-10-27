import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  onOpenInquiry: (branchId?: 'cabang-1' | 'cabang-2', roomName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#2D0A11] border-b border-[#4A141D] text-stone-100 shadow-md">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand element wordmark */}
        <a href="#beranda" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#D4AF37] via-[#C59B27] to-[#8C6B13] p-0.5 shadow flex items-center justify-center">
            <div className="w-full h-full bg-[#2D0A11] flex items-center justify-center">
              <span className="font-serif text-[#D4AF37] font-bold text-xl tracking-widest">L</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#EADBB6] group-hover:text-amber-300 transition-colors">
              HOTEL LADENA
            </span>
            <span className="text-[10px] tracking-widest uppercase text-amber-200/70 font-sans font-medium">
              Kutacane · Aceh Tenggara
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a href="#cabang" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            2 Cabang
          </a>
          <a href="#kamar" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            Tipe Kamar
          </a>
          <a href="#tarif" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            Tarif Resmi
          </a>
          <a href="#galeri" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            Galeri Foto
          </a>
          <a href="#lokasi" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            Lokasi & Peta
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${HOTEL_INFO.phoneRaw}`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-300 hover:text-white border border-[#5A1C27] rounded hover:bg-[#3D0F19] transition-colors whitespace-nowrap shrink-0"
            title="Hubungi Resepsionis Langsung"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-sans tabular-nums">{HOTEL_INFO.phoneDisplay}</span>
          </a>

          <button
            onClick={() => onOpenInquiry()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1F070B] bg-gradient-to-r from-[#E3C565] via-[#D4AF37] to-[#B89225] hover:brightness-105 active:scale-[0.98] rounded transition shadow-sm whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kontak Resepsionis</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenInquiry()}
            className="px-2.5 py-1.5 text-xs font-semibold text-[#1F070B] bg-[#D4AF37] rounded flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Resepsionis</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-white rounded"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#4A141D] bg-[#24080E] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs pb-3 border-b border-[#3D0E18]">
            <a
              href={`tel:${HOTEL_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#380E17] text-stone-200 rounded border border-[#521723]"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-sans font-semibold">Telepon</span>
            </a>
            <a
              href={HOTEL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-700 text-white rounded font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-300">
            <a
              href="#cabang"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#380E17] hover:text-amber-300 transition-colors"
            >
              Dua Cabang Hotel
            </a>
            <a
              href="#kamar"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#380E17] hover:text-amber-300 transition-colors"
            >
              Daftar Tipe Kamar
            </a>
            <a
              href="#tarif"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#380E17] hover:text-amber-300 transition-colors"
            >
              Tarif Resmi Hotel
            </a>
            <a
              href="#galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#380E17] hover:text-amber-300 transition-colors"
            >
              Galeri Foto Kamar
            </a>
            <a
              href="#lokasi"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#380E17] hover:text-amber-300 transition-colors"
            >
              Lokasi & Petunjuk Arah
            </a>
          </div>

          <div className="pt-2 text-[11px] text-amber-200/60 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Pusat Kota Kutacane · Aceh Tenggara</span>
          </div>
        </div>
      )}
    </header>
  );
};
