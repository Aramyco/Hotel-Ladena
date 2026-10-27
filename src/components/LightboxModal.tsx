import React from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  caption: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  caption,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#1A060A] border border-[#3E1019] rounded-lg overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-4 bg-[#260A10] border-b border-[#3E1019] flex items-center justify-between text-white">
          <h3 className="font-serif text-base sm:text-lg font-bold text-amber-200 truncate pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded bg-white/10 hover:bg-white/20 transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image frame */}
        <div className="relative max-h-[70vh] flex items-center justify-center bg-black/80 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[70vh] w-auto max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption */}
        {caption && (
          <div className="p-4 bg-[#1F070C] border-t border-[#3E1019] text-xs sm:text-sm text-stone-300">
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};
