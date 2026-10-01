import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Scan,
  Box,
  Layers,
  PackageCheck,
  Package,
  Truck,
  Warehouse,
  Tags,
  History,
  Bell,
  User,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';
import logoImg from '../../assets/logo.png';

const navigationItems = [
  { name: 'Dashboard', path: '/vendor/catalogue/dashboard', icon: LayoutDashboard },
  { name: 'Orders', path: '/vendor/catalogue/orders', icon: ShoppingBag, badge: '5' },
  { name: 'Scanner', path: '/vendor/catalogue/scanner', icon: Scan },
  { name: 'Packages', path: '/vendor/catalogue/packages', icon: Package },
  { name: 'Handover', path: '/vendor/catalogue/handover', icon: Truck },
  { name: 'Inventory', path: '/vendor/catalogue/inventory', icon: Warehouse },
  { name: 'Products', path: '/vendor/catalogue/products', icon: Tags },
  { name: 'History', path: '/vendor/catalogue/history', icon: History },
  { name: 'Notifications', path: '/vendor/catalogue/notifications', icon: Bell, badge: '2' },
  { name: 'Profile', path: '/vendor/catalogue/profile', icon: User },
  { name: 'Settings', path: '/vendor/catalogue/settings', icon: Settings },
  { name: 'Security', path: '/vendor/catalogue/security', icon: Shield },
];

export const CatalogueSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { profile } = useCatalogue();

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="hidden md:flex flex-col bg-[#172B82] text-white min-h-screen z-30 shadow-2xl relative select-none shrink-0"
    >
      {/* Sidebar Top Header & Logo */}
      <div className={`h-16 flex items-center border-b border-white/10 ${
        isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
      }`}>
        <div 
          onClick={() => isCollapsed && setIsCollapsed(false)}
          className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'cursor-pointer' : ''}`}
          title={isCollapsed ? 'Click to expand sidebar' : 'WearNear Catalogue'}
        >
          {/* WearNear Logo Image */}
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 p-1 flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105">
            <img
              src={logoImg}
              alt="WearNear Logo"
              className="w-full h-full object-contain filter drop-shadow-sm"
              onError={(e) => {
                // Fallback if image fails to render
                e.currentTarget.src = '/logo.png';
              }}
            />
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col min-w-0"
            >
              <span className="font-black text-lg tracking-wider font-sans text-white leading-none">
                WEARNEAR
              </span>
              <span className="text-[10px] font-semibold text-blue-200 uppercase tracking-widest mt-0.5">
                Catalogue Executive
              </span>
            </motion.div>
          )}
        </div>

        {/* Expand / Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 ${
            isCollapsed ? 'hidden' : 'block'
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Expand trigger button when collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-full py-2 bg-white/5 hover:bg-white/10 text-blue-200 hover:text-white flex items-center justify-center text-xs transition-colors border-b border-white/10"
          title="Expand Sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-2.5 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative flex items-center ${
                isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3.5 py-2.5'
              } rounded-xl font-medium text-xs transition-all group ${
                isActive
                  ? 'bg-[#243FBA] text-white shadow-md font-bold'
                  : 'text-blue-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${
                isActive ? 'text-amber-300' : 'text-blue-200 group-hover:text-white'
              }`} />
              
              {!isCollapsed && (
                <span className="truncate flex-1">{item.name}</span>
              )}

              {!isCollapsed && item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-blue-900 text-blue-200'
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Tooltip on Hover when Sidebar Collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.name}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Executive Profile */}
      <div className={`p-3 border-t border-white/10 bg-white/5 ${
        isCollapsed ? 'flex justify-center' : ''
      }`}>
        <div className="flex items-center gap-3">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-9 h-9 rounded-xl object-cover border border-white/20 shrink-0"
          />
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate text-white">{profile.name}</p>
              <p className="text-[10px] text-blue-200 truncate">{profile.employeeId}</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
