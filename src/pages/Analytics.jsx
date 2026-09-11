import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  TrendingUp,
  Activity,
  Zap,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { MOCK_SCORE_TREND, MOCK_SKILL_ANALYSIS } from '../utils/mockData';
import { Card, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const Analytics = () => {
  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
            <span className="font-mono text-[10px] text-[#B45309] uppercase tracking-widest font-bold">
              TELEMETRY & LONGITUDINAL DIAGNOSTICS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1B4B]">
            Candidate Performance Analytics
          </h1>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Quantitative telemetry measuring architectural depth, delivery velocity, and structural clarity across sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[#B45309]">
            COHORT: TOP 6.2%
          </span>
        </div>
      </div>

      {/* Top Diagnostics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Cumulative Score', val: '84 / 100', sub: '+12 pts in last 30d', icon: Target },
          { label: 'Verbal Pacing Rate', val: '135 WPM', sub: 'Optimal cadence (120–145)', icon: Clock },
          { label: 'STAR Structure Score', val: '91.2%', sub: 'High structural coherence', icon: Activity },
          { label: 'Weakness Rectification', val: '78%', sub: '7 of 9 vectors resolved', icon: Zap },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Card key={i} className="clay-card-antique p-5 border-2 border-white shadow-sm">
              <div className="flex items-center justify-between text-[#71717A] mb-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">{kpi.label}</span>
                <Icon className="w-4 h-4 text-[#E05A47]" />
              </div>
              <p className="font-mono text-2xl font-bold text-[#1E1B4B]">{kpi.val}</p>
              <p className="text-[11px] text-[#71717A] font-mono mt-1">{kpi.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Evolution Chart */}
        <Card className="lg:col-span-7 clay-card-antique p-6 border-2 border-white shadow-sm">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-4 mb-6">
            <div>
              <span className="font-mono text-[10px] text-[#B45309] uppercase font-bold tracking-wider">
                LONGITUDINAL TELEMETRY
              </span>
              <h2 className="text-base font-serif font-bold text-[#1E1B4B] mt-0.5">Score Evolution Curve</h2>
            </div>
            <span className="text-xs text-[#71717A] font-mono font-bold">OCT – NOV 2026</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SCORE_TREND}>
                <defs>
                  <linearGradient id="analyticsTerracotta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E05A47" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#E05A47" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3ECE2" />
                <XAxis dataKey="date" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#71717A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FDE68A',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#1E1B4B',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#E05A47"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#analyticsTerracotta)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Competency Horizontal Bar Chart */}
        <Card className="lg:col-span-5 clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <div>
              <span className="font-mono text-[10px] text-[#B45309] uppercase font-bold tracking-wider">
                DOMAIN PROFICIENCY
              </span>
              <h2 className="text-base font-serif font-bold text-[#1E1B4B] mt-0.5">Competency Spectrum</h2>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SKILL_ANALYSIS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F3ECE2" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} fontSize={11} stroke="#71717A" tickLine={false} />
                <YAxis
                  dataKey="skill"
                  type="category"
                  width={110}
                  fontSize={11}
                  stroke="#52525B"
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FDE68A',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#1E1B4B',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {MOCK_SKILL_ANALYSIS.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.score >= 85 ? '#E05A47' : '#0F766E'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* AI Diagnostics & Remediation Plan */}
      <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
          <div className="flex items-center gap-2 text-[#E05A47]">
            <Compass className="w-4 h-4" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider">
              AUTOMATED AI WEAKNESS DIAGNOSIS & REMEDIATION REGIMEN
            </span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#B45309]">
            ACTIONABLE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0F766E] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Verified Competencies
            </span>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Consistently high marks on React reconciliation internals, Fiber tree mechanics, and clean code principles.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#E05A47] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Identified Blindspots
            </span>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Tendency to omit memory footprint implications when selecting caching heuristics in high-concurrency designs.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#B45309]" />
              Suggested 7-Day Protocol
            </span>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Complete 3 dedicated Distributed System Design drills prioritizing Redis vs Memcached and stateful connection pooling.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Analytics;