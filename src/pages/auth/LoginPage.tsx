import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('priya.sharma@wearnear.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vendor/catalogue/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 md:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#172B82] p-2 flex items-center justify-center mx-auto shadow-md border border-white/20">
            <img
              src={logoImg}
              alt="WearNear Logo"
              className="w-full h-full object-contain filter drop-shadow-sm"
              onError={(e) => { e.currentTarget.src = '/logo.png'; }}
            />
          </div>
          <h1 className="text-2xl font-black text-[#172033] tracking-wide">WEARNEAR</h1>
          <p className="text-xs font-bold text-[#243FBA] uppercase tracking-widest">
            Catalogue Executive Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">
              Store Executive Email / Employee ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
              <Mail className="w-4 h-4 text-[#687085] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#172033]">Password</label>
              <button
                type="button"
                onClick={() => navigate('/vendor/forgot-password')}
                className="text-xs text-[#243FBA] font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
              <Lock className="w-4 h-4 text-[#687085] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors mt-2"
          >
            Sign In to Store Workspace
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#DDD7CA] text-center text-xs text-[#687085]">
          Need an executive account?{' '}
          <button
            onClick={() => navigate('/vendor/register')}
            className="text-[#243FBA] font-bold hover:underline"
          >
            Register Store Staff
          </button>
        </div>
      </div>
    </div>
  );
};
