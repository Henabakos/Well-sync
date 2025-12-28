
import React, { useState } from 'react';
import { UserProfile, ActivityLevel } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    firstName: '',
    lastName: '',
    age: 25,
    gender: 'prefer_not_to_say',
    heightCm: 170,
    weightKg: 70,
    activityLevel: ActivityLevel.MODERATELY_ACTIVE,
    sleepHours: 7,
    stressLevel: 3,
    wellnessPriorities: [],
    dietaryRestrictions: []
  });

  const calculateBMI = (weight: number, height: number) => weight / ((height / 100) ** 2);

  const calculateTDEE = (weight: number, height: number, age: number, activity: ActivityLevel) => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const multiplier = {
      [ActivityLevel.SEDENTARY]: 1.2,
      [ActivityLevel.LIGHTLY_ACTIVE]: 1.375,
      [ActivityLevel.MODERATELY_ACTIVE]: 1.55,
      [ActivityLevel.VERY_ACTIVE]: 1.725
    };
    return Math.round(bmr * multiplier[activity]);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const bmi = calculateBMI(formData.weightKg!, formData.heightCm!);
    const tdee = calculateTDEE(formData.weightKg!, formData.heightCm!, formData.age!, formData.activityLevel!);
    onComplete({ ...formData as UserProfile, id: Math.random().toString(36).substr(2, 9), bmi, tdee });
  };

  const updateField = (field: keyof UserProfile, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const inputClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-[560px] w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-10 md:p-14">
        
        {/* Step Indicator */}
        <div className="flex gap-1.5 mb-14">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-indigo-600' : 'bg-slate-100'}`} />
          ))}
        </div>

        <div className="space-y-8 animate-fadeIn">
          {step === 1 && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Personal Details</h2>
                <p className="text-sm text-slate-500 mt-1">Let's start with your identity for personalization.</p>
              </header>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    value={formData.firstName}
                    onChange={e => updateField('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    value={formData.lastName}
                    onChange={e => updateField('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <header>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Health Metrics</h2>
                <p className="text-sm text-slate-500 mt-1">These values help us calculate your health baseline.</p>
              </header>
              <div className="space-y-10">
                <MetricRange label="Height" value={formData.heightCm || 170} unit="cm" min={100} max={250} onChange={v => updateField('heightCm', v)} />
                <MetricRange label="Weight" value={formData.weightKg || 70} unit="kg" min={30} max={250} onChange={v => updateField('weightKg', v)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Lifestyle Check</h2>
                <p className="text-sm text-slate-500 mt-1">Select the level that best describes your weekly routine.</p>
              </header>
              <div className="space-y-3">
                {[
                  { id: ActivityLevel.SEDENTARY, label: 'Sedentary', desc: 'Minimal activity, desk-based' },
                  { id: ActivityLevel.LIGHTLY_ACTIVE, label: 'Lightly Active', desc: '1-3 sessions of light activity' },
                  { id: ActivityLevel.MODERATELY_ACTIVE, label: 'Moderately Active', desc: '3-5 sessions of moderate activity' },
                  { id: ActivityLevel.VERY_ACTIVE, label: 'Very Active', desc: 'Daily intense training' },
                ].map(level => (
                  <button
                    key={level.id}
                    onClick={() => updateField('activityLevel', level.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.activityLevel === level.id 
                      ? 'border-indigo-600 bg-indigo-50/30' 
                      : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <p className="font-bold text-slate-900 text-sm">{level.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{level.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Core Objectives</h2>
                <p className="text-sm text-slate-500 mt-1">Select your primary wellness focus areas.</p>
              </header>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'weight_loss', label: 'Weight Loss', icon: 'fa-weight-scale' },
                  { id: 'muscle_gain', label: 'Muscle Gain', icon: 'fa-dumbbell' },
                  { id: 'general_fitness', label: 'Fitness', icon: 'fa-heart' },
                  { id: 'mental_focus', label: 'Focus', icon: 'fa-brain' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const current = formData.wellnessPriorities || [];
                      updateField('wellnessPriorities', current.includes(item.id) ? current.filter(x => x !== item.id) : [...current, item.id]);
                    }}
                    className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                      formData.wellnessPriorities?.includes(item.id)
                      ? 'border-indigo-600 bg-indigo-50/30'
                      : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <i className={`fa-light ${item.icon} text-lg ${formData.wellnessPriorities?.includes(item.id) ? 'text-indigo-600' : 'text-slate-400'}`}></i>
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Final Summary</h2>
                <p className="text-sm text-slate-500 mt-1">Review your calculated profile before entering.</p>
              </header>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calculated BMI</span>
                  <span className="text-sm font-bold text-slate-900">{calculateBMI(formData.weightKg!, formData.heightCm!).toFixed(1)} (Healthy)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Calorie Target</span>
                  <span className="text-sm font-bold text-indigo-600">{calculateTDEE(formData.weightKg!, formData.heightCm!, formData.age!, formData.activityLevel!)} kcal</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-10 flex gap-3">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="px-6 py-3 rounded-lg border border-slate-200 text-sm font-bold text-slate-400 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            )}
            <button 
              onClick={step === 5 ? handleSubmit : nextStep}
              className="flex-1 px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              {step === 5 ? 'Launch Navigator' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricRange = ({ label, value, unit, min, max, onChange }: { label: string, value: number, unit: string, min: number, max: number, onChange: (v: number) => void }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
      <span className="text-sm font-bold text-slate-900">{value} {unit}</span>
    </div>
    <input 
      type="range" min={min} max={max} 
      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      value={value}
      onChange={e => onChange(parseInt(e.target.value))}
    />
  </div>
);

export default Onboarding;
