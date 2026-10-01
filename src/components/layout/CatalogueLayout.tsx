import React from 'react';
import { Outlet } from 'react-router-dom';
import { CatalogueSidebar } from './CatalogueSidebar';
import { CatalogueHeader } from './CatalogueHeader';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { useCatalogue } from '../../context/CatalogueContext';
import { OfflineBanner } from '../common/OfflineBanner';

export const CatalogueLayout: React.FC = () => {
  const { profile } = useCatalogue();

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex flex-col md:flex-row text-[#172033] font-sans antialiased selection:bg-[#243FBA] selection:text-white">
      {/* Desktop Navy Sidebar */}
      <CatalogueSidebar />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Top Header */}
        <MobileHeader />

        {/* Desktop Header */}
        <CatalogueHeader />

        {/* Connectivity Banner */}
        <OfflineBanner isOffline={!profile.isOnline} />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-safe">
          <Outlet />
        </main>

        {/* Mobile Fixed Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
