/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BranchOverview } from './components/BranchOverview';
import { RoomList } from './components/RoomList';
import { TariffSection } from './components/TariffSection';
import { Gallery } from './components/Gallery';
import { LocationSection } from './components/LocationSection';
import { Amenities } from './components/Amenities';
import { Footer } from './components/Footer';
import { DirectInquiryModal } from './components/DirectInquiryModal';
import { LightboxModal } from './components/LightboxModal';
import { Phone, MessageCircle } from 'lucide-react';
import { HOTEL_INFO } from './data/hotelData';

export default function App() {
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'cabang-1' | 'cabang-2'>('all');
  
  // Direct Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryBranch, setInquiryBranch] = useState<'cabang-1' | 'cabang-2'>('cabang-1');
  const [inquiryRoomName, setInquiryRoomName] = useState<string>('');

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxCaption, setLightboxCaption] = useState('');

  const handleOpenInquiry = (branchId?: 'cabang-1' | 'cabang-2', roomName?: string) => {
    if (branchId) {
      setInquiryBranch(branchId);
    }
    if (roomName) {
      setInquiryRoomName(roomName);
    }
    setInquiryModalOpen(true);
  };

  const handleOpenPhoto = (imageUrl: string, title: string, caption: string) => {
    setLightboxImage(imageUrl);
    setLightboxTitle(title);
    setLightboxCaption(caption);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-amber-800 selection:text-white">
      {/* Strict 3-zone Header */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Flow */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onOpenInquiry={handleOpenInquiry}
          onSelectBranch={(b) => setSelectedBranch(b)}
        />

        {/* 2 Branches Overview */}
        <BranchOverview
          selectedBranch={selectedBranch}
          onSelectBranch={(b) => setSelectedBranch(b)}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Room Types & Pricing for Each Branch */}
        <RoomList
          selectedBranch={selectedBranch}
          onSelectBranch={(b) => setSelectedBranch(b)}
          onOpenInquiry={handleOpenInquiry}
          onSelectPhoto={handleOpenPhoto}
        />

        {/* Official Hotel Tariff Board Showcase */}
        <TariffSection
          onOpenInquiry={handleOpenInquiry}
          onSelectPhoto={handleOpenPhoto}
        />

        {/* Real Photo Gallery with Filter & Lightbox */}
        <Gallery onSelectPhoto={handleOpenPhoto} />

        {/* Amenities & Service Standards */}
        <Amenities />

        {/* Location, Google Maps Embed & Nearby Landmarks */}
        <LocationSection />

      </main>

      {/* Quiet Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Floating Action Button for Quick Receptionist Contact (Mobile & Desktop) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => handleOpenInquiry()}
          className="flex items-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-medium rounded-full shadow-lg border border-emerald-600 transition"
          aria-label="Tanya kamar langsung via WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline text-xs font-semibold">Tanya Kamar (WA)</span>
        </button>

        <a
          href={`tel:${HOTEL_INFO.phoneRaw}`}
          className="sm:hidden flex items-center justify-center w-12 h-12 bg-[#2D0A11] hover:bg-[#3D0E18] text-[#D4AF37] rounded-full shadow-lg border border-[#521723] transition"
          aria-label="Telepon Resepsionis"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Direct Contact / Reservation Inquiry Modal */}
      <DirectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialBranchId={inquiryBranch}
        initialRoomName={inquiryRoomName}
      />

      {/* Lightbox Modal for Photo Inspection */}
      <LightboxModal
        isOpen={lightboxOpen}
        imageUrl={lightboxImage}
        title={lightboxTitle}
        caption={lightboxCaption}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
