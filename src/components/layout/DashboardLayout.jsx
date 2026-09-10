import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = (path) => {
    if (path.includes('/dashboard')) return 'Candidate Mission Control';
    if (path.includes('/interview/setup')) return 'Simulation Chamber Setup';
    if (path.includes('/interview/result')) return 'Assessment Telemetry & Debrief';
    if (path.includes('/questions')) return 'Curated High-Yield Question Bank';
    if (path.includes('/history')) return 'Chamber Simulation Archives';
    if (path.includes('/analytics')) return 'Performance Telemetry & Diagnostics';
    if (path.includes('/profile')) return 'Operator Dossier & Credentials';
    if (path.includes('/settings')) return 'Workspace & Engine Preferences';
    return 'Chamber';
  };

  return (
    <div className="flex h-screen bg-[#FAF7F2] text-[#1E1B4B] font-modern overflow-hidden">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#FAF7F2]">
        
        {/* Precision Command Top Bar (Zero Emojis) */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-amber-900/10 h-16 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-[#52525B] rounded-xl hover:bg-amber-50 hover:text-[#1E1B4B] transition"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-left">
              <span className="font-mono text-xs text-[#71717A] font-bold">PREPAURA /</span>
              <span className="text-xs font-bold tracking-tight text-[#1E1B4B] uppercase">
                {getPageTitle(location.pathname)}
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 bg-[#FAF7F2] border border-amber-200/80 rounded-xl w-80 text-[#71717A] focus-within:border-[#E05A47] transition-all">
            <Search className="w-3.5 h-3.5 text-[#71717A]" />
            <input
              type="text"
              placeholder="Search topics, questions, simulations..."
              className="bg-transparent text-xs text-[#1E1B4B] placeholder:text-[#A1A1AA] focus:outline-none w-full"
            />
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-amber-200 text-[#71717A]">
              Ctrl+K
            </span>
          </div>

          {/* Right Utility Cluster */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-bold text-[#0F766E]">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
              <span>AI Evaluator Ready</span>
            </div>

            <button
              className="relative p-2 text-[#71717A] hover:text-[#1E1B4B] hover:bg-amber-50 rounded-xl transition"
              title="System notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E05A47] rounded-full" />
            </button>

            <Link to="/profile" className="flex items-center gap-2 pl-1">
              <Avatar className="w-8 h-8 border border-amber-200 hover:border-[#E05A47] transition-colors shadow-sm">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-xs bg-amber-100 text-[#B45309] font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content Shell */}
        <main className="flex-1 p-4 sm:p-8 max-w-container-max w-full mx-auto bg-[#FAF7F2]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};