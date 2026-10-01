import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Scan, PackageCheck, MoreHorizontal } from 'lucide-react';
import { MoreBottomSheet } from './MoreBottomSheet';

export const MobileBottomNav: React.FC = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFCF5] border-t border-[#DDD7CA] px-3 py-2 shadow-2xl mb-safe">
        <div className="flex items-center justify-around relative">
          {/* Home */}
          <NavLink
            to="/vendor/catalogue/dashboard"
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
              isActive ? 'text-[#243FBA]' : 'text-[#687085]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Home</span>
          </NavLink>

          {/* Orders */}
          <NavLink
            to="/vendor/catalogue/orders"
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
              isActive ? 'text-[#243FBA]' : 'text-[#687085]'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Orders</span>
          </NavLink>

          {/* Prominent Floating Scan Action Button */}
          <NavLink
            to="/vendor/catalogue/scanner"
            className="flex flex-col items-center -mt-6 group"
          >
            <div className="w-14 h-14 rounded-full bg-[#243FBA] text-white flex items-center justify-center shadow-lg border-4 border-[#F5F0E6] group-hover:bg-[#172B82] transition-transform active:scale-95">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-black text-[#243FBA] mt-0.5 uppercase tracking-wider">
              Scan
            </span>
          </NavLink>

          {/* Packing / Packages */}
          <NavLink
            to="/vendor/catalogue/packages"
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
              isActive ? 'text-[#243FBA]' : 'text-[#687085]'
            }`}
          >
            <PackageCheck className="w-5 h-5" />
            <span>Packing</span>
          </NavLink>

          {/* More Drawer */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-[#687085] hover:text-[#243FBA] transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
            <span>More</span>
          </button>
        </div>
      </nav>

      {/* Bottom Sheet Drawer */}
      <MoreBottomSheet isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
    </>
  );
};
