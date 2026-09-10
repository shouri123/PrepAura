import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Terminal, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF7F2] border-t border-amber-900/10 py-10 px-6 lg:px-page-padding-desktop text-[#1E1B4B]">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E05A47] to-[#B45309] text-white flex items-center justify-center font-serif text-xs font-bold shadow-sm">
              PA
            </div>
            <span className="font-serif font-bold text-sm tracking-tight text-[#1E1B4B]">
              PREP<span className="text-[#E05A47]">AURA</span>
            </span>
          </Link>
          <span className="text-stone-300 text-xs">|</span>
          <div className="inline-flex items-center gap-2 text-xs text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
            <span className="font-mono text-[11px] font-semibold text-[#0F766E]">
              Precision AI Simulation Core Operational
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[#52525B]">
          <Link to="/methodology" className="hover:text-[#E05A47] transition-colors">Methodology</Link>
          <Link to="/curriculum" className="hover:text-[#E05A47] transition-colors">Curriculum</Link>
          <Link to="/interview/setup" className="hover:text-[#E05A47] transition-colors">Simulation Chamber</Link>
          <Link to="/analytics" className="hover:text-[#E05A47] transition-colors">Analytics</Link>
          <Link to="/pricing" className="hover:text-[#E05A47] transition-colors">Tiers & Pricing</Link>
          <Link to="/login" className="hover:text-[#E05A47] transition-colors">Sign In</Link>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-[#71717A] font-mono">
          © {new Date().getFullYear()} PREPAURA SYSTEMS CORP. NO EMOJIS · PURE CODE.
        </p>

      </div>
    </footer>
  );
};