import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Store } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';
import logoImg from '../../assets/logo.png';

export const MobileHeader: React.FC = () => {
  const navigate = useNavigate();
  const { profile, notifications } = useCatalogue();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="md:hidden sticky top-0 z-30 bg-[#172B82] text-white px-4 py-3 shadow-md flex items-center justify-between">
      {/* Brand Logo & Store Badge */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 p-1 flex items-center justify-center shrink-0 shadow-sm">
          <img
            src={logoImg}
            alt="WearNear Logo"
            className="w-full h-full object-contain filter drop-shadow-sm"
            onError={(e) => {
              e.currentTarget.src = '/logo.png';
            }}
          />
        </div>
        <div>
          <span className="font-extrabold text-sm tracking-wider font-sans block leading-none text-white">
            WEARNEAR
          </span>
          <span className="text-[10px] text-blue-200 font-medium truncate block max-w-[160px] mt-0.5">
            {profile.storeName}
          </span>
        </div>
      </div>

      {/* Online Status & Notification */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ONLINE
        </span>

        <button
          onClick={() => navigate('/vendor/catalogue/notifications')}
          className="relative p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
