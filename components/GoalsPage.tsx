
import React, { useState } from 'react';
import { Goal, GoalType } from '../types';

interface GoalsPageProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

const GoalsPage: React.FC<GoalsPageProps> = ({ goals, setGoals }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Goal>>({
    title: '',
    description: '',
    type: GoalType.WEIGHT_LOSS,
    targetValue: 0,
    unit: 'kg',
    targetDate: ''
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '', type: GoalType.WEIGHT_LOSS, targetValue: 0, unit: 'kg', targetDate: '' });
  };

  const handleEdit = (goal: Goal) => {
    setFormData(goal);
    setEditingId(goal.id);
    setShowForm(true);
  };

  const addGoal = () => {
    if (!formData.title || !formData.targetDate) return;
    
    if (editingId) {
      setGoals(goals.map(g => g.id === editingId ? { ...g, ...formData } as Goal : g));
    } else {
      const newGoal: Goal = {
        ...formData as Goal,
        id: Math.random().toString(36).substr(2, 9),
        userId: 'current-user',
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      setGoals([...goals, newGoal]);
    }
    resetForm();
  };

  const removeGoal = (id: string) => {
    if (window.confirm('Remove this objective?')) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300";

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Objectives</h1>
          <p className="text-sm text-slate-500 mt-1">Define and track your long-term wellness milestones.</p>
        </div>
        <button 
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <i className={`fa-light ${showForm ? 'fa-xmark' : 'fa-plus'}`}></i>
          {showForm ? 'Cancel' : 'New Objective'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm animate-slideDown">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900">{editingId ? 'Update Objective' : 'Configure Objective'}</h2>
            <p className="text-xs text-slate-500 mt-1">Fill in the targets for your health goal.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Goal Title</label>
              <input 
                type="text" 
                placeholder="e.g., Reach target weight"
                className={inputClasses}
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                className={inputClasses}
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as GoalType})}
              >
                <option value={GoalType.WEIGHT_LOSS}>Weight Loss</option>
                <option value={GoalType.FITNESS}>Performance</option>
                <option value={GoalType.NUTRITION}>Nutrition</option>
                <option value={GoalType.MENTAL_WELLNESS}>Mental Health</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Value</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  className={inputClasses}
                  value={formData.targetValue}
                  onChange={e => setFormData({...formData, targetValue: parseFloat(e.target.value)})}
                  placeholder="0.0"
                />
                <input 
                  type="text" 
                  placeholder="Unit"
                  className={`${inputClasses} w-24`}
                  value={formData.unit}
                  onChange={e => setFormData({...formData, unit: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Deadline</label>
              <input 
                type="date" 
                className={inputClasses}
                value={formData.targetDate}
                onChange={e => setFormData({...formData, targetDate: e.target.value})}
              />
            </div>
          </div>
          <button 
            onClick={addGoal}
            className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors"
          >
            {editingId ? 'Save Changes' : 'Activate Objective'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col hover:border-indigo-200 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                <i className={`fa-light ${
                  goal.type === GoalType.WEIGHT_LOSS ? 'fa-weight-scale' :
                  goal.type === GoalType.FITNESS ? 'fa-dumbbell' :
                  goal.type === GoalType.NUTRITION ? 'fa-carrot' : 'fa-brain'
                }`}></i>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(goal)}
                  className="text-slate-300 hover:text-indigo-600 transition-colors p-1"
                >
                  <i className="fa-light fa-pen-to-square text-sm"></i>
                </button>
                <button 
                  onClick={() => removeGoal(goal.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                >
                  <i className="fa-light fa-trash-can text-sm"></i>
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">{goal.title}</h3>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full self-start mb-4">
              {goal.type.replace('_', ' ')}
            </span>
            
            <div className="mt-auto space-y-4 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target</span>
                <span className="text-sm font-bold text-slate-900">{goal.targetValue} {goal.unit}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</span>
                <span className="text-sm font-medium text-slate-600">{new Date(goal.targetDate).toLocaleDateString()}</span>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[45%]"></div>
              </div>
            </div>
          </div>
        ))}

        {goals.length === 0 && !showForm && (
          <div className="md:col-span-2 lg:col-span-3 py-24 bg-white border border-slate-200 border-dashed rounded-xl text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <i className="fa-light fa-bullseye-arrow text-xl"></i>
            </div>
            <p className="text-sm text-slate-400 font-medium">No objectives tracked yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
