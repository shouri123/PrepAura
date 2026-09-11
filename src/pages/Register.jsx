import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    track: 'Distributed Systems',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const tracks = [
    'Distributed Systems',
    'Frontend Architecture',
    'AI & ML Infrastructure',
    'Engineering Leadership',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        targetRole: formData.track,
      });
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registration failed. Please check your inputs.';
      setError(typeof msg === 'string' ? msg : 'Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return { label: '', color: 'bg-amber-100', width: '0%' };
    if (len < 6) return { label: 'Incomplete', color: 'bg-rose-500', width: '30%' };
    if (len < 10) return { label: 'Medium', color: 'bg-amber-500', width: '65%' };
    return { label: 'Optimal', color: 'bg-[#0F766E]', width: '100%' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B4B] font-modern selection:bg-[#E05A47] selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Subtle Antique Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#D97706_0.8px,transparent_0.8px)] [background-size:24px_24px]" />

      {/* Top Header */}
      <header className="h-16 px-6 lg:px-12 flex items-center justify-between border-b border-amber-900/10 bg-white/80 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#B45309] text-white flex items-center justify-center font-serif text-xs font-bold shadow-sm">
            PA
          </div>
          <span className="font-serif font-bold text-base tracking-tight text-[#1E1B4B]">
            PREP<span className="text-[#E05A47]">AURA</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#71717A] hidden sm:inline">Already an operator?</span>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-1.5 rounded-xl border border-amber-300 text-xs font-bold text-[#1E1B4B] hover:bg-amber-50 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          
          {/* Left: Registration Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 max-w-lg w-full mx-auto lg:mx-0 clay-card-antique p-8 border-2 border-white shadow-xl text-left"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-3 text-[#B45309] text-[10px] font-bold uppercase tracking-wider font-mono">
                <Shield className="w-3 h-3 text-[#E05A47]" />
                <span>OPERATOR INITIALIZATION</span>
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1E1B4B]">
                Create your chamber dossier.
              </h1>
              <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                Configure your target focus track and begin personalized AI interview simulations.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-xs text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47]"
                      placeholder="Alex Mercer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-xs text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47]"
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Focus Track Selection Pills (Zero Emojis) */}
              <div>
                <label className="block text-xs font-mono text-[#52525B] mb-2 uppercase font-bold tracking-wider">
                  Target Engineering Track
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tracks.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, track: t })}
                      className={`px-3 py-2 text-xs font-bold rounded-xl border text-left transition-all cursor-pointer ${
                        formData.track === t
                          ? 'clay-btn-terracotta text-white border-transparent shadow-sm'
                          : 'bg-[#FAF7F2] border-amber-200 text-[#52525B] hover:text-[#1E1B4B]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                    Chamber Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-xs text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47]"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-xs text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47]"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Strength Indicator */}
              {formData.password && (
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#71717A]">
                    <span>Security Rating: {strength.label}</span>
                  </div>
                  <div className="w-full bg-amber-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-2 py-3 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>{loading ? 'Initializing...' : 'Initialize Chamber Dossier'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Guarantee & Security Checklist (Zero Emojis) */}
          <div className="lg:col-span-5 hidden lg:block pl-6 text-left">
            <div className="clay-card-amber p-8 sm:p-9 border-2 border-white shadow-xl space-y-6">
              <span className="font-mono text-xs font-bold text-[#B45309] uppercase tracking-wider">
                CHAMBER CALIBRATION COMMITMENTS
              </span>
              <ul className="space-y-4">
                {[
                  'Strict zero data retention mode available',
                  'Calibrated against real Staff & Principal rubrics',
                  'Unlimited mock interview sessions 24/7 on demand',
                  'Line-by-line comparative model answer transcripts',
                  'Sub-300ms real-time voice latency pipeline'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs font-bold text-[#1E1B4B]">
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Minimal */}
      <footer className="h-14 px-6 lg:px-12 flex items-center justify-between border-t border-amber-900/10 text-xs text-[#71717A] font-mono bg-white/60">
        <span>PREPAURA REGISTER · ZERO EMOJIS</span>
        <span>SYSTEM RELEASE 2.4</span>
      </footer>

    </div>
  );
};
export default Register;