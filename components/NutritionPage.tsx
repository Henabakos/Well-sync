
import React, { useState } from 'react';
import { Meal } from '../types';
import { estimateMealNutrition } from '../services/geminiService';

interface NutritionPageProps {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  tdee: number;
}

const NutritionPage: React.FC<NutritionPageProps> = ({ meals, setMeals, tdee }) => {
  const [description, setDescription] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    if (editingId) {
      // For editing, we don't necessarily re-estimate unless the text changed significantly,
      // but for simplicity we'll just re-estimate or let the user know.
      setIsEstimating(true);
      const nutrition = await estimateMealNutrition(description);
      setMeals(meals.map(m => m.id === editingId ? {
        ...m,
        description,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat
      } : m));
      setEditingId(null);
      setDescription('');
      setIsEstimating(false);
    } else {
      setIsEstimating(true);
      const nutrition = await estimateMealNutrition(description);
      const newMeal: Meal = {
        id: Math.random().toString(36).substring(2, 9),
        description: description,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
        timestamp: new Date().toISOString(),
      };
      setMeals(prev => [newMeal, ...prev]);
      setDescription('');
      setIsEstimating(false);
    }
  };

  const handleEdit = (meal: Meal) => {
    setEditingId(meal.id);
    setDescription(meal.description);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this meal log?')) {
      setMeals(meals.filter(m => m.id !== id));
    }
  };

  const todayMeals = meals.filter(m => {
    const today = new Date().toISOString().split('T')[0];
    return m.timestamp.startsWith(today);
  });

  const totalCalories = todayMeals.reduce((acc, m) => acc + m.calories, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nutrition Tracker</h1>
        <p className="text-sm text-slate-500 mt-1">Log your meals and let AI estimate your daily intake.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">{editingId ? 'Edit Meal' : 'Log a Meal'}</h3>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <textarea
                className="w-full p-4 rounded-lg border border-slate-200 text-sm font-medium focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none h-24 bg-slate-50/30 transition-all"
                placeholder="Describe your meal (e.g., 'One serving of Doro Wat with one injera and a side of salad')"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setDescription('');
                    }}
                    className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isEstimating || !description.trim()}
                  className="flex-[2] py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isEstimating ? 'Analyzing with AI...' : editingId ? 'Update Meal' : 'Estimate & Add Meal'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Logs</span>
            </div>
            <div className="divide-y divide-slate-100">
              {meals.map(meal => (
                <div key={meal.id} className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors group">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">{meal.description}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-black text-indigo-600">{meal.calories} kcal</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                      </p>
                    </div>
                    <div className="flex gap-1 ml-4 border-l border-slate-100 pl-4">
                      <button 
                        onClick={() => handleEdit(meal)}
                        className="p-1.5 text-slate-300 hover:text-indigo-600 transition-colors"
                      >
                        <i className="fa-light fa-pen-to-square text-sm"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(meal.id)}
                        className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <i className="fa-light fa-trash-can text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {meals.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                  <i className="fa-light fa-bowl-food text-2xl mb-2 opacity-20 block"></i>
                  <p className="text-sm">No meals logged yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Today's Balance</h3>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-3xl font-black text-slate-900">{totalCalories}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Consumed</p>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-1000" 
                  style={{ width: `${Math.min((totalCalories / tdee) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>0 kcal</span>
                <span>Limit: {tdee} kcal</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-3">AI Insight</h4>
            <p className="text-xs text-indigo-700 leading-relaxed font-medium">
              {totalCalories > tdee 
                ? "You've exceeded your daily target. Consider a light walk to balance your energy expenditure."
                : "You're within your caloric budget. Focus on high-protein options for your next snack."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
