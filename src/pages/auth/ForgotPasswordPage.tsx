import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ArrowLeft, Send } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 md:p-8 shadow-2xl space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#F5F0E6] text-[#243FBA] flex items-center justify-center mx-auto border border-[#DDD7CA]">
          <KeyRound className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-xl font-black text-[#172033]">Reset Password</h2>
          <p className="text-xs text-[#687085] mt-1">Enter your registered email address to receive password reset instructions.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-[#172033] block mb-1">Executive Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya.sharma@wearnear.com"
                required
                className="w-full px-3 py-2.5 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              Send Reset Link
              <Send className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-medium">
            Reset link has been dispatched to <strong>{email || 'your email'}</strong>. Please inspect your inbox.
          </div>
        )}

        <button
          onClick={() => navigate('/vendor/login')}
          className="inline-flex items-center gap-1.5 text-xs text-[#243FBA] font-bold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </button>
      </div>
    </div>
  );
};
