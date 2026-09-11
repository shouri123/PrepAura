import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Mic,
  MicOff,
  Video,
  VideoOff,
  ChevronLeft,
  ChevronRight,
  Send,
  Lightbulb,
  AlertTriangle,
  Bot,
  User,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { useInterview } from '../hooks/useInterview';
import { interviewService } from '../services/interviewService';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';

export const Interview = () => {
  const navigate = useNavigate();
  const { session, saveAnswer, setQuestionIndex } = useInterview();

  const [seconds, setSeconds] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  // Redirect if there are no questions
  useEffect(() => {
    if (!session.questions || session.questions.length === 0) {
      navigate('/interview/setup');
    }
  }, [session, navigate]);

  // Session stopwatch timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentIndex = session.currentIndex || 0;
  const currentQ = session.questions?.[currentIndex] || {};
  const totalQ = session.questions?.length || 1;
  const progressPercent = ((currentIndex + 1) / totalQ) * 100;

  useEffect(() => {
    setCurrentText(session.answers?.[currentIndex] || '');
    setShowHint(false);
  }, [currentIndex, session.answers]);

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
    saveAnswer(currentIndex, e.target.value);
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setQuestionIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setQuestionIndex(currentIndex - 1);
    }
  };

  const handleComplete = async () => {
    setSubmitting(true);
    try {
      const result = await interviewService.completeInterview(session.interviewId);
      navigate(`/interview/result/${result.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session.questions?.length) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B4B] font-modern flex flex-col justify-between select-none">
      {/* Top Session Command Bar */}
      <header className="h-16 px-6 lg:px-10 flex items-center justify-between border-b border-amber-900/10 bg-white/95 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E05A47] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#1E1B4B] font-bold">
              CHAMBER LIVE · {session.config?.role || 'Frontend Architecture'}
            </span>
          </div>
          <span className="text-amber-300 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-[#71717A] hidden sm:inline">
            DIFFICULTY: {session.config?.difficulty || 'Medium'}
          </span>
        </div>

        {/* Center Progress pill */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#71717A]">
            QUESTION <span className="text-[#1E1B4B] font-bold">{currentIndex + 1}</span> OF {totalQ}
          </span>
          <div className="w-28 hidden md:block">
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        {/* Right Timer & Exit */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-amber-200 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#E05A47]" />
            <span className="font-mono text-xs font-bold text-[#1E1B4B]">
              {formatTimer(seconds)}
            </span>
          </div>

          <button
            onClick={() => setShowExitModal(true)}
            className="text-xs font-bold text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 cursor-pointer transition-colors"
          >
            Abort Chamber
          </button>
        </div>
      </header>

      {/* Main Simulation Arena */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
        {/* Left Column: AI Evaluator Station */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* AI Evaluator Feed */}
          <div className="clay-card-antique p-6 border-2 border-white shadow-sm flex flex-col justify-between flex-1 min-h-[320px] relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-[#E05A47] border border-amber-200">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B4B]">AI Bar Raiser</p>
                  <p className="text-[10px] font-mono text-[#71717A]">Audio Stream Active</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#B45309]">
                SYNTHESIZING
              </span>
            </div>

            {/* Live Audio Waveform visualizer */}
            <div className="py-8 flex items-center justify-center gap-1.5">
              {[12, 28, 45, 20, 60, 35, 75, 40, 55, 30, 68, 25, 40, 18].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [h * 0.4, h, h * 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    delay: i * 0.08,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 bg-[#E05A47] rounded-full"
                  style={{ minHeight: '8px' }}
                />
              ))}
            </div>

            {/* Prompt Transcription */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-[#B45309] text-xs font-bold font-mono">
                <Volume2 className="w-3.5 h-3.5 text-[#E05A47]" />
                <span>CURRENT PROMPT QUERY</span>
              </div>
              <p className="text-sm font-serif font-bold text-[#1E1B4B] leading-relaxed">
                "{currentQ.question}"
              </p>
            </div>
          </div>

          {/* Conceptual Hint Drawer */}
          <div className="clay-card-antique p-4 border-2 border-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#52525B]">
                <Lightbulb className="w-4 h-4 text-[#B45309]" />
                <span>Conceptual Framework Hint</span>
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-bold text-[#71717A] hover:text-[#1E1B4B] px-2.5 py-1 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
              >
                {showHint ? 'Hide' : 'Inspect'}
              </button>
            </div>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-amber-900/10 text-xs text-[#52525B] leading-relaxed"
              >
                {currentQ.hint || 'Focus on trade-offs, scale constraints, and error boundaries.'}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Candidate Response Chamber */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Candidate Sensor Stream Overlay */}
          <div className="clay-card-antique p-4 border-2 border-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-[#B45309] border border-amber-200">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B]">Candidate Transmission</p>
                <p className="text-[10px] font-mono text-[#71717A]">
                  {currentText.split(/\s+/).filter(Boolean).length} Words verbalized
                </p>
              </div>
            </div>

            {/* Hardware toggle controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  micMuted
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-[#FAF7F2] border-amber-200 text-[#52525B] hover:text-[#1E1B4B]'
                }`}
                title="Toggle mic"
              >
                {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setCameraOff(!cameraOff)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  cameraOff
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-[#FAF7F2] border-amber-200 text-[#52525B] hover:text-[#1E1B4B]'
                }`}
                title="Toggle camera"
              >
                {cameraOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Speech-to-Text / Response Editor */}
          <div className="clay-card-antique p-6 border-2 border-white shadow-sm flex flex-col flex-1 min-h-[360px]">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10 mb-3">
              <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider">
                Verbatim Response Stream / Scratchpad
              </span>
              <span className="text-[10px] font-mono text-[#0F766E] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse" />
                Speech Synthesis Sync Active
              </span>
            </div>

            <textarea
              value={currentText}
              onChange={handleTextChange}
              placeholder="State your answer clearly. Discuss trade-offs, architecture decisions, edge cases, and rationale... (You may verbalize or type your response here)"
              className="flex-1 w-full bg-transparent resize-none text-sm text-[#1E1B4B] placeholder:text-[#A1A1AA] focus:outline-none font-sans leading-relaxed p-1"
            />

            {/* Telemetry HUD Footer */}
            <div className="pt-3 border-t border-amber-900/10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#71717A]">
              <div className="flex items-center gap-4">
                <span>EST: ~{currentQ.timeEstimate || '3 mins'}</span>
                <span>ROLE: {currentQ.role || 'Architecture'}</span>
              </div>
              <span className="text-[#E05A47] font-bold">Auto-saved to session state</span>
            </div>
          </div>

          {/* Navigation & Submission Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className={`px-4 py-2.5 rounded-xl border border-amber-200 text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5 transition-all ${
                currentIndex === 0 ? 'opacity-40 cursor-not-allowed bg-amber-50/50' : 'hover:bg-amber-50 cursor-pointer bg-white shadow-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              {currentIndex < totalQ - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Save & Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled={submitting}
                  onClick={handleComplete}
                  className="px-6 py-2.5 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{submitting ? 'Evaluating Session...' : 'Finish & Generate Debrief'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal to Abort */}
      <Dialog open={showExitModal} onOpenChange={setShowExitModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-2 border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <DialogTitle className="text-lg font-serif font-bold text-[#1E1B4B]">
              Abort Active Simulation?
            </DialogTitle>
            <DialogDescription className="text-xs text-[#52525B] leading-relaxed">
              Exiting will terminate the active evaluation session. Answers collected so far will not be scored for telemetry benchmarks.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-amber-900/10">
            <button
              onClick={() => setShowExitModal(false)}
              className="px-4 py-2 rounded-xl border border-amber-200 text-xs font-bold text-[#1E1B4B] hover:bg-amber-50 cursor-pointer"
            >
              Resume Chamber
            </button>
            <button
              onClick={() => {
                setShowExitModal(false);
                navigate('/dashboard');
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-700 cursor-pointer"
            >
              Confirm Exit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Interview;