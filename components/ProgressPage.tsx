
import React, { useState } from 'react';
import { ProgressEntry, Goal } from '../types';

interface ProgressPageProps {
  goals: Goal[];
  entries: ProgressEntry[];
  setEntries: React.Dispatch<React.SetStateAction<ProgressEntry[]>>;
}

const ProgressPage: React.FC<ProgressPageProps> = ({ goals, entries, setEntries }) => {
  const [showLogForm, setShowLogForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProgressEntry>>({
    date: new Date().toISOString().split('T')[0],
    metricType: 'weight',
    valueNumeric: 0,
    source: 'manual'
  });

  const resetForm = () => {
    setShowLogForm(false);
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      metricType: 'weight',
      valueNumeric: 0,
      source: 'manual'
    });
  };

  const handleEdit = (entry: ProgressEntry) => {
    setFormData(entry);
    setEditingId(entry.id);
    setShowLogForm(true);
  };

  const addEntry = () => {
    if (formData.valueNumeric === undefined || formData.valueNumeric === null) return;
    
    if (editingId) {
      setEntries(entries.map(e => e.id === editingId ? { ...e, ...formData } as ProgressEntry : e));
    } else {
      const newEntry: ProgressEntry = {
        ...formData as ProgressEntry,
        id: Math.random().toString(36).substr(2, 9),
        userId: 'current-user',
        createdAt: new Date().toISOString(),
      };
      setEntries([newEntry, ...entries]);
    }
    resetForm();
  };

  const removeEntry = (id: string) => {
    if (window.confirm('Delete this record?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all";

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Analysis</h1>
          <p className="text-sm text-slate-500 mt-1">Review your historical logs and health metrics over time.</p>
        </div>
        <button 
          onClick={() => {
            if (showLogForm) resetForm();
            else setShowLogForm(true);
          }}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <i className={`fa-light ${showLogForm ? 'fa-xmark' : 'fa-pen-field'}`}></i>
          {showLogForm ? 'Cancel' : 'Record Metric'}
        </button>
      </div>

      {showLogForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm animate-slideDown">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Metric' : 'Log New Data Point'}</h2>
            <p className="text-xs text-slate-500 mt-1">Select the metric and enter the measurement.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
              <input 
                type="date" 
                className={inputClasses}
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Metric Type</label>
              <select 
                className={inputClasses}
                value={formData.metricType}
                onChange={e => setFormData({...formData, metricType: e.target.value})}
              >
                <option value="weight">Weight (kg)</option>
                <option value="steps">Daily Steps</option>
                <option value="sleep">Sleep (hours)</option>
                <option value="water">Water (liters)</option>
                <option value="mood">Mood (1-10)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Measured Value</label>
              <input 
                type="number" 
                step="0.1"
                className={inputClasses}
                value={formData.valueNumeric}
                onChange={e => setFormData({...formData, valueNumeric: parseFloat(e.target.value)})}
                placeholder="0.0"
              />
            </div>
          </div>
          <button 
            onClick={addEntry}
            className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors"
          >
            {editingId ? 'Save Changes' : 'Save Record'}
          </button>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entry History</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{entries.length} Total</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {entries.map(entry => (
            <div key={entry.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 capitalize">{entry.metricType}</div>
                  <div className="text-[10px] font-medium text-slate-400">Via {entry.source} source</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">
                    {entry.valueNumeric} 
                    <span className="text-[10px] text-slate-400 ml-1 font-bold uppercase tracking-widest">
                      {entry.metricType === 'weight' ? 'kg' : 
                       entry.metricType === 'steps' ? 'steps' : 
                       entry.metricType === 'sleep' ? 'hrs' : 
                       entry.metricType === 'water' ? 'liters' : 'pts'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 ml-4 border-l border-slate-100 pl-4">
                  <button 
                    onClick={() => handleEdit(entry)}
                    className="p-1.5 text-slate-300 hover:text-indigo-600 transition-colors"
                  >
                    <i className="fa-light fa-pen-to-square text-sm"></i>
                  </button>
                  <button 
                    onClick={() => removeEntry(entry.id)}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <i className="fa-light fa-trash-can text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {entries.length === 0 && (
            <div className="py-20 text-center text-slate-400">
              <i className="fa-light fa-list-check text-2xl mb-3 block opacity-20"></i>
              <p className="text-sm font-medium">No records found. Start logging to build your data profile.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
