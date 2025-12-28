
import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-indigo-100">
      <div className="max-w-[440px] w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-8 md:p-10">
        <div className="mb-10 text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-100">
            W
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {isLogin ? 'Enter your details to access your health navigator' : 'Start your personalized health journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className={inputClasses}
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
              {isLogin && <button type="button" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700">Forgot?</button>}
            </div>
            <input 
              type="password" 
              required
              className={inputClasses}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
          >
            {isLogin ? 'Sign in to Well-Sync' : 'Get started for free'}
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-300 tracking-widest">
              <span className="bg-white px-4">Continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <i className="fab fa-google text-red-500"></i> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <i className="fab fa-apple text-slate-900"></i> Apple
            </button>
          </div>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors text-center"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
