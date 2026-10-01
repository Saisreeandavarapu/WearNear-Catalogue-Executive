import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Store, ShieldCheck, User } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';

export const CatalogueHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, toggleStoreOnline, notifications } = useCatalogue();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Operational Dashboard';
    if (path.includes('/orders')) return 'Customer Orders & Fulfilment';
    if (path.includes('/scanner')) return 'Barcode & SKU Scanner';
    if (path.includes('/products')) return 'Product Catalogue Management';
    if (path.includes('/barcodes')) return 'Barcode Registry';
    if (path.includes('/inventory')) return 'Real-Time Inventory Operations';
    if (path.includes('/packages')) return 'Package Registry';
    if (path.includes('/handover')) return 'Delivery Captain Handover';
    if (path.includes('/history')) return 'Audit Logs & History';
    if (path.includes('/notifications')) return 'Operational Alerts';
    if (path.includes('/profile')) return 'Executive Profile';
    if (path.includes('/settings')) return 'Store Settings';
    if (path.includes('/security')) return 'Security & Access';
    return 'Catalogue Executive';
  };

  return (
    <header className="hidden md:flex h-16 bg-[#FFFCF5] border-b border-[#DDD7CA] px-6 items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Title & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#687085]">
          <span>WearNear Vendor</span>
          <span>/</span>
          <span className="font-semibold text-[#172033]">{getPageTitle()}</span>
        </div>
        <h1 className="text-lg font-extrabold text-[#172033] -mt-0.5 tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Store Selector, Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search Order # or SKU..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#DDD7CA] rounded-xl text-xs text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#243FBA]"
          />
          <Search className="w-3.5 h-3.5 text-[#687085] absolute left-3 top-2.5" />
        </div>

        {/* Store Active Status Pill */}
        <div className="flex items-center gap-2 bg-[#F5F0E6] px-3 py-1.5 rounded-xl border border-[#DDD7CA]">
          <Store className="w-4 h-4 text-[#243FBA]" />
          <div className="text-left">
            <p className="text-xs font-bold text-[#172033] leading-none">{profile.storeName}</p>
            <button
              onClick={toggleStoreOnline}
              className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 mt-0.5"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${profile.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {profile.isOnline ? 'Store Active' : 'Store Offline'}
            </button>
          </div>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/vendor/catalogue/notifications')}
          className="relative p-2.5 rounded-xl bg-white border border-[#DDD7CA] hover:bg-[#F5F0E6] text-[#172033] transition-colors"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Card Header */}
        <div 
          onClick={() => navigate('/vendor/catalogue/profile')}
          className="flex items-center gap-2.5 pl-2 border-l border-[#DDD7CA] cursor-pointer hover:opacity-90"
        >
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-9 h-9 rounded-xl object-cover border border-[#DDD7CA]"
          />
          <div className="text-left leading-tight">
            <p className="text-xs font-bold text-[#172033]">{profile.name}</p>
            <p className="text-[10px] text-[#687085] font-mono">{profile.employeeId}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
