import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Cpu,
  BarChart2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Activity,
  Compass,
  Sliders,
  Award
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Methodology = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('Senior L5');

  const rubrics = {
    'Junior L3': {
      focus: 'Syntax, Data Structures & Clear Communication',
      criteria: [
        { name: 'Core Syntax & Language Mechanics', score: '85%' },
        { name: 'Time & Space Complexity Basics', score: '80%' },
        { name: 'Ability to Receive Hints & Iterate', score: '90%' },
        { name: 'Basic Testing & Edge-Case Awareness', score: '70%' },
      ],
      description: 'Prioritizes clean logic, standard library fluency, and collaborative receptivity.',
    },
    'Senior L5': {
      focus: 'System Trade-offs, Failure Domains & Architectural Depth',
      criteria: [
        { name: 'Distributed Caching & Sharding Heuristics', score: '92%' },
        { name: 'Concurrency & Race-Condition Defense', score: '88%' },
        { name: 'API Versioning & Backward Compatibility', score: '85%' },
        { name: 'Failure Recovery & Circuit Breakers', score: '89%' },
      ],
      description: 'Penalizes vague hand-waving. Demands concrete numbers, throughput constraints, and bottle-neck mitigation.',
    },
    'Staff / Principal L6': {
      focus: 'Organizational Multi-system Scaling, Cross-domain Trade-offs',
      criteria: [
        { name: 'Global Multi-region Replication Latency', score: '96%' },
        { name: 'Cost Optimization at Petabyte Scale', score: '94%' },
        { name: 'Executive Consensus & Cross-functional Buy-in', score: '92%' },
        { name: 'Graceful Degradation Under Catastrophic Load', score: '95%' },
      ],
      description: 'Zero tolerance for unverified assumptions. Evaluates engineering judgment and architectural conviction.',
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B4B] font-modern selection:bg-[#E05A47] selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Background Subtle Antique Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#D97706_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
      
      <Navbar />

      <main className="w-full pt-28 pb-16">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop pb-16">
          <div className="max-w-3xl space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-[#B45309] text-xs font-bold uppercase tracking-wider clay-pill-inset">
              <Compass className="w-3.5 h-3.5 text-[#E05A47]" />
              <span>EVALUATION SCIENCE & COGNITIVE ARCHITECTURE</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1B4B] leading-[1.12]">
              The Science of <span className="text-[#E05A47] italic font-serif">Technical Rigor.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
              Standard AI interview tools act as polite chatbots matching superficial keywords. PrepAura operates as an uncompromising Bar Raiser—measuring trade-off depth, cognitive pacing, and architectural conviction.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/interview/setup')}
                className="clay-btn-terracotta text-white px-7 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Experience the Evaluation Loop</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/curriculum')}
                className="clay-card-antique text-[#1E1B4B] px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider border border-amber-900/15 cursor-pointer"
              >
                <span>View Curriculum Matrix</span>
              </motion.button>
            </div>

          </div>
        </section>

        {/* 4 Core Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop py-12 space-y-12">
          <div className="text-left">
            <span className="font-mono text-xs text-[#B45309] uppercase tracking-widest font-bold">
              FOUR PILLARS OF CALIBRATION
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1E1B4B] mt-1">
              How PrepAura Quantifies Engineering Conviction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Pillar 1 */}
            <div className="clay-card-antique p-8 space-y-4 border-2 border-white shadow-lg text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E05A47] clay-wax-seal">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E1B4B]">
                1. Semantic Trade-Off Depth Analysis
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Generic LLMs award points whenever a candidate mentions buzzwords like "Redis" or "Kafka". PrepAura probes whether you explained <em>why</em> you chose an in-memory cache over a distributed key-value store, what cache eviction policy was specified, and how you defend against cache stampedes.
              </p>
              <div className="pt-2">
                <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-[#B45309] border border-amber-300">
                  METRIC: ARCHITECTURAL BOUNDARY PRECISION
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="clay-card-antique p-8 space-y-4 border-2 border-white shadow-lg text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E05A47] clay-wax-seal">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E1B4B]">
                2. Real-Time Acoustic & Pacing Telemetry
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Interviews are decided as much by delivery conviction as by technical correctness. PrepAura captures verbal cadence (WPM), speech hesitation, and filler density. If you rush through a system diagram without checking for alignment, the AI flags pacing volatility.
              </p>
              <div className="pt-2">
                <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-[#B45309] border border-amber-300">
                  METRIC: VERBAL DELIVERY CADENCE (120-145 WPM)
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="clay-card-antique p-8 space-y-4 border-2 border-white shadow-lg text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E05A47] clay-wax-seal">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E1B4B]">
                3. Adaptive Probing Engine (&lt;180ms Latency)
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Human interviewers interrupt when a candidate glosses over critical edge cases. PrepAura's sub-second audio pipeline detects vague claims immediately and launches targeted follow-up probes: <em>"What happens if your primary replica drops connection during write?"</em>
              </p>
              <div className="pt-2">
                <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-[#B45309] border border-amber-300">
                  METRIC: ZERO SCRIPT DEPENDENCY
                </span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="clay-card-antique p-8 space-y-4 border-2 border-white shadow-lg text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E05A47] clay-wax-seal">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E1B4B]">
                4. STAR Behavioral Impact Decomposition
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Behavioral questions are evaluated using our STAR decomposition parser: Situation (15%), Task (15%), Action (50%), and Quantifiable Result (20%). If your response lacks business metrics or personal ownership, the debrief flags missing impact metrics.
              </p>
              <div className="pt-2">
                <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-[#B45309] border border-amber-300">
                  METRIC: STAR IMPACT PROPORTION
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Seniority Rubric Explorer */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop py-12">
          <div className="clay-card-amber p-8 sm:p-10 border-2 border-white shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
              <div>
                <span className="font-mono text-xs text-[#B45309] uppercase tracking-widest font-bold">
                  RUBRIC SIMULATOR
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1E1B4B] mt-1">
                  Calibrated Seniority Standards
                </h2>
                <p className="text-sm text-[#52525B] mt-1">
                  Inspect how our AI alters scoring thresholds based on the candidate's declared target seniority.
                </p>
              </div>

              {/* Level Selector Pills */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 border border-amber-200 clay-pill-inset">
                {Object.keys(rubrics).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedLevel === lvl
                        ? 'clay-btn-terracotta text-white shadow-sm'
                        : 'text-[#52525B] hover:text-[#1E1B4B]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Rubric Card */}
            <div className="clay-card-antique p-8 border border-amber-200 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-[#B45309]">
                    ACTIVE TIER: {selectedLevel}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1E1B4B]">
                    {rubrics[selectedLevel].focus}
                  </h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    {rubrics[selectedLevel].description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate('/interview/setup')}
                    className="clay-btn-terracotta text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Test This Level</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                <div className="lg:col-span-7 space-y-4 bg-[#FAF7F2] p-6 rounded-2xl border border-amber-200/80">
                  <p className="font-mono text-[11px] text-[#71717A] uppercase font-bold">
                    EVALUATED WEIGHTED CRITERIA
                  </p>
                  {rubrics[selectedLevel].criteria.map((c, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#1E1B4B]">{c.name}</span>
                        <span className="font-mono text-[#B45309]">{c.score}</span>
                      </div>
                      <div className="h-2 w-full bg-amber-100 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-[#E05A47] to-[#D97706] rounded-full transition-all duration-500"
                          style={{ width: c.score }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benchmark Comparison Matrix (Zero Emojis) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop py-12">
          <div className="clay-card-antique p-8 sm:p-10 border-2 border-white shadow-xl space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="font-mono text-xs text-[#B45309] uppercase tracking-widest font-bold">
                BENCHMARK COMPARISON
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1E1B4B] mt-1">
                Why Standard Mock Prep Fails
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-amber-200 rounded-2xl overflow-hidden bg-white">
                <thead className="bg-[#FAF7F2] border-b border-amber-200 font-mono text-[11px] text-[#71717A] uppercase">
                  <tr>
                    <th className="py-4 px-6 font-bold">Capability</th>
                    <th className="py-4 px-6 text-[#E05A47] font-bold">PrepAura AI Chamber</th>
                    <th className="py-4 px-6">Generic LLM / Chatbots</th>
                    <th className="py-4 px-6">Human Mock Services ($150+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-[#52525B]">
                  <tr>
                    <td className="py-4 px-6 font-bold text-[#1E1B4B]">Sub-Second Voice Latency</td>
                    <td className="py-4 px-6 text-[#0F766E] flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> &lt;180ms Neural Audio
                    </td>
                    <td className="py-4 px-6 text-rose-600 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Text only / 3-5s lag
                    </td>
                    <td className="py-4 px-6">Natural human audio</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-[#1E1B4B]">Adaptive Follow-Up Probing</td>
                    <td className="py-4 px-6 text-[#0F766E] flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Probes unverified claims
                    </td>
                    <td className="py-4 px-6 text-rose-600 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Passive agreement
                    </td>
                    <td className="py-4 px-6">Subjective & variable</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-[#1E1B4B]">Verbatim Transcript Comparison</td>
                    <td className="py-4 px-6 text-[#0F766E] flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Compared against Staff baseline
                    </td>
                    <td className="py-4 px-6 text-rose-600 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Generic text summary
                    </td>
                    <td className="py-4 px-6 text-rose-600 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> No model comparison
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-[#1E1B4B]">Cost & Availability</td>
                    <td className="py-4 px-6 text-[#E05A47] font-bold">
                      Unlimited · 24/7 on demand
                    </td>
                    <td className="py-4 px-6 text-[#71717A]">Free / Disjointed</td>
                    <td className="py-4 px-6 text-rose-600 font-medium">$150–$300 per 45m session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
export default Methodology;
