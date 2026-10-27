import React from 'react';
import { ShieldCheck, Wind, Droplets, Car, Clock, PhoneCall, Coffee, Utensils } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const Amenities: React.FC = () => {
  const highlights = [
    {
      icon: Clock,
      title: 'Resepsionis 24 Jam',
      desc: 'Check-in kapan pun Anda tiba di Kutacane, siang maupun tengah malam.'
    },
    {
      icon: Wind,
      title: 'Pendingin Ruangan (AC)',
      desc: 'Kamar dilengkapi AC dingin terawat untuk istirahat yang nyaman.'
    },
    {
      icon: Droplets,
      title: 'Kamar Mandi Dalam Higienis',
      desc: 'Air bersih mengalir lancar, handuk bersih, dan sabun mandi disediakan.'
    },
    {
      icon: Car,
      title: 'Parkir Kendaraan Aman',
      desc: 'Area parkir mobil dan sepeda motor aman di pekarangan properti hotel.'
    },
    {
      icon: PhoneCall,
      title: 'Kontak Langsung Tanpa Ribet',
      desc: 'Tanpa sistem online rumit, konfirmasi kamar langsung lewat WhatsApp dan telepon.'
    },
    {
      icon: Utensils,
      title: 'Sentra Kuliner Dekat Hotel',
      desc: 'Mudah menemukan sarapan, makan malam, warung kopi khas Aceh, dan toko kelontong.'
    }
  ];

  return (
    <section className="py-16 bg-[#FBF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <span>Standar Pelayanan</span>
            <span aria-hidden="true">·</span>
            <span>Kenyamanan Tamu</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            Fasilitas &amp; Kenyamanan di Hotel Ladena
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Prioritas utama kami adalah kebersihan kamar, keramahan pelayanan, dan kemudahan akses bagi setiap tamu di Kutacane.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-stone-200/90 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded bg-[#FAF3E0] border border-amber-200 flex items-center justify-center text-amber-900">
                  <IconComp className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
