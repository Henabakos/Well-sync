
import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="hidden sm:block">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Addis Ababa, ET</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-slate-900">{profile.firstName} {profile.lastName}</span>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Premium Member</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
          {profile.firstName[0]}
        </div>
      </div>
    </header>
  );
};

export default Header;
