import React from 'react';
import { useCatalogue } from '../../context/CatalogueContext';
import { Bell, Check, ShoppingBag, Warehouse, Truck } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useCatalogue();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Operational Alerts</h2>
          <p className="text-xs text-[#687085]">Real-time store alerts, new orders, and low-stock warnings</p>
        </div>

        <button className="text-xs text-[#243FBA] font-bold hover:underline">
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              !n.isRead
                ? 'bg-blue-50/60 border-blue-200 shadow-xs'
                : 'bg-[#FFFCF5] border-[#DDD7CA]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${
                  n.type === 'order' ? 'bg-[#243FBA] text-white' : 'bg-amber-500 text-white'
                }`}>
                  {n.type === 'order' ? <ShoppingBag className="w-4 h-4" /> : <Warehouse className="w-4 h-4" />}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-[#172033]">{n.title}</h4>
                  <p className="text-xs text-[#687085] mt-0.5">{n.message}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-[#687085]">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
