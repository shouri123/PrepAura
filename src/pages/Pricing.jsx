import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Zap,
  Layers
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Pricing = () => {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const tiers = [
    {
      name: 'Evaluation Sprint',
      badge: 'Single Target',
      price: annual ? '$39' : '$49',
      period: 'per month',
      description: 'Ideal for candidates preparing for an upcoming interview loop within 30 days.',
      features: [
        '10 Full Adaptive Simulations / month',
        'Staff & Senior L5 System Rubrics',
        'Verbatim Voice Transcript Diagnostics',
        'Sub-300ms Voice Latency Chamber',
        'Standard Question Bank Access (400+ Drills)',
      ],
      cta: 'Start Evaluation Sprint',
      isPopular: false,
    },
    {
      name: 'Full Chamber Pro',
      badge: 'Most Popular',
      price: annual ? '$79' : '$99',
      period: 'per month',
      description: 'The complete bar-raiser workstation for high-conviction Staff and Principal candidates.',
      features: [
        'Unlimited Adaptive Mock Simulations',
        'All Seniority Rubrics (Junior L3 to Principal L7)',
        'Deep Semantic Trade-off Decomposition',
        'Voice Cadence & Delivery Pacing Diagnostics',
        'Whiteboard Architectural Simulator',
        'Comparative Model Transcripts (Staff Baselines)',
        'Priority Sub-180ms Neural Audio Pipeline',
      ],
      cta: 'Access Full Chamber Pro',
      isPopular: true,
    },
    {
      name: 'Executive & Team',
      badge: 'Enterprise',
      price: annual ? '$199' : '$249',
      period: 'per seat / month',
      description: 'Designed for engineering leadership candidates and organizations training hiring teams.',
      features: [
        'Everything in Full Chamber Pro',
        'Custom Calibration Against Internal Bar Raisers',
        'Executive Leadership & Organizational Scenarios',
        'Hiring Manager Rubric Design Chamber',
        'Dedicated Enterprise Account Support',
        'SOC-2 Compliant Zero Data Retention Mode',
      ],
      cta: 'Contact Enterprise Advisory',
      isPopular: false,
    },
  ];

  const faqs = [
    {
      q: 'How does PrepAura compare to human mock interview platforms?',
      a: 'Human platforms charge $150 to $300 per single 45-minute mock session, often with scheduling friction and variable interviewer quality. PrepAura delivers unlimited, on-demand simulations 24/7 with zero latency, consistent tier-1 bar-raiser rubrics, and verbatim comparative model analyses at a predictable subscription cost.',
    },
    {
      q: 'Can I cancel or pause my subscription at any time?',
      a: 'Yes, absolutely. You can cancel with a single click from your account settings at any time. You will retain full chamber access until the conclusion of your active billing period.',
    },
    {
      q: 'What AI models power the evaluation engine?',
      a: 'PrepAura is powered by frontier reasoning models orchestrated through our custom latency-optimized speech-to-speech evaluation pipeline, eliminating conversational delay.',
    },
    {
      q: 'Is my voice and transcript data kept confidential?',
      a: 'Yes. We enforce strict enterprise-grade isolation. Transcripts and simulation recordings are encrypted at rest, stored strictly under your private account, and never used to train public models.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B4B] font-modern selection:bg-[#E05A47] selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Background Subtle Antique Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#D97706_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
      
      <Navbar />

      <main className="w-full pt-28 pb-16">
        
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop pb-14 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-[#B45309] text-xs font-bold uppercase tracking-wider clay-pill-inset">
              <Layers className="w-3.5 h-3.5 text-[#E05A47]" />
              <span>TRANSPARENT COMMITMENT TIERS</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1B4B] leading-[1.12]">
              Predictable investment. <br className="hidden sm:inline" />
              <span className="text-[#E05A47] italic font-serif">Uncompromising preparation.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl mx-auto">
              Choose the tier calibrated to your interview timeline. Unlimited simulation chambers, real-time audio, and precision debriefs.
            </p>

            {/* Annual vs Monthly Toggle */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <span className={`text-xs font-bold ${!annual ? 'text-[#1E1B4B]' : 'text-[#71717A]'}`}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setAnnual(!annual)}
                className="w-12 h-6 rounded-full bg-amber-100 border border-amber-300 relative transition-colors cursor-pointer p-0.5"
                aria-label="Toggle annual pricing"
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-[#E05A47] shadow-md"
                  animate={{ x: annual ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${annual ? 'text-[#1E1B4B]' : 'text-[#71717A]'}`}>
                <span>Annual Commitment</span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0F766E] border border-emerald-300">
                  SAVE 20%
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                whileHover={{ y: -6 }}
                className={`p-8 sm:p-9 rounded-3xl flex flex-col justify-between relative transition-all border-2 text-left ${
                  tier.isPopular
                    ? 'clay-card-terracotta border-[#E05A47]/40 shadow-2xl scale-105'
                    : 'clay-card-antique border-white shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-[#B45309] border border-amber-300">
                      {tier.badge}
                    </span>
                    {tier.isPopular && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#E05A47] font-bold">
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-[#1E1B4B] mb-2">
                    {tier.name}
                  </h2>

                  <p className="text-xs text-[#52525B] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-amber-900/10">
                    <span className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E1B4B]">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[#71717A] font-medium">{tier.period}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#1E1B4B]">
                        <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/register')}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    tier.isPopular
                      ? 'clay-btn-terracotta text-white'
                      : 'clay-card-antique text-[#1E1B4B] hover:bg-amber-50 border border-amber-300/80'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="clay-card-antique p-8 sm:p-12 border-2 border-white shadow-xl space-y-8 text-left">
            <div className="text-center max-w-lg mx-auto">
              <span className="font-mono text-xs text-[#B45309] uppercase tracking-widest font-bold">
                CLARITY & ASSURANCES
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1E1B4B] mt-1">
                Frequently Addressed Inquiries
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-amber-200/80 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left font-serif font-bold text-base text-[#1E1B4B] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#E05A47]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-[#71717A]" />}
                    </button>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs sm:text-sm text-[#52525B] leading-relaxed pt-3 border-t border-amber-200/50 mt-3"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
export default Pricing;
