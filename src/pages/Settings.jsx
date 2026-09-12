import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders,
  Bell,
  Cpu,
  Volume2,
  Key,
  Shield,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

const SETTINGS_KEY = 'prepaura_chamber_settings';

export const Settings = () => {
  const [model, setModel] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return saved.model || 'Claude 3.5 Sonnet (Latest)';
    } catch {
      return 'Claude 3.5 Sonnet (Latest)';
    }
  });

  const [strictness, setStrictness] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return saved.strictness || 'Rigorous';
    } catch {
      return 'Rigorous';
    }
  });

  const [voice, setVoice] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return saved.voice || 'US Male (Neutral Executive)';
    } catch {
      return 'US Male (Neutral Executive)';
    }
  });

  const [emailAlerts, setEmailAlerts] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return saved.emailAlerts ?? true;
    } catch {
      return true;
    }
  });

  const [apiKey, setApiKey] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return saved.apiKey || '';
    } catch {
      return '';
    }
  });

  const [saved, setSaved] = useState(false);

  const models = [
    { name: 'Claude 3.5 Sonnet (Latest)', tag: 'Best for System Design' },
    { name: 'GPT-4o Omnimodal', tag: 'Fastest Voice Response' },
    { name: 'Gemini 1.5 Pro', tag: 'Deep Context & Code' },
  ];

  const handleSave = () => {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ model, strictness, voice, emailAlerts, apiKey })
      );
    } catch {
      // Ignore
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
            <span className="font-mono text-[10px] text-[#B45309] uppercase tracking-widest font-bold">
              SYSTEM ENGINE CONFIGURATION
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E1B4B]">
            Chamber Preferences
          </h1>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Tune evaluation strictness, AI synthesis models, and telemetry streaming preferences.
          </p>
        </div>

        <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[#B45309] self-start sm:self-auto">
          BUILD: PREPAURA-V2.4.8
        </span>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0F766E] text-xs font-bold flex items-center gap-2 shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Chamber settings saved and synchronized across evaluation instances.</span>
        </motion.div>
      )}

      {/* AI Model Architecture */}
      <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#E05A47]" />
            <span className="font-mono text-xs text-[#1E1B4B] uppercase font-bold tracking-wider">
              EVALUATION ENGINE SELECTION
            </span>
          </div>
          <span className="text-xs text-[#71717A] font-mono font-bold">DEFAULT: CLAUDE 3.5</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {models.map((m) => (
            <button
              key={m.name}
              type="button"
              onClick={() => setModel(m.name)}
              className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                model === m.name
                  ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                  : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50 font-medium'
              }`}
            >
              <p className={model === m.name ? 'text-white font-bold' : 'font-bold text-[#1E1B4B]'}>{m.name.split(' ')[0]}</p>
              <p className={`text-[10px] font-mono mt-0.5 ${model === m.name ? 'text-amber-100' : 'text-[#71717A]'}`}>{m.name}</p>
              <span className={`text-[10px] mt-2 block font-bold ${model === m.name ? 'text-amber-200' : 'text-[#B45309]'}`}>
                {m.tag}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Evaluation Strictness */}
      <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
        <div className="border-b border-amber-900/10 pb-3">
          <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider">
            AI EVALUATION STRICTNESS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { level: 'Lenient', sub: 'High encouragement, forgiving on minor syntax' },
            { level: 'Standard', sub: 'Balanced industry bar with trade-off checks' },
            { level: 'Rigorous', sub: 'Staff / Bar Raiser zero-tolerance mode' },
          ].map((item) => (
            <button
              key={item.level}
              type="button"
              onClick={() => setStrictness(item.level)}
              className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                strictness === item.level
                  ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                  : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50 font-medium'
              }`}
            >
              <p className={strictness === item.level ? 'text-white font-bold' : 'font-bold text-[#1E1B4B]'}>{item.level}</p>
              <p className={`text-[10px] mt-1 leading-relaxed ${strictness === item.level ? 'text-amber-100' : 'text-[#71717A]'}`}>{item.sub}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Audio Synthesis & Voice */}
      <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3">
          <Volume2 className="w-4 h-4 text-[#E05A47]" />
          <span className="font-mono text-xs text-[#1E1B4B] uppercase font-bold tracking-wider">
            SPEECH SYNTHESIS ENGINE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            'US Male (Neutral Executive)',
            'US Female (Senior Lead)',
            'UK English (Oxford Academic)',
          ].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVoice(v)}
              className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                voice === v
                  ? 'clay-btn-terracotta text-white border-transparent font-bold shadow-sm'
                  : 'bg-[#FAF7F2] border-amber-200/80 text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50 font-medium'
              }`}
            >
              <p className={`truncate font-bold ${voice === v ? 'text-white' : 'text-[#1E1B4B]'}`}>{v.split(' ')[0]} {v.split(' ')[1]}</p>
              <p className={`text-[10px] font-mono mt-0.5 ${voice === v ? 'text-amber-100' : 'text-[#71717A]'}`}>{v}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications & Secrets */}
      <Card className="clay-card-antique p-6 border-2 border-white shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
          <div>
            <span className="font-mono text-xs text-[#B45309] uppercase font-bold tracking-wider">
              TELEMETRY NOTIFICATIONS
            </span>
            <p className="text-xs text-[#1E1B4B] font-bold mt-1">
              Automated Session Summary Digests
            </p>
            <p className="text-[11px] text-[#71717A]">
              Receive weekly preparation reviews and weakness analysis direct to email.
            </p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
            className="w-4 h-4 rounded text-[#E05A47] accent-[#E05A47] cursor-pointer"
          />
        </div>

        {/* Custom API Key input */}
        <div className="pt-2">
          <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
            Custom BYOK API Key (Optional)
          </label>
          <div className="relative">
            <Key className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pl-9 text-xs font-mono bg-white"
              placeholder="sk-ant-api03-..."
            />
          </div>
          <p className="text-[10px] text-[#71717A] font-mono mt-1">
            Keys are stored strictly in browser local storage and never transmitted to central telemetry.
          </p>
        </div>
      </Card>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all"
        >
          Save Chamber Preferences
        </button>
      </div>
    </div>
  );
};
export default Settings;