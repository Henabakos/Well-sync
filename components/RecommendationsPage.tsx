
import React, { useState } from 'react';
import { Recommendation, UserProfile, Goal } from '../types';
import { generatePersonalizedRecommendations } from '../services/geminiService';

interface RecommendationsPageProps {
  recommendations: Recommendation[];
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
  profile: UserProfile;
  goals: Goal[];
}

const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ recommendations, setRecommendations, profile, goals }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newRecs = await generatePersonalizedRecommendations(profile, goals);
      setRecommendations(newRecs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Navigator</h1>
          <p className="text-sm text-slate-500 mt-1">Heuristic health strategies derived from your current metrics.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <i className="fa-light fa-spinner-third animate-spin"></i> : <i className="fa-light fa-sparkles"></i>}
          {loading ? 'Analyzing Data...' : 'Sync AI Pilot'}
        </button>
      </div>

      <div className="space-y-6">
        {recommendations.length > 0 ? recommendations.map(rec => (
          <div key={rec.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-100 transition-colors flex flex-col md:flex-row">
            <div className="md:w-64 p-8 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
              <div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mb-4 ${
                  rec.type === 'nutrition' ? 'bg-emerald-600' : 
                  rec.type === 'fitness' ? 'bg-indigo-600' : 
                  'bg-rose-600'
                }`}>
                  <i className={`fa-light ${
                    rec.type === 'nutrition' ? 'fa-carrot' : 
                    rec.type === 'fitness' ? 'fa-dumbbell' : 'fa-brain'
                  }`}></i>
                </div>
                <h3 className="text-sm font-bold text-slate-900 capitalize">{rec.type} Pillar</h3>
                <div className="mt-2 inline-flex items-center text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {Math.round(rec.confidenceScore * 100)}% Context Match
                </div>
              </div>
              
              <div className="mt-8 hidden md:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logic Source</p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Cross-referenced with your daily active goals and BMI metrics.</p>
              </div>
            </div>

            <div className="flex-1 p-8">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Strategy</h4>
              <p className="text-slate-700 text-sm leading-relaxed font-medium mb-8">
                {rec.content}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Direct Actions</h4>
                  <ul className="space-y-3">
                    {rec.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rationale</h4>
                  <p className="text-xs text-slate-500 italic leading-relaxed">{rec.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-24 text-center bg-white border border-slate-200 border-dashed rounded-xl">
            <i className="fa-light fa-radar text-4xl text-slate-200 mb-6 block"></i>
            <h3 className="text-lg font-bold text-slate-900">Intelligence Pipeline Inactive</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2">Generate your tailored wellness roadmap by syncing your latest health data with the AI Pilot.</p>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
            <i className="fa-light fa-shield-check text-sm"></i>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Localized Knowledge</p>
            <p className="text-[10px] text-slate-500 font-medium">All insights are optimized for the context of Addis Ababa, Ethiopia.</p>
          </div>
        </div>
        <div className="text-[10px] font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
          Last Sync: {recommendations.length > 0 ? 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Never'}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
