
import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-white font-inter selection:bg-indigo-100 overflow-x-hidden text-slate-900">
      {/* Global Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-base font-bold shadow-indigo-200 shadow-lg">
              W
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Well-Sync</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onEnter}
              className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onEnter}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-8 animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            Personalized Wellness for Addis Ababa
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
            Your Health, <br />
            <span className="text-indigo-600">Precisely Optimized.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed mb-12 font-medium">
            Stop tracking, start improving. Our AI-driven navigator analyzes your unique metrics to build a sustainable path to your wellness goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <button 
              onClick={onEnter}
              className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              Launch Navigator
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
              See How It Works
            </button>
          </div>

          {/* Clean Dashboard Preview Mockup */}
          <div className="max-w-5xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-white border border-slate-200 rounded-[1.5rem] shadow-2xl overflow-hidden">
               {/* Browser UI */}
               <div className="h-10 bg-slate-50/80 border-b border-slate-100 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="mx-auto w-1/3 h-4 bg-white rounded border border-slate-100"></div>
               </div>
               {/* Mock Dashboard Content */}
               <div className="p-8 grid grid-cols-12 gap-6 bg-slate-50/20">
                  <div className="col-span-8 space-y-6">
                    <div className="h-48 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <div className="w-32 h-4 bg-slate-100 rounded"></div>
                        <div className="w-16 h-4 bg-indigo-50 rounded"></div>
                      </div>
                      <svg className="w-full h-24" viewBox="0 0 400 100">
                        <path d="M0,80 Q50,60 100,75 T200,40 T300,50 T400,20" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                        <path d="M0,80 Q50,60 100,75 T200,40 T300,50 T400,20 V100 H0 Z" fill="url(#grad1)" opacity="0.1" />
                        <defs>
                          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:'#6366f1', stopOpacity:0}} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="h-24 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><i className="fa-light fa-weight-scale"></i></div>
                        <div className="space-y-1.5"><div className="w-16 h-2 bg-slate-100 rounded"></div><div className="w-10 h-4 bg-slate-900 rounded"></div></div>
                      </div>
                      <div className="h-24 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><i className="fa-light fa-bolt"></i></div>
                        <div className="space-y-1.5"><div className="w-16 h-2 bg-slate-100 rounded"></div><div className="w-10 h-4 bg-slate-900 rounded"></div></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 space-y-6">
                    <div className="h-full bg-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-6"><i className="fa-solid fa-sparkles text-sm"></i></div>
                      <h4 className="font-bold mb-2">AI Insights</h4>
                      <p className="text-xs text-indigo-100 leading-relaxed">Cross-referencing your sleep cycles with activity load. Strategy updated.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Everything you need, nothing you don't.</h2>
            <p className="text-slate-500 font-medium">A simplified suite of professional tools designed for clarity and action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem 
              icon="fa-radar" 
              title="Real-time Analysis" 
              description="Continuous heuristics cross-reference your lifestyle habits with your set biological targets." 
            />
            <FeatureItem 
              icon="fa-camera-viewfinder" 
              title="Smart Meal Logs" 
              description="Instantly estimate the nutritional value of local Ethiopian meals using Gemini vision models." 
            />
            <FeatureItem 
              icon="fa-layer-group" 
              title="Objective Tracking" 
              description="Visualize progress with high-fidelity charts that reveal the patterns in your health data." 
            />
          </div>
        </div>
      </section>

      {/* Trust & Local Context */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-8">
              <i className="fa-light fa-location-dot"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Localized for the Region</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">
              Well-Sync is built to understand the unique dietary and environmental factors of Ethiopia. From high-altitude metabolic adjustments to localized nutrition data for traditional staples.
            </p>
            <div className="space-y-4">
              <TrustBadge text="Injera & local staple macro recognition" />
              <TrustBadge text="Addis Ababa timezone & holiday awareness" />
              <TrustBadge text="Region-specific wellness strategies" />
            </div>
          </div>
          <div className="bg-slate-50 rounded-3xl p-12 aspect-square flex items-center justify-center border border-slate-100">
             <div className="text-center space-y-4">
                <div className="text-6xl font-black text-indigo-600">100%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Built in Ethiopia</div>
                <p className="text-sm text-slate-500 max-w-[200px] mx-auto">Optimized for our culture, our food, and our fitness.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Ready to sync your life?</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-medium">Join the next generation of health-conscious individuals in Addis Ababa.</p>
            <button 
              onClick={onEnter}
              className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      {/* Simple Professional Footer */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-[10px] font-bold">W</div>
            <span className="text-sm font-bold text-slate-900">Well-Sync</span>
          </div>
          <div className="flex gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2024 Well-Sync Health</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-6">
      <i className={`fa-light ${icon}`}></i>
    </div>
    <h3 className="text-lg font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const TrustBadge = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px]">
      <i className="fa-solid fa-check"></i>
    </div>
    <span className="text-sm font-bold text-slate-700">{text}</span>
  </div>
);

export default LandingPage;
