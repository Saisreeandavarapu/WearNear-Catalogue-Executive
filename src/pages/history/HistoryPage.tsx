import React from 'react';
import { Timeline } from '../../components/common/Timeline';

export const HistoryPage: React.FC = () => {
  const historySteps = [
    { id: '1', title: 'Product Verified', timestamp: '12:12 PM Today', description: 'Barcode WN890123456789 matched against order #WN10245', isCompleted: true },
    { id: '2', title: 'Quantity Verified', timestamp: '12:14 PM Today', description: '1/1 units verified by Priya Sharma', isCompleted: true },
    { id: '3', title: 'Packing Completed', timestamp: '12:20 PM Today', description: 'Standard Eco Pouch sealed with 4 evidence photos captured', isCompleted: true },
    { id: '4', title: 'Package Created', timestamp: '12:27 PM Today', description: 'Shipping label PKG-WN10245-01 generated', isCompleted: true },
    { id: '5', title: 'Handover Confirmed', timestamp: '12:48 PM Today', description: 'Parcels transferred to Delivery Captain Vikram Singh (DL-01-AB-1234)', isCompleted: true },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#172033]">Fulfilment Audit History</h2>
        <p className="text-xs text-[#687085]">Chronological timeline of store executive activities and barcode scans</p>
      </div>

      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6">
        <h3 className="font-extrabold text-base text-[#172033] border-b border-[#DDD7CA] pb-3">
          Shift Audit Logs • Today
        </h3>

        <Timeline steps={historySteps} />
      </div>
    </div>
  );
};
