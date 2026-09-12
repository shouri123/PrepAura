import React from 'react';
import { Card } from '../ui/card';
import { Clock, Tag, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuestionBankCard = ({ item }) => {
  const navigate = useNavigate();

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-[#0F766E] border-emerald-200',
    Medium: 'bg-amber-50 text-[#B45309] border-amber-200',
    Hard: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <Card className="clay-card-antique p-5 border-2 border-white shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-full border ${
              difficultyColors[item.difficulty] || difficultyColors.Medium
            }`}
          >
            {item.difficulty}
          </span>

          <span className="flex items-center text-xs font-mono font-medium text-[#71717A] gap-1">
            <Clock className="w-3.5 h-3.5 text-[#E05A47]" />
            {item.timeEstimate || '3 mins'}
          </span>
        </div>

        <h4 className="text-sm font-serif font-bold text-[#1E1B4B] leading-snug mb-2">
          {item.question}
        </h4>
      </div>

      <div className="mt-4 pt-3 border-t border-amber-900/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#52525B] font-medium">
          <Tag className="w-3.5 h-3.5 text-[#E05A47]" />
          {item.topic}
        </div>

        <button
          onClick={() => navigate('/interview/setup')}
          className="px-3 py-1.5 rounded-xl border border-amber-200 bg-white text-xs font-bold text-[#1E1B4B] hover:text-[#E05A47] hover:border-[#E05A47]/40 flex items-center gap-1 cursor-pointer shadow-sm transition-all"
        >
          Practice
          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>
    </Card>
  );
};