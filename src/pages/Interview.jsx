import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Timer,
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

const parseTimeEstimate = (est) => {
  if (!est) return 180;
  if (typeof est === 'number') return est * 60;
  const match = String(est).match(/\d+/);
  return match ? parseInt(match[0], 10) * 60 : 180;
};

export const Interview = () => {
  const navigate = useNavigate();
  const { session, saveAnswer, setQuestionIndex, resetSession } = useInterview();

  const currentIndex = session.currentIndex || 0;
  const currentQ = session.questions?.[currentIndex] || {};
  const totalQ = session.questions?.length || 1;
  const progressPercent = ((currentIndex + 1) / totalQ) * 100;

  const [seconds, setSeconds] = useState(() => {
    if (session?.startTime) {
      return Math.max(0, Math.floor((Date.now() - session.startTime) / 1000));
    }
    return 0;
  });
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(() =>
    parseTimeEstimate(session.questions?.[currentIndex]?.timeEstimate)
  );
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  // Audio Telemetry & Speech Recognition State
  const [waveformBars, setWaveformBars] = useState([12, 28, 45, 20, 60, 35, 75, 40, 55, 30, 68, 25, 40, 18]);
  const [speechActive, setSpeechActive] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const recognitionRef = useRef(null);

  // Redirect if there are no questions
  useEffect(() => {
    if (!session.questions || session.questions.length === 0) {
      navigate('/interview/setup');
    }
  }, [session, navigate]);

  // Synchronize question countdown timer on question switch
  useEffect(() => {
    const qSecs = parseTimeEstimate(session.questions?.[currentIndex]?.timeEstimate);
    setQuestionSecondsLeft(qSecs);
  }, [currentIndex, session.questions]);

  // Chamber stopwatch and question countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
      setQuestionSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio API live microphone stream
  useEffect(() => {
    let isSubscribed = true;

    const initAudio = async () => {
      if (micMuted) {
        if (streamRef.current) {
          streamRef.current.getAudioTracks().forEach((track) => {
            track.enabled = false;
          });
        }
        return;
      }

      if (!navigator?.mediaDevices?.getUserMedia) {
        return;
      }

      try {
        if (!streamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (!isSubscribed) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          streamRef.current = stream;

          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            const source = ctx.createMediaStreamSource(stream);
            source.connect(analyser);

            audioContextRef.current = ctx;
            analyserRef.current = analyser;
          }
        } else {
          streamRef.current.getAudioTracks().forEach((track) => {
            track.enabled = true;
          });
        }

        const renderAudioTelemetry = () => {
          if (analyserRef.current && !micMuted) {
            const data = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(data);
            const bars = [];
            const step = Math.max(1, Math.floor(data.length / 14));
            for (let i = 0; i < 14; i++) {
              const val = data[i * step] || 0;
              const height = Math.max(8, Math.min(80, Math.round((val / 255) * 80)));
              bars.push(height);
            }
            setWaveformBars(bars);
          }
          animFrameRef.current = requestAnimationFrame(renderAudioTelemetry);
        };
        animFrameRef.current = requestAnimationFrame(renderAudioTelemetry);
      } catch {
        // Microphone access denied or headless, fallback waveform will operate
      }
    };

    initAudio();

    return () => {
      isSubscribed = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [micMuted]);

  // Web Speech API Continuous Transcription
  useEffect(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setSpeechActive(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' ';
          }
        }
        if (transcript.trim()) {
          setCurrentText((prev) => {
            const separator = prev.length && !prev.endsWith(' ') ? ' ' : '';
            const updated = prev + separator + transcript.trim();
            saveAnswer(currentIndex, updated);
            return updated;
          });
        }
      };

      recognition.onerror = () => {
        // Fallback silently to manual keyboard input
      };

      recognition.onend = () => {
        if (!micMuted && recognitionRef.current) {
          try {
            recognition.start();
          } catch {
            setSpeechActive(false);
          }
        } else {
          setSpeechActive(false);
        }
      };

      if (!micMuted) {
        try {
          recognition.start();
        } catch {
          // Already running
        }
      }
      recognitionRef.current = recognition;
    } catch {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
    };
  }, [currentIndex, micMuted]);

  // Clean up media streams and context on chamber exit
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

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
      resetSession();
      const targetId = result?.interviewId || result?.id || session.interviewId;
      navigate(`/interview/result/${targetId}`);
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
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Question Pacing Countdown */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border shadow-sm transition-colors ${
              questionSecondsLeft <= 30
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-amber-200 text-[#1E1B4B]'
            }`}
          >
            <Timer className={`w-3.5 h-3.5 ${questionSecondsLeft <= 30 ? 'text-rose-600 animate-pulse' : 'text-[#E05A47]'}`} />
            <div className="flex items-baseline gap-1 font-mono text-xs font-bold">
              <span className="text-[10px] text-[#71717A] uppercase font-mono hidden sm:inline">PACE</span>
              <span>{formatTimer(questionSecondsLeft)}</span>
            </div>
          </div>

          {/* Chamber Stopwatch Duration */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#B45309]" />
            <div className="flex items-baseline gap-1 font-mono text-xs font-bold text-[#1E1B4B]">
              <span className="text-[10px] text-[#71717A] uppercase font-mono">TOTAL</span>
              <span>{formatTimer(seconds)}</span>
            </div>
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
            <div className="py-8 flex items-center justify-center gap-1.5 h-24">
              {waveformBars.map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-[#E05A47] rounded-full transition-all duration-75"
                  style={{ height: `${micMuted ? 8 : Math.max(8, h)}px` }}
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
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    micMuted
                      ? 'bg-rose-500'
                      : speechSupported && speechActive
                      ? 'bg-[#0F766E] animate-pulse'
                      : 'bg-amber-500'
                  }`}
                />
                {micMuted
                  ? 'Sensor Suspended (Muted)'
                  : speechSupported && speechActive
                  ? 'Speech-to-Text Synchronized'
                  : 'Manual Keyboard Input Active'}
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
                resetSession();
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