import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Award,
  RotateCcw,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  Bot,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  Layers,
  Compass
} from 'lucide-react';
import { interviewService } from '../services/interviewService';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

export const InterviewResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const scoreRef = useRef(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await interviewService.getInterviewResult(id);
        setResult(res);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  // GSAP score counter animation
  useEffect(() => {
    if (!loading && result && scoreRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: result.overallScore,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (scoreRef.current) {
            scoreRef.current.innerText = Math.round(obj.val);
          }
        },
      });
    }
  }, [loading, result]);

  if (loading || !result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#E05A47] border-t-transparent animate-spin" />
        <p className="font-mono text-xs text-[#71717A] uppercase tracking-widest">
          COMPILING AI ASSESSMENT TELEMETRY...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
            <span className="font-mono text-[10px] text-[#0F766E] uppercase tracking-widest font-bold">
              TELEMETRY REPORT · COMPILED
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1B4B]">
            Simulation Assessment Debrief
          </h1>
          <p className="text-xs text-[#71717A] mt-1 font-mono">
            {result.role} · {result.type} · Session ID #{id || result.id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/interview/setup')}
            className="px-4 py-2 rounded-xl border border-amber-200 bg-white text-xs font-bold text-[#1E1B4B] hover:text-[#E05A47] hover:border-[#E05A47]/40 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Drill</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-xl clay-btn-terracotta text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Mission Control</span>
          </button>
        </div>
      </div>

      {/* Hero Score Matrix & Evaluation Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overall Readiness Score Card */}
        <Card className="lg:col-span-5 clay-card-antique p-8 flex flex-col justify-between items-center text-center border-2 border-white shadow-sm relative overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#B45309]">
              CONVICTION INDEX
            </span>
            <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F766E]">
              STRONG PASS
            </span>
          </div>

          <div className="my-6">
            <div className="flex items-baseline justify-center">
              <span
                ref={scoreRef}
                className="font-mono text-6xl sm:text-7xl font-bold text-[#1E1B4B] tracking-tighter"
              >
                0
              </span>
              <span className="font-mono text-xl text-[#71717A] ml-1">/100</span>
            </div>
            <p className="text-xs text-[#52525B] mt-2 font-medium">
              Calibrated against L5/L6 Industry Benchmarks
            </p>
          </div>

          <div className="w-full pt-4 border-t border-amber-900/10 flex items-center justify-between text-xs text-[#71717A] font-mono font-bold">
            <span>PERCENTILE: TOP 6%</span>
            <span className="text-[#0F766E]">READY FOR ONSITE</span>
          </div>
        </Card>

        {/* Evaluation Metrics Breakdown */}
        <Card className="lg:col-span-7 clay-card-antique p-6 space-y-5 border-2 border-white shadow-sm">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B45309]">
              COMPETENCY TELEMETRY
            </span>
            <span className="text-xs text-[#71717A] font-mono font-bold">WEIGHTED CRITERIA</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-[#1E1B4B]">Technical Rigor & Depth</span>
                <span className="font-mono text-[#E05A47] font-bold">{result.scores?.technical ?? 80}%</span>
              </div>
              <Progress value={result.scores?.technical ?? 80} />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-[#1E1B4B]">Communication & Structured Delivery</span>
                <span className="font-mono text-[#0F766E] font-bold">{result.scores?.communication ?? 80}%</span>
              </div>
              <Progress value={result.scores?.communication ?? 80} />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-[#1E1B4B]">Problem Decomposition & Trade-offs</span>
                <span className="font-mono text-[#B45309] font-bold">{result.scores?.problemSolving ?? 80}%</span>
              </div>
              <Progress value={result.scores?.problemSolving ?? 80} />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-[#1E1B4B]">Confidence & Edge-case Conviction</span>
                <span className="font-mono text-[#1E1B4B] font-bold">{result.scores?.confidence ?? 75}%</span>
              </div>
              <Progress value={result.scores?.confidence ?? 75} />
            </div>
          </div>
        </Card>
      </div>

      {/* AI Bar Raiser Executive Summary */}
      <Card className="clay-card-amber p-6 border-2 border-white shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#E05A47]">
          <Bot className="w-4 h-4" />
          <span className="font-mono text-xs uppercase font-bold tracking-wider">
            AI Staff Evaluator Executive Debrief
          </span>
        </div>
        <p className="text-sm text-[#1E1B4B] leading-relaxed font-serif">
          "{result.aiRecommendation}"
        </p>
      </Card>

      {/* Strengths & Growth Vectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Demonstrated Strengths</span>
          </div>
          <ul className="space-y-3">
            {(result.strengths || []).map((str, idx) => (
              <li key={idx} className="text-xs text-[#52525B] flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Growth Vectors */}
        <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#E05A47] text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Targeted Growth Vectors</span>
          </div>
          <ul className="space-y-3">
            {(result.improvements || result.weaknesses || []).map((imp, idx) => (
              <li key={idx} className="text-xs text-[#52525B] flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E05A47] mt-1.5 shrink-0" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Detailed Question Review Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B45309]">
            QUESTION-BY-QUESTION AUDIT
          </span>
          <span className="text-xs text-[#71717A] font-mono">
            {result.questionReviews?.length || 0} Evaluated Prompts
          </span>
        </div>

        <div className="space-y-3">
          {result.questionReviews?.map((qr, idx) => {
            const isExpanded = expandedQuestion === idx;
            return (
              <Card
                key={idx}
                className="clay-card-antique border-2 border-white shadow-sm transition-colors overflow-hidden p-0"
              >
                <button
                  type="button"
                  onClick={() => setExpandedQuestion(isExpanded ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-amber-50/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="font-mono text-xs text-[#E05A47] font-bold">
                      Q{idx + 1}
                    </span>
                    <p className="text-xs font-bold text-[#1E1B4B] truncate">
                      {qr.question}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      qr.score >= 85 ? 'bg-emerald-50 text-[#0F766E] border border-emerald-200' : 'bg-amber-50 text-[#B45309] border border-amber-200'
                    }`}>
                      {qr.score}/100
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#71717A]" /> : <ChevronDown className="w-4 h-4 text-[#71717A]" />}
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-5 pt-0 border-t border-amber-900/10 space-y-4 bg-amber-50/20"
                  >
                    {/* User Answer */}
                    <div className="space-y-1 pt-4">
                      <span className="text-[10px] font-mono text-[#71717A] font-bold uppercase">Your Transcribed Answer</span>
                      <p className="text-xs text-[#52525B] bg-white p-3 rounded-xl border border-amber-200 leading-relaxed font-sans">
                        "{qr.userAnswer}"
                      </p>
                    </div>

                    {/* AI Feedback */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#E05A47] font-bold uppercase">Evaluator Critique</span>
                      <p className="text-xs text-[#1E1B4B] leading-relaxed">
                        {qr.aiEvaluation}
                      </p>
                    </div>

                    {/* Model Answer */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#0F766E] font-bold uppercase">Benchmark Model Answer</span>
                      <p className="text-xs text-[#52525B] bg-white p-3 rounded-xl border border-amber-200 leading-relaxed font-sans">
                        {qr.modelAnswer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default InterviewResult;