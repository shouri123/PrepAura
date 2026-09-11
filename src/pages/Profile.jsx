import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Briefcase,
  Layers,
  UploadCloud,
  CheckCircle2,
  FileText,
  Shield
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROLES, EXPERIENCE_LEVELS } from '../utils/constants';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    targetRole: user?.targetRole || 'Distributed Systems',
    experienceLevel: user?.experienceLevel || 'Mid-Level',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        targetRole: user.targetRole || 'Distributed Systems',
        experienceLevel: user.experienceLevel || 'Mid-Level',
      });
    }
  }, [user]);

  const skills = user?.skills || [
    'React 19 & Fiber',
    'TypeScript 5.x',
    'Distributed Architecture',
    'Web Vitals & Performance',
    'State Machines',
    'GraphQL & REST',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
            <span className="font-mono text-[10px] text-[#B45309] uppercase tracking-widest font-bold">
              OPERATOR IDENTITY DOSSIER
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1B4B]">
            Candidate Dossier and Profile
          </h1>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Maintain your professional parameters, target engineering specialization, and verified skill matrix.
          </p>
        </div>

        <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[#B45309] self-start sm:self-auto">
          OPERATOR STATUS: ACTIVE
        </span>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0F766E] text-xs font-bold flex items-center gap-2 shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile parameters committed to session storage successfully.</span>
        </motion.div>
      )}

      {/* Profile Overview Card */}
      <Card className="clay-card-antique p-6 border-2 border-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="w-20 h-20 border-2 border-amber-300 shadow-md">
            <AvatarImage src={user?.avatar} alt={formData.name} />
            <AvatarFallback className="text-2xl bg-amber-100 text-[#B45309] font-serif font-bold">
              {formData.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#1E1B4B]">{formData.name}</h2>
                <p className="text-xs text-[#71717A] font-mono mt-0.5">{formData.email}</p>
              </div>
              <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#B45309] self-center sm:self-auto">
                ID: usr_001 · PRO TIER
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="text-xs font-bold text-[#E05A47]">
                {formData.targetRole}
              </span>
              <span className="text-[#71717A] text-xs">·</span>
              <span className="text-xs text-[#52525B] font-mono">
                {formData.experienceLevel} Tier
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Form Details */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-5">
          <div className="border-b border-amber-900/10 pb-3">
            <span className="font-mono text-xs text-[#B45309] font-bold uppercase tracking-wider">
              GENERAL PARAMETERS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                Operator Full Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                Verified Email Address
              </label>
              <Input
                type="email"
                disabled
                value={formData.email}
                className="text-xs opacity-60 cursor-not-allowed bg-amber-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                Target Specialization Track
              </label>
              <select
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full h-10 px-3.5 py-2 text-xs bg-white border border-amber-200 rounded-xl text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47] font-medium shadow-sm cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                Seniority Bracket
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full h-10 px-3.5 py-2 text-xs bg-white border border-amber-200 rounded-xl text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47] font-medium shadow-sm cursor-pointer"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Skill Inventory */}
        <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <span className="font-mono text-xs text-[#B45309] font-bold uppercase tracking-wider">
              VERIFIED TECHNICAL SKILL INVENTORY
            </span>
            <span className="text-xs text-[#71717A] font-mono font-bold">{skills.length} VECTORS</span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-[#1E1B4B] shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E05A47]" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </Card>

        {/* Resume CV Parser */}
        <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-3">
          <div className="border-b border-amber-900/10 pb-3">
            <span className="font-mono text-xs text-[#B45309] font-bold uppercase tracking-wider">
              CURRICULUM VITAE UPLOAD & SYNCHRONIZATION
            </span>
          </div>

          <div className="border-2 border-dashed border-amber-300/80 rounded-2xl p-8 text-center bg-[#FAF7F2] hover:bg-amber-50/50 transition-colors cursor-pointer space-y-2.5">
            <UploadCloud className="w-8 h-8 text-[#E05A47] mx-auto" />
            <p className="text-xs font-bold text-[#1E1B4B]">
              Drag and drop your updated PDF resume here
            </p>
            <p className="text-[11px] text-[#71717A] font-mono">
              AI automatically extracts conceptual strengths to refine simulation difficulty.
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all"
          >
            Commit Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;