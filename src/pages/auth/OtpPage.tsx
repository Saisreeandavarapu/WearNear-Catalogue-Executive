import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['5', '8', '2', '1', '9', '4']);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vendor/catalogue/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 md:p-8 shadow-2xl space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-black text-[#172033]">2-Factor Authentication</h2>
          <p className="text-xs text-[#687085] mt-1">Enter the 6-digit security code sent to your registered store mobile number.</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const newOtp = [...otp];
                  newOtp[idx] = e.target.value;
                  setOtp(newOtp);
                }}
                className="w-11 h-12 text-center text-lg font-mono font-bold bg-white border-2 border-[#DDD7CA] focus:border-[#243FBA] rounded-xl outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            Verify & Continue to Workspace
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-[#687085]">
          Didn't receive code? <button className="text-[#243FBA] font-bold">Resend OTP</button>
        </p>
      </div>
    </div>
  );
};
