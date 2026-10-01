import React, { useState } from 'react';
import { Camera, CheckCircle2, Upload, RefreshCw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  isCaptured: boolean;
  photoUrl?: string;
}

interface EvidenceUploaderProps {
  onComplete: (photos: string[]) => void;
}

export const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({ onComplete }) => {
  const [items, setItems] = useState<EvidenceItem[]>([
    {
      id: 'product_photo',
      title: 'Product Photo',
      description: 'Clear photo of physical garment item',
      isCaptured: true,
      photoUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'sku_photo',
      title: 'SKU / Barcode Tag',
      description: 'Photo showing barcode sticker & size label',
      isCaptured: true,
      photoUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'qty_photo',
      title: 'Quantity Verification',
      description: 'Photo showing all ordered units together',
      isCaptured: true,
      photoUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'package_photo',
      title: 'Sealed Package Photo',
      description: 'Photo of final branded WearNear pouch/box',
      isCaptured: false,
    }
  ]);

  const handleCapture = (id: string) => {
    // Simulate camera capture or upload
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isCaptured: true,
          photoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80'
        };
      }
      return item;
    }));
  };

  const completedCount = items.filter(i => i.isCaptured).length;

  return (
    <div className="bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#DDD7CA]">
        <div>
          <h4 className="font-bold text-base text-[#172033]">Order Fulfilment Evidence</h4>
          <p className="text-xs text-[#687085]">Capture 4 mandatory verification photos before package seal</p>
        </div>

        <div className="flex items-center gap-2 bg-[#F5F0E6] px-3 py-1.5 rounded-xl border border-[#DDD7CA]">
          <CheckCircle2 className={`w-4 h-4 ${completedCount === 4 ? 'text-emerald-600' : 'text-[#243FBA]'}`} />
          <span className="text-xs font-bold text-[#172033]">
            {completedCount} / 4 Captured
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border transition-all ${
              item.isCaptured 
                ? 'bg-emerald-50/50 border-emerald-200' 
                : 'bg-[#F5F0E6]/50 border-[#DDD7CA]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold text-[#243FBA] uppercase tracking-wider bg-blue-100/60 px-2 py-0.5 rounded-full">
                  Step {idx + 1}
                </span>
                <h5 className="font-bold text-sm text-[#172033] mt-1">{item.title}</h5>
                <p className="text-xs text-[#687085]">{item.description}</p>
              </div>

              {item.isCaptured && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
            </div>

            {item.isCaptured && item.photoUrl ? (
              <div className="relative aspect-16/9 rounded-lg overflow-hidden border border-emerald-200 group">
                <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => handleCapture(item.id)}
                    className="p-1.5 bg-white text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Retake
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleCapture(item.id)}
                className="w-full py-4 border-2 border-dashed border-[#243FBA]/40 bg-white hover:bg-blue-50/50 rounded-xl flex flex-col items-center justify-center text-[#243FBA] transition-colors"
              >
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-xs font-bold">Capture Photo</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={() => onComplete(items.filter(i => i.photoUrl).map(i => i.photoUrl!))}
          disabled={completedCount < 4}
          className="px-5 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl disabled:opacity-40 transition-colors shadow-xs"
        >
          Confirm Evidence ({completedCount}/4)
        </button>
      </div>
    </div>
  );
};
