import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Warehouse,
  Tags,
  QrCode,
  PackageCheck,
  Truck,
  History,
  Bell,
  User,
  Settings,
  Shield,
  LogOut,
  X
} from 'lucide-react';

interface MoreBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const moreItems = [
  { name: 'Inventory Management', path: '/vendor/catalogue/inventory', icon: Warehouse },
  { name: 'Product Catalogue', path: '/vendor/catalogue/products', icon: Tags },
  { name: 'Barcode Registry', path: '/vendor/catalogue/barcodes', icon: QrCode },
  { name: 'Package Registry', path: '/vendor/catalogue/packages', icon: PackageCheck },
  { name: 'Delivery Handover', path: '/vendor/catalogue/handover', icon: Truck },
  { name: 'Audit History', path: '/vendor/catalogue/history', icon: History },
  { name: 'Notifications', path: '/vendor/catalogue/notifications', icon: Bell },
  { name: 'Executive Profile', path: '/vendor/catalogue/profile', icon: User },
  { name: 'Store Settings', path: '/vendor/catalogue/settings', icon: Settings },
  { name: 'Security & Access', path: '/vendor/catalogue/security', icon: Shield },
];

export const MoreBottomSheet: React.FC<MoreBottomSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="bg-[#FFFCF5] rounded-t-3xl border-t border-[#DDD7CA] p-5 shadow-2xl max-h-[85vh] flex flex-col mb-safe"
        >
          {/* Grab Handle */}
          <div className="w-12 h-1.5 bg-[#DDD7CA] rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#DDD7CA]">
            <h3 className="font-extrabold text-base text-[#172033]">Fulfilment & Operations</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#F5F0E6] text-[#687085] hover:text-[#172033]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links Grid */}
          <div className="py-4 grid grid-cols-2 gap-2.5 overflow-y-auto max-h-[60vh]">
            {moreItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center gap-3 p-3 rounded-2xl border text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#172B82] text-white border-[#172B82] shadow-md'
                      : 'bg-[#F5F0E6]/60 text-[#172033] border-[#DDD7CA] hover:border-[#243FBA]/40'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white/20 text-current">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Footer Logout */}
          <div className="pt-3 border-t border-[#DDD7CA]">
            <NavLink
              to="/vendor/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-xs font-bold w-full"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Executive Account
            </NavLink>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
