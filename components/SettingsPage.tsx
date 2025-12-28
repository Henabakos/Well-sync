
import React from 'react';
import { UserProfile, ActivityLevel } from '../types';

interface SettingsPageProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ profile, setProfile }) => {
  const handleChange = (field: keyof UserProfile, value: any) => {
    const newProfile = { ...profile, [field]: value };
    
    if (['weightKg', 'heightCm', 'age', 'activityLevel'].includes(field)) {
      const heightInM = newProfile.heightCm / 100;
      newProfile.bmi = newProfile.weightKg / (heightInM * heightInM);
      
      const bmr = 10 * newProfile.weightKg + 6.25 * newProfile.heightCm - 5 * newProfile.age + 5;
      const multiplier = {
        [ActivityLevel.SEDENTARY]: 1.2,
        [ActivityLevel.LIGHTLY_ACTIVE]: 1.375,
        [ActivityLevel.MODERATELY_ACTIVE]: 1.55,
        [ActivityLevel.VERY_ACTIVE]: 1.725
      };
      newProfile.tdee = Math.round(bmr * multiplier[newProfile.activityLevel]);
    }
    
    setProfile(newProfile);
  };

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all";

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your health profile and algorithm preferences.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fa-light fa-user-gear"></i>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Physical Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="grid grid-cols-2 gap-2">
                   <input 
                    type="text"
                    className={inputClasses}
                    value={profile.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    placeholder="First Name"
                  />
                  <input 
                    type="text"
                    className={inputClasses}
                    value={profile.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Biological Gender</label>
                <select 
                  className={inputClasses}
                  value={profile.gender}
                  onChange={e => handleChange('gender', e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Age (Years)</label>
                <input 
                  type="number"
                  className={inputClasses}
                  value={profile.age}
                  onChange={e => handleChange('age', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                <input 
                  type="number"
                  className={inputClasses}
                  value={profile.heightCm}
                  onChange={e => handleChange('heightCm', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                <input 
                  type="number"
                  className={inputClasses}
                  value={profile.weightKg}
                  onChange={e => handleChange('weightKg', parseInt(e.target.value))}
                />
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fa-light fa-bolt"></i>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Activity & Lifestyle</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: ActivityLevel.SEDENTARY, label: 'Sedentary', desc: 'Minimal physical effort' },
                { id: ActivityLevel.LIGHTLY_ACTIVE, label: 'Lightly Active', desc: 'Light exercise 1-3 days' },
                { id: ActivityLevel.MODERATELY_ACTIVE, label: 'Moderately Active', desc: 'Active 3-5 days/week' },
                { id: ActivityLevel.VERY_ACTIVE, label: 'Very Active', desc: 'Intense 6-7 days/week' },
              ].map(level => (
                <button
                  key={level.id}
                  onClick={() => handleChange('activityLevel', level.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all group ${
                    profile.activityLevel === level.id 
                    ? 'border-indigo-600 bg-indigo-50/20' 
                    : 'border-slate-50 hover:border-slate-100 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900">{level.label}</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${profile.activityLevel === level.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200'}`}>
                      {profile.activityLevel === level.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{level.desc}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <i className="fa-light fa-chart-line text-8xl -rotate-12"></i>
             </div>
             <h3 className="text-sm font-bold mb-8 relative z-10">Diagnostic Vitals</h3>
             <div className="space-y-8 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Body Mass Index</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-black text-white">{profile.bmi.toFixed(1)}</p>
                  <span className="text-xs font-bold text-emerald-400 mb-1.5 capitalize">Normal</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Daily Energy Expenditure</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-black text-indigo-400">{profile.tdee}</p>
                  <span className="text-xs font-bold text-indigo-300 mb-1.5 uppercase">Kcal / Day</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Security & Access</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <span className="text-sm font-medium text-slate-600">Change Password</span>
                <i className="fa-light fa-chevron-right text-xs text-slate-400"></i>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <span className="text-sm font-medium text-slate-600">Privacy Policy</span>
                <i className="fa-light fa-chevron-right text-xs text-slate-400"></i>
              </button>
            </div>
          </div>
          
          <button className="w-full py-4 bg-white border border-rose-100 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-50 transition-all hover:border-rose-200 shadow-sm">
            <i className="fa-light fa-trash-xmark mr-2"></i>
            Purge All Platform Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
