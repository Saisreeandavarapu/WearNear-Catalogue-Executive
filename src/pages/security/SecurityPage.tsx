import React, { useState } from 'react';
import { Shield, KeyRound, Lock, CheckCircle2 } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const [twoFa, setTwoFa] = useState(true);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#172033]">Security & Authentication</h2>
        <p className="text-xs text-[#687085]">Password management, 2-factor authentication, and active sessions</p>
      </div>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordSubmit} className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
        <h3 className="font-extrabold text-base text-[#172033] border-b border-[#DDD7CA] pb-2">
          Change Executive Password
        </h3>

        {passwordSaved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Password updated successfully.
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-[#172033] block mb-1">Current Password</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#172033] block mb-1">New Password</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          Update Password
        </button>
      </form>

      {/* 2FA Toggle */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card flex items-center justify-between">
        <div>
          <h4 className="font-extrabold text-sm text-[#172033]">Two-Factor OTP Verification</h4>
          <p className="text-xs text-[#687085]">Require 6-digit OTP code on every new device login</p>
        </div>

        <button
          onClick={() => setTwoFa(!twoFa)}
          className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
            twoFa ? 'bg-emerald-600' : 'bg-slate-300'
          }`}
        >
          <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
            twoFa ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>
    </div>
  );
};
