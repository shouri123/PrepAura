import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Briefcase,
  Layers,
  UploadCloud,
  CheckCircle2,
  FileText,
  Shield,
  Trash2,
  Sparkles
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
  const [skills, setSkills] = useState(
    user?.skills || [
      'React 19 & Fiber',
      'TypeScript 5.x',
      'Distributed Architecture',
      'Web Vitals & Performance',
      'State Machines',
      'GraphQL & REST',
    ]
  );
  const [uploadedResume, setUploadedResume] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        targetRole: user.targetRole || 'Distributed Systems',
        experienceLevel: user.experienceLevel || 'Mid-Level',
      });
      if (user.skills?.length) {
        setSkills(user.skills);
      }
    }
  }, [user]);

  const handleFileProcess = (file) => {
    if (!file) return;
    const validExts = ['.pdf', '.docx', '.txt'];
    const hasValidExt = validExts.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      alert('Please upload a valid PDF, DOCX, or TXT document.');
      return;
    }

    const fileSizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    setUploadedResume({
      name: file.name,
      size: fileSizeStr,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      const newlyExtracted = [
        'High-Throughput Ingestion',
        'Fault Tolerance & Raft Consensus',
        'Distributed Tracing & OpenTelemetry',
        'CAP Theorem Trade-Off Optimization',
      ];
      setExtractedSkills(newlyExtracted);
      setSkills((prev) => {
        const combined = Array.from(new Set([...prev, ...newlyExtracted]));
        updateUser({ ...formData, skills: combined });
        return combined;
      });
    }, 800);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveResume = () => {
    setUploadedResume(null);
    setExtractedSkills([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...formData, skills });
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
        <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <span className="font-mono text-xs text-[#B45309] font-bold uppercase tracking-wider">
              CURRICULUM VITAE UPLOAD & SYNCHRONIZATION
            </span>
            {uploadedResume && (
              <span className="text-[10px] font-mono text-[#0F766E] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                VERIFIED & PARSED
              </span>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileProcess(e.target.files[0]);
              }
            }}
            accept=".pdf,.docx,.txt"
            className="hidden"
          />

          {!uploadedResume ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer space-y-2.5 ${
                isDragging
                  ? 'border-[#E05A47] bg-rose-50/50 scale-[1.01]'
                  : 'border-amber-300/80 bg-[#FAF7F2] hover:bg-amber-50/50'
              }`}
            >
              <UploadCloud className="w-8 h-8 text-[#E05A47] mx-auto" />
              <p className="text-xs font-bold text-[#1E1B4B]">
                Drag and drop your PDF, DOCX, or TXT resume here, or click to browse
              </p>
              <p className="text-[11px] text-[#71717A] font-mono">
                AI automatically extracts conceptual strengths to refine simulation difficulty.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E05A47]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E1B4B]">{uploadedResume.name}</p>
                    <p className="text-[10px] font-mono text-[#71717A]">
                      {uploadedResume.size} · Processed at {uploadedResume.uploadedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-[#1E1B4B] hover:text-[#E05A47] px-2.5 py-1 rounded-lg border border-amber-200 hover:bg-amber-50 cursor-pointer transition-colors"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="p-1.5 text-[#71717A] hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                    title="Remove dossier"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isParsing ? (
                <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] pt-2 border-t border-amber-100">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#E05A47] border-t-transparent animate-spin" />
                  <span>EXTRACTING CONCEPTUAL SPECIALIZATIONS...</span>
                </div>
              ) : (
                extractedSkills.length > 0 && (
                  <div className="pt-2 border-t border-amber-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#0F766E] font-bold uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Newly Discovered Skill Vectors Extracted from CV</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {extractedSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-[#0F766E]"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{sk}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
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