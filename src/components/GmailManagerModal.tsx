import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Send,
  Inbox,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  User,
  LogOut,
  Trash2,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { googleSignIn, logout, initAuth } from '../services/firebaseAuth';
import {
  listGmailMessages,
  getGmailMessageDetail,
  sendGmailMessage,
  trashGmailMessage,
  GmailMessageSummary,
  GmailMessageDetail
} from '../services/gmailApi';
import { HOTEL_INFO, BRANCHES, ROOMS } from '../data/hotelData';

interface GmailManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRecipient?: string;
  initialSubject?: string;
  initialBody?: string;
}

export const GmailManagerModal: React.FC<GmailManagerModalProps> = ({
  isOpen,
  onClose,
  initialRecipient = '',
  initialSubject = '',
  initialBody = ''
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose'>('compose');

  // Inbox state
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageDetail | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Compose form state
  const [recipient, setRecipient] = useState(initialRecipient);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // User Confirmation Dialog State (Mandatory for destructive/mutating operations)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'send' | 'trash';
    title: string;
    description: string;
    actionPayload?: any;
  }>({
    isOpen: false,
    type: 'send',
    title: '',
    description: '',
  });

  // Sync initial props
  useEffect(() => {
    if (initialRecipient) setRecipient(initialRecipient);
    if (initialSubject) setSubject(initialSubject);
    if (initialBody) setBody(initialBody);
  }, [initialRecipient, initialSubject, initialBody, isOpen]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch inbox when user is authenticated
  const fetchInbox = async (token: string, query: string = '') => {
    setLoadingMessages(true);
    setErrorMsg(null);
    try {
      const data = await listGmailMessages(token, query, 15);
      setMessages(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memuat pesan Gmail.');
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (accessToken && activeTab === 'inbox') {
      fetchInbox(accessToken, searchQuery);
    }
  }, [accessToken, activeTab]);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        if (activeTab === 'inbox') {
          fetchInbox(res.accessToken, searchQuery);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Proses masuk dengan Google dibatalkan atau gagal.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setMessages([]);
    setSelectedMessage(null);
  };

  // Open message detail
  const handleOpenDetail = async (id: string) => {
    if (!accessToken) return;
    setLoadingMessages(true);
    try {
      const detail = await getGmailMessageDetail(accessToken, id);
      setSelectedMessage(detail);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memuat detail email.');
    } finally {
      setLoadingMessages(false);
    }
  };

  // Trigger Send Confirmation Modal
  const requestSendConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !subject.trim() || !body.trim()) {
      setErrorMsg('Mohon lengkapi email tujuan, subjek, dan isi pesan.');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      type: 'send',
      title: 'Konfirmasi Pengiriman Email',
      description: `Kirim email ini ke "${recipient}" dengan subjek "${subject}" menggunakan akun Gmail Anda (${currentUser?.email})?`,
    });
  };

  // Execute Send after user clicks confirm
  const executeSendEmail = async () => {
    if (!accessToken) return;
    setIsSending(true);
    setErrorMsg(null);
    try {
      await sendGmailMessage(accessToken, {
        to: recipient.trim(),
        subject: subject.trim(),
        body: body.trim(),
      });
      setSendSuccess(true);
      setConfirmDialog({ isOpen: false, type: 'send', title: '', description: '' });
      setTimeout(() => setSendSuccess(false), 4000);
      setBody('');
      setSubject('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mengirim email melalui Gmail.');
    } finally {
      setIsSending(false);
    }
  };

  // Trigger Trash Confirmation Modal
  const requestTrashConfirmation = (id: string, subjectTitle: string) => {
    setConfirmDialog({
      isOpen: true,
      type: 'trash',
      title: 'Pindahkan Email ke Sampah?',
      description: `Apakah Anda yakin ingin memindahkan email "${subjectTitle}" ke folder Sampah di Gmail?`,
      actionPayload: id,
    });
  };

  // Execute Trash after user clicks confirm
  const executeTrashEmail = async () => {
    const id = confirmDialog.actionPayload;
    if (!accessToken || !id) return;
    try {
      await trashGmailMessage(accessToken, id);
      setConfirmDialog({ isOpen: false, type: 'trash', title: '', description: '' });
      setSelectedMessage(null);
      fetchInbox(accessToken, searchQuery);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memindahkan pesan ke sampah.');
    }
  };

  // Templates Helper
  const applyTemplate = (type: 'reservasi' | 'tarif' | 'rute') => {
    if (type === 'reservasi') {
      setSubject('Konfirmasi Reservasi Kamar - Hotel Ladena Kutacane');
      setBody(
`Kepada Yth. Tamu Hotel Ladena,

Terima kasih atas rencana kunjungan Anda di Hotel Ladena Kutacane. Berikut adalah rincian informasi pemesanan kamar Anda:

• Properti: Hotel Ladena
• Cabang: Cabang 1 (Jl. Rajawali) / Cabang 2 (Pusat Kota)
• Tipe Kamar: Superior Room I (Rp 400.000 / malam)
• Fasilitas: AC Dingin, TV, Kamar Mandi Dalam, Kulkas Mini & Teko Listrik (Tipe I)
• Waktu Check-in: Mulai pukul 14.00 WIB
• Waktu Check-out: Pukul 12.00 WIB
• Catatan Sarapan: Kami tidak menyiapkan sarapan pagi (tersedia fasilitas teko listrik di kamar dan rekomendasi kuliner di sekitar hotel).

Resepsionis kami siap melayani Anda 24 Jam. Jika membutuhkan bantuan rute atau penjemputan, hubungi telepon/WhatsApp di 0852 6227 4700.

Hormat kami,
Resepsionis Hotel Ladena Kutacane
Jalan Rajawali, Kutacane, Kab. Aceh Tenggara`
      );
    } else if (type === 'tarif') {
      setSubject('Daftar Tarif & Informasi Kamar Hotel Ladena');
      setBody(
`Halo,

Terima kasih telah menghubungi Hotel Ladena Kutacane. Berikut daftar tarif resmi kamar kami di pusat kota Kutacane:

1. Superior Room I: Rp 400.000 / malam (Lengkap: Kulkas mini, Teko listrik, AC, TV)
2. Superior Room II: Rp 350.000 / malam (Lemari cermin besar, meja rias, AC)
3. Superior Room III: Rp 300.000 / malam (Double/Twin Bed, AC, TV)
4. Superior Room IV: Rp 250.000 / malam (AC, Kamar mandi dalam)
5. Superior Room V: Rp 200.000 / malam (Pilihan hemat dan bersih)
• Extra Bed: Rp 100.000 / malam

Lokasi Maps: https://maps.app.goo.gl/sGjJhJdneeZgEpLdA
Telepon/WA: 0852 6227 4700

Salam hangat,
Hotel Ladena Kutacane`
      );
    } else {
      setSubject('Petunjuk Arah & Lokasi Hotel Ladena Kutacane');
      setBody(
`Halo,

Berikut petunjuk arah menuju Hotel Ladena di pusat kota Kutacane, Kabupaten Aceh Tenggara:

• Tautan Google Maps: https://maps.app.goo.gl/sGjJhJdneeZgEpLdA
• Alamat: Jalan Rajawali, Kutacane, Kab. Aceh Tenggara
• Patokan: Berada di pusat kota, dekat Masjid Agung At-Taqwa dan perkantoran Pemkab.
• Hubungi kami saat tiba di Kutacane: 0852 6227 4700.

Selamat dalam perjalanan!
Hotel Ladena Kutacane`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#260A10] text-white flex items-center justify-between border-b border-[#3D0E18]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4AF37] text-[#260A10] flex items-center justify-center shadow">
              <Mail className="w-4 h-4 text-[#260A10]" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-amber-200">
                Layanan Email Gmail Hotel Ladena
              </h3>
              <p className="text-[11px] text-stone-300">
                Integrasi Resmi Google Workspace Gmail API
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded bg-white/10 hover:bg-white/20 transition"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Auth State Banner */}
          {!currentUser ? (
            <div className="bg-[#FAF8F5] border border-amber-800/20 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                <Mail className="w-6 h-6 text-amber-900" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Hubungkan dengan Akun Gmail Anda
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Masuk dengan akun Google Anda untuk mengirim surat konfirmasi reservasi resmi, membaca pesan masuk seputar penginapan, dan mengelola email langsung dari website Hotel Ladena.
                </p>
              </div>

              {/* Official Google Sign-in Button */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-md border border-stone-300 shadow-sm hover:shadow transition active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{isSigningIn ? 'Menghubungkan Google...' : 'Sign in with Google'}</span>
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {errorMsg}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Authenticated User Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs">
                <div className="flex items-center gap-2.5">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-7 h-7 rounded-full border border-stone-300"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold">
                      {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-stone-900 block">
                      {currentUser.displayName || 'Akun Google'}
                    </span>
                    <span className="text-stone-500 text-[11px]">
                      {currentUser.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-emerald-700 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Terhubung Gmail</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-stone-600 hover:text-red-700 border border-stone-200 rounded hover:bg-white transition"
                    title="Keluar dari akun Google"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>

              {/* Sub-tabs: Compose vs Inbox */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="inline-flex p-1 bg-stone-100 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => {
                      setActiveTab('compose');
                      setSelectedMessage(null);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                      activeTab === 'compose'
                        ? 'bg-white text-stone-900 shadow-sm font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5 text-amber-800" />
                    <span>Kirim Email / Konfirmasi</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('inbox');
                      if (accessToken) fetchInbox(accessToken, searchQuery);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                      activeTab === 'inbox'
                        ? 'bg-white text-stone-900 shadow-sm font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5 text-amber-800" />
                    <span>Kotak Masuk (Inbox)</span>
                  </button>
                </div>

                {activeTab === 'inbox' && (
                  <button
                    onClick={() => accessToken && fetchInbox(accessToken, searchQuery)}
                    disabled={loadingMessages}
                    className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 py-1 px-2 rounded hover:bg-stone-100 transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Segarkan</span>
                  </button>
                )}
              </div>

              {/* Feedback messages */}
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {errorMsg}
                </div>
              )}

              {sendSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Email berhasil terkirim melalui akun Gmail Anda!</span>
                </div>
              )}

              {/* TAB 1: COMPOSE EMAIL */}
              {activeTab === 'compose' && (
                <div className="space-y-4">
                  {/* Quick Templates */}
                  <div className="bg-[#FAF8F5] p-3 rounded border border-amber-800/15 space-y-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      Pilihan Template Email Hotel Ladena:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => applyTemplate('reservasi')}
                        className="px-2.5 py-1 text-xs bg-white hover:bg-amber-50 text-stone-800 border border-stone-200 rounded transition"
                      >
                        Konfirmasi Reservasi
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('tarif')}
                        className="px-2.5 py-1 text-xs bg-white hover:bg-amber-50 text-stone-800 border border-stone-200 rounded transition"
                      >
                        Daftar Tarif &amp; Fasilitas
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('rute')}
                        className="px-2.5 py-1 text-xs bg-white hover:bg-amber-50 text-stone-800 border border-stone-200 rounded transition"
                      >
                        Petunjuk Arah &amp; Maps
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={requestSendConfirmation} className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Penerima:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tamu@contoh.com atau hotel.ladena@gmail.com"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full py-2 px-3 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Subjek Email:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Konfirmasi Reservasi Hotel Ladena Kutacane"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full py-2 px-3 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Isi Pesan:
                      </label>
                      <textarea
                        required
                        rows={7}
                        placeholder="Tulis pesan lengkap atau gunakan tombol template di atas..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full py-2 px-3 text-xs font-sans bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        * Memerlukan konfirmasi sebelum pesan terkirim.
                      </span>

                      <button
                        type="submit"
                        disabled={isSending}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#3B0D14] hover:bg-[#50121C] text-amber-100 text-xs font-semibold rounded shadow-sm transition active:scale-[0.98]"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-300" />
                        <span>{isSending ? 'Mengirim...' : 'Kirim via Gmail'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: INBOX */}
              {activeTab === 'inbox' && (
                <div className="space-y-3">
                  {/* Search bar */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Cari email (misal: 'reservasi', 'hotel')..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && accessToken) {
                            fetchInbox(accessToken, searchQuery);
                          }
                        }}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-amber-900 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => accessToken && fetchInbox(accessToken, searchQuery)}
                      className="px-3 py-2 text-xs font-medium bg-stone-200 hover:bg-stone-300 text-stone-800 rounded transition"
                    >
                      Cari
                    </button>
                  </div>

                  {/* Detail view of selected email */}
                  {selectedMessage ? (
                    <div className="bg-[#FAF8F5] p-4 rounded-lg border border-stone-200 space-y-3">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-200">
                        <div>
                          <button
                            onClick={() => setSelectedMessage(null)}
                            className="text-xs text-amber-900 hover:underline mb-1 inline-block"
                          >
                            ← Kembali ke Daftar Email
                          </button>
                          <h4 className="font-serif text-base font-bold text-stone-900">
                            {selectedMessage.subject}
                          </h4>
                          <p className="text-xs text-stone-600 mt-0.5">
                            Dari: <span className="font-medium text-stone-800">{selectedMessage.from}</span>
                          </p>
                          <p className="text-[11px] text-stone-500">
                            Tanggal: {selectedMessage.date}
                          </p>
                        </div>

                        <button
                          onClick={() => requestTrashConfirmation(selectedMessage.id, selectedMessage.subject || '')}
                          className="p-1.5 text-stone-400 hover:text-red-700 rounded hover:bg-stone-100 transition"
                          title="Pindahkan ke sampah"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="text-xs text-stone-800 whitespace-pre-wrap font-sans leading-relaxed max-h-72 overflow-y-auto p-2 bg-white rounded border border-stone-200">
                        {selectedMessage.bodyText}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            setRecipient(selectedMessage.from?.replace(/.*<(.+)>/, '$1') || selectedMessage.from || '');
                            setSubject(`Re: ${selectedMessage.subject}`);
                            setBody(`\n\n--- Pesan Asli ---\n${selectedMessage.bodyText?.slice(0, 300)}...`);
                            setActiveTab('compose');
                            setSelectedMessage(null);
                          }}
                          className="px-3 py-1.5 bg-[#3B0D14] hover:bg-[#50121C] text-amber-100 text-xs font-medium rounded transition"
                        >
                          Balas Email Ini
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Message list */
                    <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-100 max-h-80 overflow-y-auto">
                      {loadingMessages ? (
                        <div className="p-8 text-center text-xs text-stone-500">
                          <RefreshCw className="w-5 h-5 animate-spin mx-auto text-amber-800 mb-2" />
                          <span>Memuat email dari akun Gmail Anda...</span>
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="p-8 text-center text-xs text-stone-500">
                          Tidak ada email ditemukan dalam pencarian ini.
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            onClick={() => handleOpenDetail(msg.id)}
                            className="p-3 hover:bg-stone-50 transition cursor-pointer text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-medium truncate max-w-[200px] sm:max-w-xs ${msg.unread ? 'font-bold text-stone-900' : 'text-stone-700'}`}>
                                {msg.from?.replace(/<.*>/, '').trim() || msg.from}
                              </span>
                              <span className="text-[11px] text-stone-400 shrink-0 ml-2">
                                {msg.date?.slice(0, 16)}
                              </span>
                            </div>

                            <p className={`truncate ${msg.unread ? 'font-semibold text-stone-900' : 'text-stone-800'}`}>
                              {msg.subject}
                            </p>

                            <p className="text-[11px] text-stone-500 truncate">
                              {msg.snippet}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Quiet Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
          <span>Hotel Ladena · Akses Gmail Aman &amp; Berizin</span>
          <span>Kutacane, Aceh Tenggara</span>
        </div>

      </div>

      {/* Mandatory Explicit User Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="bg-white rounded-lg shadow-2xl max-w-md w-full p-5 border border-stone-300 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-800" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {confirmDialog.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {confirmDialog.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                className="px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDialog.type === 'send' ? executeSendEmail : executeTrashEmail}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#3B0D14] hover:bg-[#50121C] rounded transition shadow-sm"
              >
                {confirmDialog.type === 'send' ? 'Konfirmasi Kirim' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
