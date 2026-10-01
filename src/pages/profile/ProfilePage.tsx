import React from 'react';
import { useCatalogue } from '../../context/CatalogueContext';
import { User, Store, ShieldCheck, Mail, Phone, Award } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile } = useCatalogue();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#172033]">Executive Account Profile</h2>
        <p className="text-xs text-[#687085]">Assigned store details, employee credentials, and metrics</p>
      </div>

      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#DDD7CA]">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-24 h-24 rounded-3xl object-cover border-2 border-[#243FBA] shadow-md"
          />

          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl font-extrabold text-[#172033]">{profile.name}</h3>
            <p className="text-xs font-mono font-bold text-[#243FBA]">{profile.employeeId}</p>
            <p className="text-xs font-semibold text-[#687085]">{profile.role}</p>
            <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full mt-1">
              Active Shift Authorized
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-[#DDD7CA] space-y-1">
            <span className="text-[#687085] font-semibold flex items-center gap-1">
              <Store className="w-4 h-4 text-[#243FBA]" /> Assigned Store
            </span>
            <p className="font-extrabold text-sm text-[#172033]">{profile.storeName}</p>
            <p className="font-mono text-[#687085]">{profile.storeId}</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#DDD7CA] space-y-1">
            <span className="text-[#687085] font-semibold flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" /> Shift Fulfilment Accuracy
            </span>
            <p className="font-extrabold text-2xl text-emerald-700">{profile.accuracyRate}</p>
            <p className="text-[#687085]">14 Orders Fulfilled Today</p>
          </div>
        </div>

        <div className="p-4 bg-[#F5F0E6] rounded-2xl border border-[#DDD7CA] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#687085] flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email:</span>
            <span className="font-bold text-[#172033]">{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#687085] flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Mobile:</span>
            <span className="font-bold text-[#172033]">{profile.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
