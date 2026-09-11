import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  PlayCircle,
  BookOpen,
  History,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Start Interview', path: '/interview/setup', icon: PlayCircle },
  { name: 'Question Bank', path: '/questions', icon: BookOpen },
  { name: 'History', path: '/history', icon: History },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#1E1B4B]/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-amber-900/10 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-amber-900/10">
            <NavLink to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#B45309] text-white flex items-center justify-center font-serif text-xs font-bold shadow-sm">
                PA
              </div>
              <span className="font-serif font-bold text-base tracking-tight text-[#1E1B4B]">
                PREP<span className="text-[#E05A47]">AURA</span>
              </span>
            </NavLink>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-[#B45309] border border-amber-200 font-semibold">
              PRO
            </span>
          </div>

          {/* Navigation Links (Zero Emojis) */}
          <nav className="p-3 space-y-1 text-left">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-bold">
              CHAMBER WORKSPACE
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen?.(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                      isActive
                        ? 'text-[#E05A47] bg-amber-50 shadow-sm'
                        : 'text-[#52525B] hover:text-[#1E1B4B] hover:bg-[#FAF7F2]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="sidebarActivePill"
                          className="absolute left-0 top-2 bottom-2 w-1 bg-[#E05A47] rounded-r"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#E05A47]' : 'text-[#71717A] group-hover:text-[#1E1B4B]'
                        }`}
                      />
                      <span className="flex-1">{item.name}</span>
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-[#E05A47]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout (Zero Emojis) */}
        <div className="p-3 border-t border-amber-900/10 bg-[#FAF7F2]">
          <NavLink
            to="/profile"
            className="flex items-center gap-3 p-2 rounded-xl bg-white border border-amber-200 hover:border-[#E05A47] transition-all mb-2 group shadow-sm text-left"
          >
            <Avatar className="w-9 h-9 border border-amber-200 group-hover:border-[#E05A47] transition-colors">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-xs bg-amber-100 text-[#B45309] font-bold">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>

            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1E1B4B] truncate group-hover:text-[#E05A47] transition-colors">
                {user?.name || 'Alex Mercer'}
              </p>
              <p className="text-[10px] text-[#71717A] font-mono truncate">
                {user?.targetRole || 'Software Engineer'}
              </p>
            </div>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-[#71717A] hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};