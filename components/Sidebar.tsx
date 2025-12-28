
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navItems = [
    { to: '/', icon: 'fa-grid-2', label: 'Overview' },
    { to: '/goals', icon: 'fa-target-arrow', label: 'Objectives' },
    { to: '/nutrition', icon: 'fa-utensils', label: 'Nutrition' },
    { to: '/progress', icon: 'fa-chart-simple', label: 'Analysis' },
    { to: '/recommendations', icon: 'fa-sparkles', label: 'AI Navigator' },
    { to: '/community', icon: 'fa-users', label: 'Community' },
    { to: '/settings', icon: 'fa-gear', label: 'Settings' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-lg font-bold">
          W
        </div>
        <span className="hidden md:block text-lg font-bold tracking-tight text-slate-900">Well-Sync</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-slate-50 text-indigo-600 font-medium'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <i className={`fa-light ${item.icon} w-5 text-center`}></i>
            <span className="hidden md:block text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-red-600 transition-colors w-full"
        >
          <i className="fa-light fa-arrow-right-from-bracket w-5 text-center"></i>
          <span className="hidden md:block text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
