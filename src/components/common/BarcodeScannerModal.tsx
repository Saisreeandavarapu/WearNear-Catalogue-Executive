import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, 
  Zap, 
  ZapOff, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Keyboard, 
  Search,
  Box
} from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (scannedCode: string) => void;
  targetSku?: string;
  expectedBarcode?: string;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  targetSku,
  expectedBarcode
}) => {
  const { products } = useCatalogue();
  const [flashOn, setFlashOn] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [scanResult, setScanResult] = useState<{
    code: string;
    matched: boolean;
    productName?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setScanResult(null);
      setManualCode('');
    }
  }, [isOpen]);

  const handleSimulateScan = (codeToScan: string) => {
    setIsScanning(false);
    let matched = true;
    if (expectedBarcode && codeToScan !== expectedBarcode) {
      matched = false;
    }

    let foundProduct = '';
    for (const p of products) {
      const v = p.variants.find(v => v.barcode === codeToScan || v.sku === codeToScan);
      if (v) {
        foundProduct = `${p.name} (${v.color}, ${v.size})`;
        break;
      }
    }

    setScanResult({
      code: codeToScan,
      matched,
      productName: foundProduct || 'Scanned Fashion Item'
    });

    setTimeout(() => {
      onScanSuccess(codeToScan);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#FFFCF5] rounded-3xl overflow-hidden shadow-2xl border border-[#DDD7CA]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 px-6 border-b border-[#DDD7CA] bg-[#172B82] text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl">
                <Scan className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <h3 className="font-bold text-base">Barcode & SKU Scanner</h3>
                <p className="text-xs text-blue-200">WearNear Fulfilment Optics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFlashOn(!flashOn)}
                className={`p-2 rounded-xl border transition-colors ${
                  flashOn ? 'bg-amber-400 text-slate-900 border-amber-300' : 'bg-white/10 text-white border-white/20'
                }`}
                title="Toggle Torch"
              >
                {flashOn ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Camera Feed Viewfinder */}
          <div className="relative aspect-4/3 bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            {isScanning ? (
              <>
                {/* Simulated Camera Feed Overlay */}
                <div className={`absolute inset-0 bg-radial from-slate-800 to-slate-950 ${flashOn ? 'brightness-150' : ''}`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3155D8_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>

                {/* Target Frame Box */}
                <div className="relative w-64 h-44 rounded-2xl border-2 border-dashed border-blue-400/70 bg-blue-500/5 backdrop-blur-[2px] flex items-center justify-center">
                  {/* Corner Accent Markers */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#3155D8] rounded-tl-lg" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#3155D8] rounded-tr-lg" />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#3155D8] rounded-bl-lg" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#3155D8] rounded-br-lg" />

                  {/* Laser Beam */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3155D8] to-transparent shadow-[0_0_12px_#3155D8] animate-scan-laser" />

                  <p className="text-xs text-blue-200/80 font-mono tracking-wider bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-xs">
                    ALIGN BARCODE IN FRAME
                  </p>
                </div>

                {/* Target SKU Banner if specified */}
                {targetSku && (
                  <div className="absolute top-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center text-xs text-white">
                    Target SKU: <span className="font-mono font-bold text-amber-300">{targetSku}</span>
                  </div>
                )}
              </>
            ) : (
              /* Scan Result Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 text-center text-white"
              >
                {scanResult?.matched ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/50 mb-3"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/50 mb-3">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                )}

                <h4 className="text-lg font-bold">
                  {scanResult?.matched ? '✓ BARCODE SCANNED' : '⚠️ MISMATCH DETECTED'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 font-mono">{scanResult?.code}</p>
                <p className="text-sm font-medium text-blue-200 mt-2">{scanResult?.productName}</p>
              </motion.div>
            )}
          </div>

          {/* Quick Simulation Options & Manual Input */}
          <div className="p-4 md:p-6 bg-[#FFFCF5] space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#687085] flex items-center gap-1.5 mb-1.5">
                <Keyboard className="w-3.5 h-3.5" />
                Manual Barcode / SKU Entry
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="Enter SKU or barcode (e.g. WN890123456789)"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#DDD7CA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243FBA] font-mono"
                  />
                  <Search className="w-4 h-4 text-[#687085] absolute left-3 top-3" />
                </div>
                <button
                  onClick={() => manualCode && handleSimulateScan(manualCode)}
                  disabled={!manualCode}
                  className="px-4 py-2.5 bg-[#243FBA] text-white text-sm font-semibold rounded-xl hover:bg-[#172B82] disabled:opacity-50 transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>

            {/* Quick Test Shortcuts */}
            <div className="pt-2 border-t border-[#DDD7CA]">
              <p className="text-[11px] font-semibold text-[#687085] mb-2 uppercase tracking-wider">
                Simulate Camera Scans (Test Shortcuts)
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSimulateScan(expectedBarcode || 'WN890123456789')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium transition-colors"
                >
                  <Box className="w-3.5 h-3.5 text-emerald-600" />
                  Scan Matching Item ({expectedBarcode || 'WN890123456789'})
                </button>

                <button
                  onClick={() => handleSimulateScan('WN890000000999')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 rounded-lg text-xs font-medium transition-colors"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  Simulate Mismatched SKU
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
