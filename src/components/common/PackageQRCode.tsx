import React from 'react';
import { QrCode, Printer, Download, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { PackageItem } from '../../types';

interface PackageQRCodeProps {
  packageData: PackageItem;
  onPrint?: () => void;
  onProceedToHandover?: () => void;
}

export const PackageQRCode: React.FC<PackageQRCodeProps> = ({
  packageData,
  onPrint,
  onProceedToHandover
}) => {
  return (
    <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-elevated max-w-md mx-auto space-y-6 text-center">
      {/* Success Banner */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-[#172033]">PACKAGE SEALED & READY</h3>
        <p className="text-xs text-[#687085] mt-0.5">Shipping label generated for courier pickup</p>
      </div>

      {/* Package Printable Label Card */}
      <div className="p-5 bg-white rounded-2xl border-2 border-slate-900 shadow-md text-left font-sans space-y-4">
        {/* Label Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
          <div>
            <h4 className="font-black text-lg text-slate-900 tracking-wider">WEARNEAR FULFILMENT</h4>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{packageData.storeName}</p>
          </div>
          <span className="bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-1 rounded">EXPRESS</span>
        </div>

        {/* QR & Barcode Section */}
        <div className="flex items-center justify-between gap-4 py-2">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Package ID</p>
            <p className="text-lg font-mono font-extrabold text-slate-900 tracking-tight">{packageData.packageId}</p>
            
            <p className="text-[11px] font-bold text-slate-500 uppercase mt-2">Order Ref</p>
            <p className="text-sm font-mono font-bold text-slate-900">#{packageData.orderId}</p>
          </div>

          <div className="p-2 bg-[#F5F0E6] rounded-xl border border-slate-200">
            <img
              src={packageData.qrCodeUrl}
              alt="Package QR Code"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

        {/* Audit Details */}
        <div className="border-t border-dashed border-slate-300 pt-3 text-[11px] text-slate-600 space-y-1 font-mono">
          <div className="flex justify-between">
            <span>Items Count:</span>
            <span className="font-bold text-slate-900">{packageData.itemsCount} Items</span>
          </div>
          <div className="flex justify-between">
            <span>Evidence Audit:</span>
            <span className="font-bold text-emerald-700">✓ {packageData.evidenceCount}/4 Verified</span>
          </div>
          <div className="flex justify-between">
            <span>Created At:</span>
            <span className="font-bold text-slate-900">{packageData.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onPrint || (() => window.print())}
          className="flex items-center justify-center gap-1.5 px-4 py-3 bg-white text-[#172033] border border-[#DDD7CA] hover:bg-[#F5F0E6] rounded-xl text-xs font-bold transition-colors"
        >
          <Printer className="w-4 h-4 text-[#687085]" />
          Print Label
        </button>

        {onProceedToHandover && (
          <button
            onClick={onProceedToHandover}
            className="flex items-center justify-center gap-1.5 px-4 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            Handover <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
