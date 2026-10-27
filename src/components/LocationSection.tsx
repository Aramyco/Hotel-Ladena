import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Compass, Clock } from 'lucide-react';
import { HOTEL_INFO, BRANCHES, NEARBY_LANDMARKS } from '../data/hotelData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="lokasi" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <span>Pusat Kota Kutacane</span>
            <span aria-hidden="true">·</span>
            <span>Akses Mudah &amp; Strategis</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            Lokasi Hotel Ladena &amp; Petunjuk Arah
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Berada tepat di pusat keramaian kota Kutacane, memudahkan mobilitas perjalanan dinas maupun rekreasi keluarga Anda.
          </p>
        </div>

        {/* 2 Column Grid: Info & Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Branch Addresses, Copy Actions & Landmark List */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Branch 1 Card */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-amber-900 uppercase tracking-wider">
                  Cabang 1 (Utama)
                </span>
                <span className="text-xs text-emerald-800 font-medium">
                  Jl. Rajawali
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Hotel Ladena 1
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Jalan Rajawali, Kutacane, Kabupaten Aceh Tenggara, Provinsi Aceh
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#3B0D14] hover:bg-[#50121C] rounded transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-300" />
                  <span>Buka Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>

                <button
                  onClick={() => handleCopyAddress('Jalan Rajawali, Kutacane, Kabupaten Aceh Tenggara, Aceh')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Alamat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Alamat</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Branch 2 Card */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-amber-900 uppercase tracking-wider">
                  Cabang 2 (Strategis)
                </span>
                <span className="text-xs text-emerald-800 font-medium">
                  Kawasan Niaga &amp; Bisnis
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Hotel Ladena 2
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Pusat Kota Kutacane, Kabupaten Aceh Tenggara, Provinsi Aceh
              </p>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Landmarks Near Hotel */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-800" />
                <span>Jarak ke Tempat Penting di Kutacane:</span>
              </h4>

              <div className="divide-y divide-stone-100 text-xs">
                {NEARBY_LANDMARKS.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-start justify-between gap-3">
                    <div>
                      <span className="font-semibold text-stone-900">{item.name}</span>
                      <p className="text-stone-500 text-[11px] mt-0.5">{item.description}</p>
                    </div>
                    <span className="font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 whitespace-nowrap shrink-0">
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Frame */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white p-2 rounded-lg border border-stone-200 shadow-sm overflow-hidden">
              <div className="relative w-full h-[450px] rounded overflow-hidden bg-stone-100">
                {/* Embed Map of Kutacane, Aceh Tenggara */}
                <iframe
                  title="Peta Lokasi Hotel Ladena Kutacane"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15926.262590212351!2d97.80153835!3d3.4933333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3030b2c15904aa7d%3A0x6b744ec3cce041a7!2sKutacane%2C%20Babussalam%2C%20Southeast%20Aceh%20Regency%2C%20Aceh!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Direct Google Maps Overlay Button */}
                <div className="absolute top-4 right-4 z-10">
                  <a
                    href={HOTEL_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-900 bg-white/95 hover:bg-white shadow-md rounded border border-stone-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
                    <span>Buka Tautan Google Maps Asli</span>
                  </a>
                </div>
              </div>

              <div className="p-3 bg-stone-50 border-t border-stone-100 text-xs text-stone-600 flex items-center justify-between">
                <span>Pusat Kota Kutacane · Babussalam · Aceh Tenggara</span>
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-900 font-medium hover:underline flex items-center gap-1"
                >
                  Lihat Titik Lokasi →
                </a>
              </div>
            </div>

            {/* Travel Guide Note */}
            <div className="bg-[#FAF3E0] p-4 rounded-lg border border-amber-800/20 text-xs text-stone-700 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-amber-950">
                <Clock className="w-4 h-4 text-amber-800" />
                <span>Petunjuk Menuju Hotel Ladena:</span>
              </div>
              <p className="leading-relaxed">
                Dari arah Medan melalui rute Berastagi - Kabanjahe - Kutacane (± 4-5 jam). Setibanya di pusat kota Kutacane dekat Masjid Agung At-Taqwa, arahkan kendaraan ke Jalan Rajawali (Cabang 1) atau hubungi resepsionis kami di <span className="font-semibold text-stone-900">0852 6227 4700</span> untuk panduan arah langsung.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
