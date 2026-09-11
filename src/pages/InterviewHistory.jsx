import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Filter,
  History,
  Play
} from 'lucide-react';
import { interviewService } from '../services/interviewService';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export const InterviewHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await interviewService.getHistory();
        setHistory(res);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const matchSearch =
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'All' || item.type.toLowerCase() === selectedType.toLowerCase();
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
            <span className="font-mono text-[10px] text-[#B45309] uppercase tracking-widest font-bold">
              HISTORICAL SIMULATION ARCHIVES
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1B4B]">
            Simulation History
          </h1>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Audit logs and longitudinal debrief records for all evaluated interview chambers.
          </p>
        </div>

        <button
          onClick={() => navigate('/interview/setup')}
          className="px-4 py-2.5 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Initiate New Session</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter archives by role or mode..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-amber-200 rounded-xl text-[#1E1B4B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#E05A47] transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['All', 'Technical', 'Behavioral', 'Mixed'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                selectedType === t
                  ? 'clay-btn-terracotta text-white border-transparent shadow-sm'
                  : 'bg-white border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Telemetry Log Table */}
      <Card className="clay-card-antique border-2 border-white shadow-sm overflow-hidden p-0">
        {loading ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center space-y-3 p-8">
            <div className="w-8 h-8 rounded-full border-2 border-[#E05A47] border-t-transparent animate-spin" />
            <p className="font-mono text-xs text-[#71717A] uppercase tracking-wider">READING TELEMETRY ARCHIVES...</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-16 text-[#71717A] text-xs font-mono">
            NO SIMULATION ARCHIVES FOUND
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-amber-200/80 bg-amber-50/70 font-mono text-[10px] text-[#B45309] uppercase font-bold">
                <tr>
                  <th className="py-3.5 px-6">Track / Specialization</th>
                  <th className="py-3.5 px-4">Evaluation Mode</th>
                  <th className="py-3.5 px-4">Rigor Tier</th>
                  <th className="py-3.5 px-4">Conviction Score</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-6 text-right">Audit Debrief</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/10">
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-amber-50/40 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/interview/result/${item.id}`)}
                  >
                    <td className="py-4 px-6 font-bold text-[#1E1B4B] group-hover:text-[#E05A47] transition-colors">
                      {item.role}
                    </td>
                    <td className="py-4 px-4 text-[#52525B] font-medium">
                      {item.type}
                    </td>
                    <td className="py-4 px-4">
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
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-sm text-[#1E1B4B]">
                        {item.score}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#71717A] font-mono text-[11px]">
                      {item.duration}
                    </td>
                    <td className="py-4 px-4 text-[#71717A] font-mono text-[11px]">
                      {item.date}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/interview/result/${item.id}`);
                        }}
                        className="px-3 py-1 rounded-lg border border-amber-200 text-xs font-bold text-[#1E1B4B] hover:text-[#E05A47] hover:border-[#E05A47]/40 hover:bg-white inline-flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3 h-3 text-[#E05A47]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
export default InterviewHistory;