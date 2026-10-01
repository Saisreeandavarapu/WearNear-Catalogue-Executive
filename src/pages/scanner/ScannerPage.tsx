import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, 
  Zap, 
  ZapOff, 
  CheckCircle2, 
  Keyboard, 
  Search, 
  Box, 
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';

export const ScannerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products } = useCatalogue();

  const [flashOn, setFlashOn] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scannedResult, setScannedResult] = useState<{
    code: string;
    product: any;
    variant: any;
  } | null>(null);

  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      handlePerformScan(codeParam);
    }
  }, [searchParams]);

  const handlePerformScan = (code: string) => {
    let matchedProduct = null;
    let matchedVariant = null;

    for (const p of products) {
      const v = p.variants.find(v => v.barcode === code || v.sku === code || v.id === code);
      if (v) {
        matchedProduct = p;
        matchedVariant = v;
        break;
      }
    }

    if (matchedProduct && matchedVariant) {
      setScannedResult({
        code,
        product: matchedProduct,
        variant: matchedVariant
      });
    } else {
      // Fallback first product variant for preview demonstration
      const defaultP = products[0];
      setScannedResult({
        code: code || 'WN890123456789',
        product: defaultP,
        variant: defaultP.variants[0]
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Fulfilment Scanner & Lookup</h2>
          <p className="text-xs text-[#687085]">Scan EAN/UPC barcodes, garment tags, or package QR codes</p>
        </div>

        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
            flashOn ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-white text-[#172033] border-[#DDD7CA]'
          }`}
        >
          {flashOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
          Torch {flashOn ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Main Viewfinder Section */}
      <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl relative aspect-16/9 md:aspect-21/9 flex flex-col items-center justify-center border-4 border-[#DDD7CA]">
        {/* Animated Laser Grid Background */}
        <div className={`absolute inset-0 bg-radial from-slate-900 to-slate-950 ${flashOn ? 'brightness-125' : ''}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3155D8_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Viewfinder Target Frame */}
        <div className="relative w-64 md:w-80 h-36 md:h-44 rounded-2xl border-2 border-dashed border-blue-400/70 bg-blue-500/5 backdrop-blur-[2px] flex items-center justify-center">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#3155D8] rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#3155D8] rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#3155D8] rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#3155D8] rounded-br-lg" />

          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3155D8] to-transparent shadow-[0_0_16px_#3155D8] animate-scan-laser" />

          <p className="text-xs text-blue-200/90 font-mono tracking-wider bg-slate-900/80 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            ALIGN BARCODE HERE
          </p>
        </div>
      </div>

      {/* Manual Input Entry Bar */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-5 shadow-card space-y-3">
        <label className="text-xs font-bold text-[#172033] block">
          Manual Barcode or SKU Lookup
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="e.g. WN890123456789 or WN-SHIRT-NAV-L"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm font-mono focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
            <Search className="w-4 h-4 text-[#687085] absolute left-3.5 top-3" />
          </div>
          <button
            onClick={() => manualCode && handlePerformScan(manualCode)}
            className="px-5 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Lookup
          </button>
        </div>
      </div>

      {/* Scanned Result Banner */}
      <AnimatePresence>
        {scannedResult && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#FFFCF5] rounded-3xl border-2 border-emerald-400 p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD7CA]">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#172033]">✓ PRODUCT FOUND IN CATALOGUE</h3>
                  <p className="text-xs text-[#687085] font-mono">Scanned: {scannedResult.code}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Active Record
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={scannedResult.product.primaryImage}
                alt={scannedResult.product.name}
                className="w-20 h-20 rounded-2xl object-cover border border-[#DDD7CA]"
              />

              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-[#172033]">{scannedResult.product.name}</h4>
                <p className="text-xs text-[#687085] font-mono">
                  SKU: {scannedResult.variant.sku} • Brand: {scannedResult.product.brand}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-[#172033] bg-[#F5F0E6] px-2.5 py-0.5 rounded border border-[#DDD7CA]">
                    Color: {scannedResult.variant.color}
                  </span>
                  <span className="text-xs font-bold text-[#172033] bg-[#F5F0E6] px-2.5 py-0.5 rounded border border-[#DDD7CA]">
                    Size: {scannedResult.variant.size}
                  </span>
                  <span className="text-xs font-extrabold text-[#243FBA] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Stock: {scannedResult.variant.stock} Units Available
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => navigate(`/vendor/catalogue/products/${scannedResult.product.id}`)}
                className="px-4 py-2 bg-white text-[#172033] border border-[#DDD7CA] hover:bg-[#F5F0E6] text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
              >
                View Product Details <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/vendor/catalogue/orders')}
                className="px-5 py-2 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Assign to Order
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
