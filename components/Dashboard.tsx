
import React, { useMemo } from 'react';
import { UserProfile, Goal, ProgressEntry, Recommendation, DailyCheckin } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  profile: UserProfile;
  goals: Goal[];
  progress: ProgressEntry[];
  recommendations: Recommendation[];
  dailyCheckin: DailyCheckin | null;
  onCheckin: (checkin: DailyCheckin) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, goals, progress, recommendations, dailyCheckin, onCheckin }) => {
  const chartData = useMemo(() => {
    if (progress.length === 0) return [
      { date: 'Mon', value: 75 }, { date: 'Tue', value: 74.8 }, { date: 'Wed', value: 74.5 },
      { date: 'Thu', value: 74.2 }, { date: 'Fri', value: 74.0 }, { date: 'Sat', value: 73.8 }, { date: 'Sun', value: 73.5 },
    ];
    return progress.slice(-7).map(p => ({
      date: new Date(p.date).toLocaleDateString(undefined, { weekday: 'short' }),
      value: p.valueNumeric
    }));
  }, [progress]);

  const activeGoals = goals.filter(g => g.status === 'active');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Section: Welcome & Daily Checkin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Good Morning, {profile.firstName}</h1>
            <p className="text-slate-500 text-sm">Your health navigator is synced and ready.</p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <QuickStat label="BMI Status" value="Healthy" subValue={profile.bmi.toFixed(1)} />
            <QuickStat label="Goal Progress" value="45%" subValue={`${activeGoals.length} Active`} />
            <QuickStat label="Daily Budget" value={`${profile.tdee}`} subValue="kcal" />
            <QuickStat label="Health Score" value="82" subValue="/ 100" />
          </div>
        </div>

        <div className="bg-indigo-600 rounded-xl p-6 text-white flex flex-col justify-between">
          <h3 className="font-bold text-lg mb-4">Daily Check-in</h3>
          {!dailyCheckin?.completed ? (
            <div className="space-y-4">
              <p className="text-indigo-100 text-sm">Log your vitals to update your AI recommendations for today.</p>
              <button 
                onClick={() => onCheckin({ id: '1', date: new Date().toISOString(), mood: 4, energy: 3, waterLiters: 1.5, completed: true })}
                className="w-full py-3 bg-white text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors"
              >
                Start Log
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-check text-xs"></i>
                </div>
                <span className="text-sm font-medium">Logged for Today</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                <div className="bg-indigo-700/50 p-2 rounded">Mood: Good</div>
                <div className="bg-indigo-700/50 p-2 rounded">Water: 1.5L</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Weight Trend</h3>
            <span className="text-xs font-medium text-slate-500">Last 7 Days</span>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4f46e5" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Objectives Stack */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-6">Current Objectives</h3>
          <div className="space-y-5">
            {activeGoals.slice(0, 3).map(goal => (
              <div key={goal.id} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700">{goal.title}</span>
                  <span className="text-xs text-slate-400">{goal.targetValue} {goal.unit}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: '45%' }}></div>
                </div>
              </div>
            ))}
            {activeGoals.length === 0 && <p className="text-sm text-slate-400 italic">No active objectives.</p>}
          </div>
        </div>
      </div>

      {/* AI Insights Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900">AI Pilot Intelligence</h3>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All Insights</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.length > 0 ? recommendations.slice(0, 3).map(rec => (
            <div key={rec.id} className="p-4 border border-slate-100 rounded-lg hover:border-indigo-100 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-900`}>
                  <i className={`fa-light ${rec.type === 'nutrition' ? 'fa-carrot' : rec.type === 'fitness' ? 'fa-dumbbell' : 'fa-brain'}`}></i>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{rec.type}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{rec.content}</p>
            </div>
          )) : (
            <div className="col-span-3 text-center py-6 text-slate-400 text-sm">
              Generate daily insights in the AI Navigator tab.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ label, value, subValue }: { label: string, value: string, subValue: string }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-xl font-bold text-slate-900">{value}</p>
    <p className="text-[10px] font-medium text-slate-500">{subValue}</p>
  </div>
);

export default Dashboard;
