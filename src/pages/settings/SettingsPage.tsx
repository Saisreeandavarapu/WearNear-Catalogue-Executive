import React from 'react';
import { Settings, Bell, Scan, Store, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'Executive Profile', desc: 'Personal credentials and store employee ID', path: '/vendor/catalogue/profile', icon: Settings },
    { title: 'Scanner & Hardware', desc: 'Camera sensitivity, torch auto-toggle, beep feedback', path: '/vendor/catalogue/scanner', icon: Scan },
    { title: 'Operational Alerts', desc: 'Sound, push, and priority order notifications', path: '/vendor/catalogue/notifications', icon: Bell },
    { title: 'Security & Password', desc: '2FA authentication and session history', path: '/vendor/catalogue/security', icon: Shield },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#172033]">Catalogue Settings</h2>
        <p className="text-xs text-[#687085]">App preferences, scanner sensitivity, and store configurations</p>
      </div>

      <div className="space-y-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              onClick={() => navigate(s.path)}
              className="p-4 bg-[#FFFCF5] hover:bg-white rounded-2xl border border-[#DDD7CA] shadow-card flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5F0E6] text-[#243FBA] rounded-xl">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#172033]">{s.title}</h4>
                  <p className="text-xs text-[#687085]">{s.desc}</p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#687085]" />
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-[#DDD7CA]">
        <button
          onClick={() => navigate('/vendor/login')}
          className="w-full p-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out of Executive Workspace
        </button>
      </div>
    </div>
  );
};
