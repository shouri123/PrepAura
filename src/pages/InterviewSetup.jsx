import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Sliders,
  CheckCircle2,
  Mic,
  Video,
  Shield,
  Clock,
  Layers,
  Bot,
  Compass,
  Volume2
} from 'lucide-react';
import {
  ROLES,
  EXPERIENCE_LEVELS,
  INTERVIEW_TYPES,
  DIFFICULTIES,
  QUESTION_COUNTS
} from '../utils/constants';
import { useInterview } from '../hooks/useInterview';
import { interviewService } from '../services/interviewService';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export const InterviewSetup = () => {
  const navigate = useNavigate();
  const { initializeSession } = useInterview();
  const [loading, setLoading] = useState(false);

  const [config, setConfig] = useState({
    role: 'Frontend Developer',
    experienceLevel: 'Mid-Level',
    type: 'Technical',
    difficulty: 'Medium',
    questionCount: 5,
    persona: 'Bar Raiser (Rigorous)',
  });

  const handleStart = async () => {
    setLoading(true);
    try {
      const sessionData = await interviewService.startInterview(config);
      initializeSession(sessionData);
      navigate('/interview/session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 text-left">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
            <span className="font-mono text-[10px] text-[#B45309] uppercase tracking-widest font-bold">
              CHAMBER CALIBRATION V2.4 · PRE-FLIGHT
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1B4B]">
            Simulation Setup Chamber
          </h1>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Configure target specialization, evaluation rigor, and AI persona criteria before initiating the live session.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configuration Matrix */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Target Role / Track */}
          <Card className="clay-card-antique p-6 border-2 border-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider">
                01 / TARGET SPECIALIZATION
              </span>
              <span className="text-xs font-mono font-bold text-[#E05A47]">Selected: {config.role}</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-[#1E1B4B] mb-4">
              Engineering Focus Track
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ROLES.map((r) => {
                const isSelected = config.role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setConfig({ ...config, role: r })}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                        : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50/60 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="truncate">{r}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={`text-[10px] font-mono block ${isSelected ? 'text-amber-100' : 'text-[#71717A]'}`}>
                      Active Matrix
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Step 2: Rigor & Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="clay-card-antique p-6 border-2 border-white shadow-sm">
              <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider block mb-2">
                02 / EVALUATION RIGOR
              </span>
              <h2 className="text-lg font-serif font-bold text-[#1E1B4B] mb-4">
                Difficulty Tier
              </h2>
              <div className="space-y-2.5">
                {DIFFICULTIES.map((diff) => {
                  const isSelected = config.difficulty === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setConfig({ ...config, difficulty: diff })}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                          : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50/60 font-medium'
                      }`}
                    >
                      <div>
                        <p className={isSelected ? 'text-white font-bold' : 'font-bold text-[#1E1B4B]'}>{diff}</p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-[#71717A]'}`}>
                          {diff === 'Easy' && 'Core fundamentals & definitions'}
                          {diff === 'Medium' && 'Standard design & trade-off analysis'}
                          {diff === 'Hard' && 'Edge-case handling & complex scale'}
                        </p>
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="clay-card-antique p-6 border-2 border-white shadow-sm">
              <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider block mb-2">
                03 / CANDIDATE SENIORITY
              </span>
              <h2 className="text-lg font-serif font-bold text-[#1E1B4B] mb-4">
                Experience Bracket
              </h2>
              <div className="space-y-2.5">
                {EXPERIENCE_LEVELS.map((lvl) => {
                  const isSelected = config.experienceLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setConfig({ ...config, experienceLevel: lvl })}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                          : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50/60 font-medium'
                      }`}
                    >
                      <div>
                        <p className={isSelected ? 'text-white font-bold' : 'font-bold text-[#1E1B4B]'}>{lvl}</p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-[#71717A]'}`}>
                          {lvl === 'Junior' && '0–2 yrs · Clean code & basics'}
                          {lvl === 'Mid-Level' && '2–5 yrs · Systems & independence'}
                          {lvl === 'Senior' && '5+ yrs · Architecture & leadership'}
                        </p>
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Step 3: Question Allotment & Mode */}
          <Card className="clay-card-antique p-6 border-2 border-white shadow-sm">
            <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider block mb-2">
              04 / CHAMBER ALLOTMENT
            </span>
            <h2 className="text-lg font-serif font-bold text-[#1E1B4B] mb-4">
              Question Count & Session Format
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {QUESTION_COUNTS.map((cnt) => {
                  const isSelected = config.questionCount === cnt;
                  return (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setConfig({ ...config, questionCount: cnt })}
                      className={`p-3.5 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                          : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50/60 font-medium'
                      }`}
                    >
                      <p className={`text-xl font-bold font-mono ${isSelected ? 'text-white' : 'text-[#1E1B4B]'}`}>{cnt}</p>
                      <p className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-amber-100' : 'text-[#71717A]'}`}>Questions</p>
                      <p className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-amber-200 font-bold' : 'text-[#B45309]'}`}>
                        ~{cnt * 4} mins
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {INTERVIEW_TYPES.map((t) => {
                  const isSelected = config.type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setConfig({ ...config, type: t })}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100/80 border-[#E05A47] text-[#E05A47] shadow-sm'
                          : 'bg-[#FAF7F2] border-amber-200 text-[#52525B] hover:text-[#1E1B4B]'
                      }`}
                    >
                      {t} Mode
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Pre-Flight Readiness Dossier */}
        <div className="lg:col-span-4 space-y-6">
          {/* Device & Sensor Check */}
          <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
            <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider block">
              SENSOR VERIFICATION
            </span>
            <h2 className="text-base font-serif font-bold text-[#1E1B4B]">
              Hardware Readiness
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] border border-amber-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F766E] border border-emerald-200 flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E1B4B]">Microphone Stream</p>
                    <p className="text-[10px] font-mono text-[#71717A]">48kHz Calibrated Sensor</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F766E]">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] border border-amber-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F766E] border border-emerald-200 flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E1B4B]">Camera Sensor</p>
                    <p className="text-[10px] font-mono text-[#71717A]">1080p Telemetry Stream</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F766E]">
                  ACTIVE
                </span>
              </div>
            </div>
          </Card>

          {/* Persona Configuration */}
          <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
            <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider block">
              AI EVALUATOR PROFILE
            </span>
            <h2 className="text-base font-serif font-bold text-[#1E1B4B]">
              Interviewer Demeanor
            </h2>

            <div className="space-y-2.5">
              {[
                { name: 'Bar Raiser (Rigorous)', desc: 'Zero tolerance for vague assumptions.' },
                { name: 'Staff Engineer (Collaborative)', desc: 'Provides subtle hints when blocked.' },
                { name: 'Benchmark Standard', desc: 'Strictly neutral scoring cadence.' },
              ].map((p) => {
                const isSelected = config.persona === p.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setConfig({ ...config, persona: p.name })}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                        : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50/60 font-medium'
                    }`}
                  >
                    <p className={isSelected ? 'text-white font-bold' : 'font-bold text-[#1E1B4B]'}>{p.name}</p>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-[#71717A]'}`}>{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Launch Action */}
          <div className="clay-card-amber p-6 text-center space-y-4 border-2 border-white shadow-lg">
            <div>
              <p className="text-[10px] font-mono text-[#B45309] font-bold uppercase tracking-wider">
                READY FOR SIMULATION
              </p>
              <h3 className="text-xl font-serif font-bold text-[#1E1B4B] mt-1">
                {config.role}
              </h3>
              <p className="text-xs text-[#52525B] mt-1 font-mono">
                {config.difficulty} · {config.experienceLevel} · {config.questionCount} Questions
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={handleStart}
              className="w-full py-3.5 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{loading ? 'Initializing Chamber...' : 'Enter Simulation Chamber'}</span>
            </motion.button>

            <p className="text-[10px] text-[#71717A] font-mono leading-relaxed">
              Session is evaluated in real-time under mock enterprise confidentiality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InterviewSetup;