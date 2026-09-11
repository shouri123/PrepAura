import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  BarChart2,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Activity,
  Server,
  Globe,
  Compass,
  Play,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';

export const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Interactive Chamber Track Selection State
  const [activeTrack, setActiveTrack] = useState('distributed');

  const tracks = [
    {
      id: 'distributed',
      name: 'Distributed Systems',
      role: 'Staff / Principal Infrastructure',
      scenario: 'Design a globally distributed multi-region consensus cluster handling 250k write ops/sec with Byzantine fault resilience.',
      competencies: [
        { label: 'Raft Consensus Depth', score: 94 },
        { label: 'Partition Tolerance', score: 91 },
        { label: 'Latency Under Load', score: 88 }
      ],
      interviewer: 'Calibrated Meta E7 / Google L6 Rubric',
      difficulty: 'Principal Grade'
    },
    {
      id: 'mlops',
      name: 'ML Infrastructure',
      role: 'Staff AI/ML Platform Engineer',
      scenario: 'Architect a dynamic multi-tenant GPU inference orchestration layer with KV-cache streaming and zero cold-starts.',
      competencies: [
        { label: 'PagedAttention Optimization', score: 96 },
        { label: 'Quantization & Kernels', score: 89 },
        { label: 'Autoscaling Stability', score: 93 }
      ],
      interviewer: 'Calibrated OpenAI / Anthropic Infra Rubric',
      difficulty: 'Staff Grade'
    },
    {
      id: 'backend',
      name: 'High-Scale Backend',
      role: 'Senior / Staff Systems Architect',
      scenario: 'Mitigate cascading database connection saturation during an unexpected 10x traffic spike across 400 microservices.',
      competencies: [
        { label: 'Circuit Breaker Patterns', score: 95 },
        { label: 'Backpressure Mechanics', score: 90 },
        { label: 'Read-Replica Lag Routing', score: 87 }
      ],
      interviewer: 'Calibrated Stripe / Netflix Core Rubric',
      difficulty: 'Senior Staff'
    },
    {
      id: 'leadership',
      name: 'Tech Leadership',
      role: 'Director / VP of Engineering',
      scenario: 'Navigate conflicting architectural roadmaps between platform reliability and accelerated feature delivery under regulatory audit.',
      competencies: [
        { label: 'Executive Stakeholder Alignment', score: 92 },
        { label: 'Risk Mitigation Framework', score: 94 },
        { label: 'Org Capital Allocation', score: 89 }
      ],
      interviewer: 'Executive Engineering Panel',
      difficulty: 'Executive Grade'
    }
  ];

  const currentTrackData = tracks.find(t => t.id === activeTrack) || tracks[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B4B] font-modern selection:bg-[#E05A47] selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Subtle Antique Texture & Luminous Ambient Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#D97706_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-[30rem] h-[30rem] bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating SaaS Porcelain Navbar */}
      <Navbar />

      {/* Main SaaS Entry: Focused High-Impact Hero Section */}
      <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-page-padding-desktop max-w-container-max mx-auto w-full" ref={heroRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left Column: Value Proposition & High-Conviction Copy */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* System Status Pill (Zero Emojis) */}
            <div className="hero-reveal inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-[#B45309] text-xs font-bold tracking-wider clay-pill-inset">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#1E1B4B]">
                CHAMBER CORE V2.4 · CALIBRATED RIGOR
              </span>
            </div>

            {/* Headline with Fraunces Variable Serif */}
            <div className="hero-reveal space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1B4B] leading-[1.12]">
                Simulate high-stakes interviews with{' '}
                <span className="text-[#E05A47] italic font-serif">uncompromising</span> precision.
              </h1>
              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl font-normal pt-1">
                Rigorous, adaptive AI interview chambers calibrated against Principal & Staff Engineering rubrics. Master live architectural trade-offs, voice interrogation, and deep telemetry diagnostics.
              </p>
            </div>

            {/* Action Buttons (Zero Emojis) */}
            <div className="hero-reveal flex flex-wrap items-center gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/interview/setup')}
                className="clay-btn-terracotta text-white px-7 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center gap-2.5 cursor-pointer shadow-lg"
              >
                <span>Access Chamber</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/methodology')}
                className="clay-card-antique text-[#1E1B4B] hover:text-[#B45309] px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-amber-900/15"
              >
                <Compass className="w-4 h-4 text-[#0F766E]" />
                <span>Our Methodology</span>
              </motion.button>
            </div>

            {/* Metric Telemetry Ticker (Zero Emojis) */}
            <div className="hero-reveal grid grid-cols-3 gap-6 pt-5 border-t border-amber-900/10 w-full max-w-lg">
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-[#1E1B4B]">94.8%</p>
                <p className="text-xs text-[#71717A] mt-0.5 font-medium">Offer Conversion Rate</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-[#B45309]">&lt; 320ms</p>
                <p className="text-xs text-[#71717A] mt-0.5 font-medium">Voice Audio Latency</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-[#0F766E]">4,800+</p>
                <p className="text-xs text-[#71717A] mt-0.5 font-medium">Calibrated Rubrics</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Glazed Porcelain Simulation Preview */}
          <div className="lg:col-span-6 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="clay-card-antique p-6 sm:p-8 border-2 border-white shadow-2xl relative"
            >
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#B45309] text-white flex items-center justify-center font-serif text-sm font-bold shadow-md clay-wax-seal">
                    PA
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-base text-[#1E1B4B]">Chamber Telemetry Interface</h2>
                    <p className="text-xs text-[#71717A]">{currentTrackData.interviewer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-ping" />
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    LIVE SIMULATION
                  </span>
                </div>
              </div>

              {/* Interactive Discipline Track Selector Pills (Zero Emojis) */}
              <div className="my-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] mb-2.5">
                  Select Evaluation Track:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {tracks.map((t) => {
                    const isSelected = activeTrack === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveTrack(t.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                          isSelected
                            ? 'clay-btn-terracotta text-white border-transparent shadow-sm'
                            : 'bg-white/80 text-[#52525B] border-amber-200/70 hover:bg-amber-50 hover:text-[#1E1B4B]'
                        }`}
                      >
                        <span className="block truncate">{t.name}</span>
                        <span className={`text-[10px] font-normal block truncate ${isSelected ? 'text-amber-100' : 'text-[#A1A1AA]'}`}>
                          {t.difficulty}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Scenario Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTrack}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-2xl bg-[#FAF7F2] border border-amber-200/80 mb-5 text-left clay-pill-inset"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#B45309] mb-1.5">
                    <span className="uppercase tracking-wider">Active Problem Statement:</span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-100 text-[#B45309]">
                      {currentTrackData.role}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E1B4B] leading-relaxed font-serif">
                    “{currentTrackData.scenario}”
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Simulated Real-Time Audio Telemetry Waves (Zero Emojis) */}
              <div className="p-3.5 rounded-xl bg-white border border-amber-100 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E1B4B]">
                  <Volume2 className="w-4 h-4 text-[#E05A47]" />
                  <span>Audio Latency Stream:</span>
                </div>
                <div className="flex items-center gap-1">
                  {[28, 42, 18, 55, 34, 48, 22, 60, 36, 16, 44, 30].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-[#E05A47] rounded-full"
                      animate={{ height: [h * 0.4, h * 0.9, h * 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
                      style={{ height: `${h * 0.5}px` }}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-[#0F766E]">280ms Active</span>
              </div>

              {/* Real-time Competency Evaluation Bars */}
              <div className="space-y-2 mb-6">
                {currentTrackData.competencies.map((comp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#1E1B4B]">
                      <span>{comp.label}</span>
                      <span className="font-mono text-[#B45309]">{comp.score}%</span>
                    </div>
                    <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden p-0.5">
                      <motion.div
                        className="bg-gradient-to-r from-[#E05A47] to-[#D97706] h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${comp.score}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chamber Quick Launch Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/interview/setup')}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 clay-btn-terracotta text-white shadow-md cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Mock Chamber for {currentTrackData.name}</span>
              </motion.button>

            </motion.div>
          </div>

        </div>
      </main>

      {/* Antique Bookplate Minimal Footer */}
      <Footer />

    </div>
  );
};
export default Home;