import React, { useState } from 'react';
import { X, MessageCircle, Phone, Copy, Check, Calendar, Bed, Building2, User, Clock, Mail } from 'lucide-react';
import { HOTEL_INFO, BRANCHES, ROOMS } from '../data/hotelData';

interface DirectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBranchId?: 'cabang-1' | 'cabang-2';
  initialRoomName?: string;
  onOpenGmailWithDraft?: (subject: string, body: string) => void;
}

export const DirectInquiryModal: React.FC<DirectInquiryModalProps> = ({
  isOpen,
  onClose,
  initialBranchId = 'cabang-1',
  initialRoomName = '',
  onOpenGmailWithDraft,
}) => {
  const [branchId, setBranchId] = useState<'cabang-1' | 'cabang-2'>(initialBranchId);
  const [roomName, setRoomName] = useState<string>(initialRoomName || 'Superior Room I');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [duration, setDuration] = useState<string>('1 Malam');
  const [guestName, setGuestName] = useState<string>('');
  const [extraBed, setExtraBed] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync props when modal opens
  React.useEffect(() => {
    if (initialBranchId) setBranchId(initialBranchId);
    if (initialRoomName) setRoomName(initialRoomName);
  }, [initialBranchId, initialRoomName, isOpen]);

  if (!isOpen) return null;

  const branchObj = BRANCHES.find(b => b.id === branchId) || BRANCHES[0];
  const availableRoomsForBranch = ROOMS.filter(r => r.branchId === branchId);

  // Formatted message for WhatsApp
  const generateMessage = () => {
    return `Halo Resepsionis Hotel Ladena Kutacane,
Saya ingin menanyakan ketersediaan kamar:

• Cabang: ${branchObj.name}
• Tipe Kamar: ${roomName}
• Tanggal Masuk: ${checkInDate || 'Menyesuaikan ketersediaan'}
• Durasi: ${duration}
• Nama Tamu: ${guestName || 'Tamu Hotel Ladena'}
${extraBed ? '• Tambahan: Extra Bed (Rp 100.000)\n' : ''}${notes ? `• Catatan: ${notes}\n` : ''}
Mohon informasi ketersediaan kamar dan panduan check-in. Terima kasih.`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateMessage());
    const waUrl = `https://wa.me/${HOTEL_INFO.whatsappRaw}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Box */}
      <div
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#2D0A11] text-white flex items-center justify-between border-b border-[#44121B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4AF37] text-[#2D0A11] font-serif font-bold flex items-center justify-center">
              L
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-200">
                Kontak Resepsionis Hotel Ladena
              </h3>
              <p className="text-xs text-stone-300">
                Respon Cepat · Tanpa Fitur Online Rumit
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          <div className="bg-[#FAF8F5] p-3 rounded border border-stone-200 text-stone-700 text-xs flex items-start gap-2">
            <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <span>
              Pemesanan kamar di Hotel Ladena dilakukan langsung melalui komunikasi WhatsApp atau telepon resepsionis demi kepastian kamar dan pelayanan personal terbaik.
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            
            {/* Branch Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Pilih Cabang Hotel:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setBranchId('cabang-1');
                    setRoomName('Superior Room I');
                  }}
                  className={`py-2 px-3 text-xs rounded border text-left transition ${
                    branchId === 'cabang-1'
                      ? 'border-[#3B0D14] bg-[#3B0D14] text-white font-semibold'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="block font-semibold">Cabang 1</span>
                  <span className="text-[11px] opacity-80">Jl. Rajawali</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBranchId('cabang-2');
                    setRoomName('Superior Deluxe Room (Cabang 2)');
                  }}
                  className={`py-2 px-3 text-xs rounded border text-left transition ${
                    branchId === 'cabang-2'
                      ? 'border-[#3B0D14] bg-[#3B0D14] text-white font-semibold'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="block font-semibold">Cabang 2</span>
                  <span className="text-[11px] opacity-80">Pusat Kota</span>
                </button>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Tipe Kamar:
              </label>
              <select
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none"
              >
                {availableRoomsForBranch.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name} — {r.formattedPrice} / malam
                  </option>
                ))}
              </select>
            </div>

            {/* Check-in Date & Duration */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Rencana Masuk:
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Lama Menginap:
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none"
                >
                  <option value="1 Malam">1 Malam</option>
                  <option value="2 Malam">2 Malam</option>
                  <option value="3 Malam">3 Malam</option>
                  <option value="Lebih dari 3 Malam">Lebih dari 3 Malam</option>
                  <option value="Mingguan / Bulanan">Mingguan / Bulanan</option>
                </select>
              </div>
            </div>

            {/* Guest Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Nama Anda (Opsional):
              </label>
              <input
                type="text"
                placeholder="Contoh: Pak Herman / Ibu Rina"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none"
              />
            </div>

            {/* Extra bed checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="extra-bed"
                checked={extraBed}
                onChange={(e) => setExtraBed(e.target.checked)}
                className="rounded border-stone-300 text-amber-900 focus:ring-amber-900"
              />
              <label htmlFor="extra-bed" className="text-xs text-stone-700 cursor-pointer">
                Perlu Extra Bed (+ Rp 100.000 / malam)
              </label>
            </div>

          </div>

          {/* Preview of message */}
          <div className="pt-2">
            <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Pratinjau Pesan:
            </span>
            <div className="bg-stone-50 p-2.5 rounded border border-stone-200 text-[11px] text-stone-600 font-mono whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto">
              {generateMessage()}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
          
          <button
            onClick={handleSendWhatsApp}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim via WhatsApp</span>
          </button>

          {onOpenGmailWithDraft && (
            <button
              onClick={() => {
                onClose();
                onOpenGmailWithDraft(
                  `Tanya Kamar ${roomName} - ${branchObj.name}`,
                  generateMessage()
                );
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#3B0D14] hover:bg-[#50121C] text-amber-200 text-xs font-medium rounded transition shadow-sm"
              title="Kirim rincian ini melalui Gmail"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Kirim via Gmail</span>
            </button>
          )}

          <a
            href={`tel:${HOTEL_INFO.phoneRaw}`}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-medium rounded transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-800" />
            <span>Telepon</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-medium rounded transition"
            title="Salin teks pesan"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
