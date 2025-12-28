
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProfile, Goal, ProgressEntry, Recommendation, DailyCheckin, Meal, CommunityPost } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import GoalsPage from './components/GoalsPage';
import ProgressPage from './components/ProgressPage';
import RecommendationsPage from './components/RecommendationsPage';
import NutritionPage from './components/NutritionPage';
import CommunityPage from './components/CommunityPage';
import SettingsPage from './components/SettingsPage';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('wellsync_auth') === 'true';
  });

  const [showAuth, setShowAuth] = useState<boolean>(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('wellsync_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('wellsync_goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>(() => {
    const saved = localStorage.getItem('wellsync_progress');
    return saved ? JSON.parse(saved) : [];
  });

  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    const saved = localStorage.getItem('wellsync_recs');
    return saved ? JSON.parse(saved) : [];
  });

  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('wellsync_meals');
    return saved ? JSON.parse(saved) : [];
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('wellsync_community');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: Ensure new fields exist
      return parsed.map((p: any) => ({
        ...p,
        dislikes: p.dislikes || 0,
        replies: p.replies || []
      }));
    }
    return [
      {
        id: '1',
        author: 'AI Wellness Guide',
        content: 'Did you know? Drinking 500ml of water 30 minutes before meals can boost metabolism and assist in weight management.',
        type: 'tip',
        likes: 24,
        dislikes: 1,
        replies: [],
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        author: 'FitNavigator',
        content: 'Just reached my 10,000 steps goal for the 7th day in a row! Consistency is key.',
        type: 'milestone',
        likes: 12,
        dislikes: 0,
        replies: [],
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  });

  const [dailyCheckin, setDailyCheckin] = useState<DailyCheckin | null>(() => {
    const saved = localStorage.getItem('wellsync_checkin');
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    const today = new Date().toISOString().split('T')[0];
    return parsed.date.startsWith(today) ? parsed : null;
  });

  useEffect(() => {
    localStorage.setItem('wellsync_auth', String(isAuthenticated));
    if (userProfile) localStorage.setItem('wellsync_profile', JSON.stringify(userProfile));
    localStorage.setItem('wellsync_goals', JSON.stringify(goals));
    localStorage.setItem('wellsync_progress', JSON.stringify(progressEntries));
    localStorage.setItem('wellsync_recs', JSON.stringify(recommendations));
    localStorage.setItem('wellsync_meals', JSON.stringify(meals));
    localStorage.setItem('wellsync_community', JSON.stringify(communityPosts));
    if (dailyCheckin) localStorage.setItem('wellsync_checkin', JSON.stringify(dailyCheckin));
  }, [isAuthenticated, userProfile, goals, progressEntries, recommendations, meals, dailyCheckin, communityPosts]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setShowAuth(false);
    localStorage.clear();
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  // Flow Logic:
  // 1. Not Authenticated + Not in Auth State -> Show Landing Page
  // 2. Not Authenticated + in Auth State -> Show Auth (Login/Signup)
  // 3. Authenticated + No Profile -> Show Onboarding
  // 4. Authenticated + Profile -> Show Main App
  if (!isAuthenticated) {
    if (!showAuth) {
      return <LandingPage onEnter={() => setShowAuth(true)} />;
    }
    return <Auth onLogin={handleLogin} />;
  }

  if (!userProfile) {
    return <Onboarding onComplete={(profile) => setUserProfile(profile)} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-inter">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header profile={userProfile} />
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  profile={userProfile} 
                  goals={goals} 
                  progress={progressEntries} 
                  recommendations={recommendations} 
                  dailyCheckin={dailyCheckin}
                  onCheckin={setDailyCheckin}
                />
              } />
              <Route path="/goals" element={<GoalsPage goals={goals} setGoals={setGoals} />} />
              <Route path="/progress" element={<ProgressPage goals={goals} entries={progressEntries} setEntries={setProgressEntries} />} />
              <Route path="/recommendations" element={<RecommendationsPage recommendations={recommendations} setRecommendations={setRecommendations} profile={userProfile} goals={goals} />} />
              <Route path="/nutrition" element={<NutritionPage meals={meals} setMeals={setMeals} tdee={userProfile.tdee} />} />
              <Route path="/community" element={<CommunityPage posts={communityPosts} setPosts={setCommunityPosts} authorName={userProfile.firstName} />} />
              <Route path="/settings" element={<SettingsPage profile={userProfile} setProfile={setUserProfile} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
