import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  LayoutDashboard, 
  Menu, 
  X, 
  Compass, 
  BookOpen, 
  Cpu, 
  BarChart2, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Methodology', path: '/methodology', icon: Compass },
    { name: 'Curriculum', path: '/curriculum', icon: BookOpen },
    { name: 'Simulation', path: '/interview/setup', icon: Cpu },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Pricing', path: '/pricing', icon: Layers },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 max-w-7xl mx-auto px-4 sm:px-6 transition-all">
      <nav className="clay-card-antique backdrop-blur-md bg-white/95 px-6 py-3.5 flex items-center justify-between border border-amber-900/10 shadow-md">
        
        {/* Brand Monogram */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E05A47] to-[#B45309] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md transform group-hover:scale-105 transition-transform duration-200 clay-wax-seal">
            PA
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold tracking-tight text-[#1E1B4B] block leading-none">
              PREP<span className="text-[#E05A47]">AURA</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-amber-50 text-[#B45309] border border-amber-200/80 font-semibold">
              v2.4
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const IconComp = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-wider font-bold transition-all relative py-1.5 px-2 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#E05A47]'
                      : 'text-[#52525B] hover:text-[#1E1B4B]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#E05A47]' : 'text-[#71717A]'}`} />
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#E05A47] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="clay-card-antique hover:bg-amber-50 text-[#1E1B4B] border border-amber-300/80 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#E05A47]" />
                <span className="hidden sm:inline">Console</span>
              </motion.button>
              <Link to="/profile">
                <Avatar className="w-9 h-9 ring-2 ring-white hover:ring-[#E05A47] shadow-sm transition-all">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs font-serif font-bold bg-amber-100 text-[#B45309]">
                    {user.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="text-xs font-bold text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50"
              >
                Sign In
              </Button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="clay-btn-terracotta text-white px-5 py-2 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Access Chamber</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 clay-card-antique bg-white p-6 space-y-3 border border-amber-900/10 shadow-xl"
          >
            {navLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-sm font-bold py-2.5 px-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-amber-50 text-[#E05A47]' 
                        : 'text-[#52525B] hover:bg-stone-50'
                    }`
                  }
                >
                  <IconComp className="w-4 h-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            {!user && (
              <div className="pt-4 border-t border-amber-100 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full text-xs font-bold border-amber-200"
                >
                  Sign In
                </Button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                  className="w-full clay-btn-terracotta text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center"
                >
                  Access Chamber
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};