import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Award,
  HelpCircle,
  Flame,
  Play,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { interviewService } from '../services/interviewService';
import { Button } from '../components/ui/button';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDash = async () => {
      try {
        const res = await interviewService.getDashboardData();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchDash();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-9 h-9 rounded-full border-3 border-[#E05A47] border-t-transparent animate-spin" />
        <p className="font-mono text-xs text-[#71717A] uppercase tracking-widest font-bold">
          STREAMING TELEMETRY VECTORS...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Welcome Banner */}
      <div className="clay-card-antique p-7 sm:p-9 border-2 border-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[#B45309] text-[11px] font-bold uppercase tracking-wider clay-pill-inset">
            <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
            <span>MISSION CONTROL · ACTIVE OPERATOR</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1E1B4B]">
            Welcome back, {user?.name?.split(' ')[0] || 'Operator'}.
          </h1>
          <p className="text-sm text-[#52525B] max-w-xl leading-relaxed">
            Your readiness score is trending in the top 6th percentile for {user?.targetRole || 'Distributed Systems Architecture'}. Ready to launch today's simulation chamber?
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/interview/setup')}
            className="clay-btn-terracotta text-white px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Simulation</span>
          </motion.button>
        </div>
      </div>

      {/* Key Telemetry Stat Cards (Zero Emojis) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: 'Interviews Completed',
            value: data.stats.interviewsCompleted,
            sub: '+3 sessions this week',
            icon: CheckCircle2,
            accent: 'text-[#E05A47]',
          },
          {
            title: 'Average Conviction Score',
            value: `${data.stats.averageScore}%`,
            sub: '+6.2% vs peer cohort',
            icon: Award,
            accent: 'text-[#0F766E]',
          },
          {
            title: 'Questions Conquered',
            value: data.stats.questionsAnswered,
            sub: 'Across 6 technical domains',
            icon: HelpCircle,
            accent: 'text-[#B45309]',
          },
          {
            title: 'Active Day Streak',
            value: `${data.stats.currentStreak} Days`,
            sub: 'Personal record: 12 days',
            icon: Flame,
            accent: 'text-[#E05A47]',
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="clay-card-antique p-6 border-2 border-white shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#71717A] font-bold">
                  {stat.title}
                </span>
                <Icon className={`w-4 h-4 ${stat.accent}`} />
              </div>
              <p className="font-mono text-3xl font-extrabold text-[#1E1B4B] tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] text-[#71717A] font-mono">
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Center Charts & Competencies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Score Trajectory Area Chart */}
        <div className="lg:col-span-8 clay-card-antique p-7 border-2 border-white shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div>
              <span className="font-mono text-[10px] text-[#71717A] uppercase font-bold">
                HISTORICAL PERFORMANCE
              </span>
              <h2 className="font-serif text-xl font-bold text-[#1E1B4B]">
                Conviction Score Trajectory
              </h2>
            </div>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#0F766E] border border-emerald-200">
              +23% NET GROWTH
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.scoreTrend}>
                <defs>
                  <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E05A47" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E05A47" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3ECE2" />
                <XAxis dataKey="date" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#71717A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E6DCCF',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px -5px rgba(30,27,75,0.1)',
                    fontSize: '12px',
                    color: '#1E1B4B',
                    fontWeight: 'bold',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#E05A47"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#scoreGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Breakdown */}
        <div className="lg:col-span-4 clay-card-antique p-7 border-2 border-white shadow-lg space-y-5">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <span className="font-serif text-lg font-bold text-[#1E1B4B]">
              Skill Vectors
            </span>
            <span className="text-xs font-mono font-bold text-[#B45309]">SCORED</span>
          </div>

          <div className="space-y-4">
            {data.skillAnalysis.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#52525B]">{item.skill}</span>
                  <span className="font-mono text-[#1E1B4B]">{item.score}%</span>
                </div>
                <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#E05A47] to-[#D97706] rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-amber-100">
            <button
              onClick={() => navigate('/analytics')}
              className="w-full py-2.5 rounded-xl border border-amber-200 text-xs font-bold text-[#1E1B4B] hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E05A47]" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom: Recent Sessions & Recommended Drills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Recent History List */}
        <div className="lg:col-span-8 clay-card-antique p-7 border-2 border-white shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div>
              <span className="font-mono text-[10px] text-[#71717A] uppercase font-bold">CHAMBER LOGS</span>
              <h2 className="font-serif text-xl font-bold text-[#1E1B4B]">Recent Simulations</h2>
            </div>
            <button
              onClick={() => navigate('/history')}
              className="text-xs font-bold text-[#B45309] hover:underline flex items-center gap-1"
            >
              <span>All Archives</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {data.recentInterviews.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/interview/result/${item.id}`)}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-amber-200/80 hover:border-[#E05A47] flex items-center justify-between transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#E05A47] shadow-sm">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1E1B4B] group-hover:text-[#E05A47] transition-colors">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-[#71717A] font-mono mt-0.5">
                      {item.type} · {item.difficulty} · {item.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`font-mono text-xs font-bold px-3 py-1 rounded-full border ${
                    item.score >= 85
                      ? 'bg-emerald-50 text-[#0F766E] border-emerald-200'
                      : 'bg-amber-50 text-[#B45309] border-amber-200'
                  }`}>
                    {item.score}%
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#71717A] group-hover:text-[#1E1B4B] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Practice Drills */}
        <div className="lg:col-span-4 clay-card-antique p-7 border-2 border-white shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <span className="font-serif text-lg font-bold text-[#1E1B4B]">
              Recommended Drills
            </span>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-[#B45309]">
              AI IDENTIFIED
            </span>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Distributed Cache Invalidation', tag: 'Architecture', time: '5m drill' },
              { title: 'React 19 Server Actions & SSR', tag: 'Frontend', time: '4m drill' },
              { title: 'STAR: Handling Project Failure', tag: 'Behavioral', time: '3m drill' },
            ].map((d, i) => (
              <div
                key={i}
                onClick={() => navigate('/questions')}
                className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-amber-200/80 hover:border-[#E05A47] cursor-pointer transition-all text-left shadow-sm"
              >
                <span className="text-[10px] font-mono text-[#E05A47] uppercase font-bold">
                  {d.tag}
                </span>
                <p className="text-xs font-bold text-[#1E1B4B] mt-0.5">{d.title}</p>
                <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-[#71717A]">
                  <span>{d.time}</span>
                  <span className="text-[#E05A47] font-bold flex items-center gap-1">
                    Start Drill <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
export default Dashboard;