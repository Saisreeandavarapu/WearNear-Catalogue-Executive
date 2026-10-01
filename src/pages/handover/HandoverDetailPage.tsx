import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { BarcodeScannerModal } from '../../components/common/BarcodeScannerModal';
import { 
  ArrowLeft, 
  Truck, 
  Scan, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  User, 
  History 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HandoverDetailPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const { packages, confirmHandover } = useCatalogue();

  const pkg = packages.find(p => p.packageId === packageId) || packages[0];

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [partnerVerified, setPartnerVerified] = useState<boolean>(pkg.status === 'HANDED_OVER');
  const [handoverDone, setHandoverDone] = useState<boolean>(pkg.status === 'HANDED_OVER');

  const partnerDetails = {
    name: 'Vikram Singh',
    captainId: 'WN-CPT-8812',
    phone: '+91 98112 88990',
    vehicleNumber: 'DL-01-AB-1234',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  };

  const handleScanCaptainQR = () => {
    setIsScannerOpen(false);
    setPartnerVerified(true);
  };

  const handleConfirmHandover = () => {
    confirmHandover(pkg.packageId, partnerDetails.name, partnerDetails.vehicleNumber);
    setHandoverDone(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/handover')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Handover Queue
        </button>

        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Delivery Handover Stage
        </span>
      </div>

      {!handoverDone ? (
        <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-3">
            <div>
              <span className="text-xs font-bold text-[#687085] uppercase tracking-wider">PARCEL HANDOVER</span>
              <h2 className="text-xl font-black font-mono text-[#172033]">{pkg.packageId}</h2>
            </div>
            <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Order #{pkg.orderId}
            </span>
          </div>

          {/* Captain Scan Box */}
          {!partnerVerified ? (
            <div className="p-6 bg-[#F5F0E6] rounded-2xl border border-[#DDD7CA] text-center space-y-3">
              <Truck className="w-12 h-12 text-[#243FBA] mx-auto animate-pulse" />
              <div>
                <h4 className="font-extrabold text-base text-[#172033]">Scan Delivery Captain QR Code</h4>
                <p className="text-xs text-[#687085]">Verify captain ID before releasing sealed parcel</p>
              </div>

              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-6 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                <Scan className="w-4 h-4 text-amber-300" />
                SCAN CAPTAIN QR
              </button>
            </div>
          ) : (
            /* Partner Verified Card */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ✓ PARTNER VERIFIED
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">{partnerDetails.captainId}</span>
              </div>

              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-emerald-200">
                <img
                  src={partnerDetails.photoUrl}
                  alt={partnerDetails.name}
                  className="w-14 h-14 rounded-xl object-cover border border-emerald-200"
                />
                <div>
                  <h4 className="font-black text-base text-slate-900">{partnerDetails.name}</h4>
                  <p className="text-xs text-slate-600 font-mono">Vehicle: {partnerDetails.vehicleNumber}</p>
                  <p className="text-xs text-slate-600 font-mono">Phone: {partnerDetails.phone}</p>
                </div>
              </div>

              <button
                onClick={handleConfirmHandover}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold rounded-xl shadow-md transition-colors"
              >
                CONFIRM HANDOVER
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        /* Handover Success Card */
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#FFFCF5] rounded-3xl border border-emerald-300 p-8 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-[#172033]">✓ HANDOVER CONFIRMED</h3>
            <p className="text-xs text-[#687085] mt-1">Parcel transferred to WearNear delivery fleet</p>
          </div>

          <div className="p-4 bg-[#F5F0E6] rounded-2xl text-xs font-mono space-y-1 text-left max-w-sm mx-auto border border-[#DDD7CA]">
            <div className="flex justify-between">
              <span>Package ID:</span>
              <span className="font-bold text-[#172033]">{pkg.packageId}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Partner:</span>
              <span className="font-bold text-emerald-800">{partnerDetails.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Vehicle No:</span>
              <span className="font-bold text-[#172033]">{partnerDetails.vehicleNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Handover Time:</span>
              <span className="font-bold text-[#172033]">Just Now</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/vendor/catalogue/history')}
            className="px-6 py-3 bg-[#172B82] hover:bg-[#243FBA] text-white text-xs font-extrabold rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <History className="w-4 h-4" /> VIEW AUDIT TIMELINE
          </button>
        </motion.div>
      )}

      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanCaptainQR}
      />
    </div>
  );
};
