import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, User, Store, Phone, Lock } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vendor/otp');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 md:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#172B82] text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <h1 className="text-2xl font-black text-[#172033] tracking-wide">WEARNEAR</h1>
          <p className="text-xs font-bold text-[#243FBA] uppercase tracking-widest">
            Executive Registration
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              required
              className="w-full px-3 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Assigned Store Code</label>
            <input
              type="text"
              placeholder="e.g. WN-STR-DELHI-04"
              required
              className="w-full px-3 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Mobile Phone</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              required
              className="w-full px-3 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              required
              className="w-full px-3 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            Send OTP Verification
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-3 border-t border-[#DDD7CA] text-center text-xs text-[#687085]">
          Already registered?{' '}
          <button
            onClick={() => navigate('/vendor/login')}
            className="text-[#243FBA] font-bold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
