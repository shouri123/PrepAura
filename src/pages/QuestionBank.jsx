import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Lightbulb,
  Clock,
  Play,
  ChevronDown,
  ChevronUp,
  Tag,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { questionService } from '../services/questionService';
import { useInterview } from '../hooks/useInterview';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export const QuestionBank = () => {
  const navigate = useNavigate();
  const { initializeSession } = useInterview();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchQ = async () => {
      try {
        const res = await questionService.getQuestions();
        setQuestions(res);
      } finally {
        setLoading(false);
      }
    };
    fetchQ();
  }, []);

  const topics = ['All', 'React', 'JavaScript', 'Conflict Resolution', 'DBMS', 'Architecture'];

  const filtered = questions.filter((q) => {
    const sTerm = searchTerm.toLowerCase();
    const qText = (q.question || '').toLowerCase();
    const qTopic = (q.topic || '').toLowerCase();
    const qRole = (q.role || '').toLowerCase();

    const matchSearch =
      qText.includes(sTerm) || qTopic.includes(sTerm) || qRole.includes(sTerm);
    const matchTopic =
      selectedTopic === 'All' || qTopic === selectedTopic.toLowerCase();
    const matchDiff =
      selectedDifficulty === 'All' ||
      (q.difficulty || '').toLowerCase() === selectedDifficulty.toLowerCase();
    return matchSearch && matchTopic && matchDiff;
  });

  const handleLaunchDrill = (question) => {
    initializeSession({
      interviewId: 'drill_' + Date.now(),
      config: {
        role: question.role,
        difficulty: question.difficulty,
        questionCount: 1,
      },
      questions: [question],
    });
    navigate('/interview/session');
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
            <span className="font-mono text-[10px] text-[#B45309] uppercase tracking-widest font-bold">
              CURATED REPOSITORY · HIGH YIELD
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1B4B]">
            Curated Question Bank
          </h1>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Explore verified prompts from tier-1 engineering and leadership loops with evaluation rubrics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] px-3 py-1.5 rounded-xl bg-white border border-amber-200">
          <BookOpen className="w-4 h-4 text-[#E05A47]" />
          <span>CATALOG: {filtered.length} ACTIVE PROMPTS</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword, domain, concept..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-amber-200 rounded-xl text-[#1E1B4B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#E05A47] transition-all shadow-sm"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3.5 py-2.5 text-xs bg-white border border-amber-200 rounded-xl text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47] font-medium shadow-sm cursor-pointer"
          >
            <option value="All">All Rigor Tiers</option>
            <option value="Easy">Apprentice (Easy)</option>
            <option value="Medium">Practitioner (Medium)</option>
            <option value="Hard">Architect (Hard)</option>
          </select>
        </div>

        {/* Topic Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTopic(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                selectedTopic === t
                  ? 'clay-btn-terracotta text-white border-transparent shadow-sm'
                  : 'bg-white border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Matrix */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#E05A47] border-t-transparent animate-spin" />
          <p className="font-mono text-xs text-[#71717A] uppercase tracking-wider">QUERYING CATALOG...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[#71717A] text-xs font-mono border border-amber-200 rounded-2xl bg-white">
          NO PROMPTS MATCHED FILTER CRITERIA
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <Card
                key={item.id}
                className="clay-card-antique p-6 border-2 border-white shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#B45309] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                        {item.topic}
                      </span>
                      <span className="font-mono text-[10px] text-[#71717A]">
                        {item.role}
                      </span>
                    </div>

                    <Badge
                      variant={
                        item.difficulty === 'Hard'
                          ? 'error'
                          : item.difficulty === 'Medium'
                          ? 'warning'
                          : 'default'
                      }
                      className="text-[10px] font-mono"
                    >
                      {item.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-serif font-bold text-[#1E1B4B] leading-relaxed">
                    {item.question}
                  </h3>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5 text-[#B45309] font-mono text-[11px] font-bold">
                        <Lightbulb className="w-3.5 h-3.5 text-[#E05A47]" />
                        <span>Evaluation Rubric & Approach Hint:</span>
                      </div>
                      <p className="text-[#52525B] leading-relaxed font-sans">
                        {item.hint || 'Discuss performance constraints, scale edge-cases, and production tradeoffs.'}
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between text-xs text-[#71717A] font-mono mt-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#71717A]" />
                    <span>~{item.timeEstimate || '3 mins'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="text-xs font-bold text-[#52525B] hover:text-[#1E1B4B] px-2.5 py-1.5 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
                    >
                      {isExpanded ? 'Hide Hint' : 'Inspect Hint'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLaunchDrill(item)}
                      className="px-3.5 py-1.5 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Launch Drill</span>
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default QuestionBank;