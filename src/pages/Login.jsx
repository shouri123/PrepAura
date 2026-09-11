import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';

export const Login = () => {
  const [email, setEmail] = useState('alex.mercer@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Invalid credentials. Please verify your email and password.';
      setError(typeof msg === 'string' ? msg : 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

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
          <span className="text-xs text-[#71717A] hidden sm:inline">Need operator access?</span>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-1.5 rounded-xl border border-amber-300 text-xs font-bold text-[#1E1B4B] hover:bg-amber-50 cursor-pointer"
          >
            Register
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          
          {/* Left: Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0 clay-card-antique p-8 border-2 border-white shadow-xl text-left"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-3 text-[#B45309] text-[10px] font-bold uppercase tracking-wider font-mono">
                <Shield className="w-3 h-3 text-[#E05A47]" />
                <span>SECURE OPERATOR ACCESS</span>
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1E1B4B]">
                Sign in to chamber.
              </h1>
              <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
                Enter your credentials to resume your high-conviction simulation loop.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#52525B] mb-1.5 uppercase font-bold tracking-wider">
                  Operator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-xs text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47]"
                    placeholder="operator@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-[#52525B] uppercase font-bold tracking-wider">
                    Access Key (Password)
                  </label>
                  <a href="#forgot" className="text-xs text-[#B45309] hover:underline">
                    Forgot key?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#71717A] absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-xs text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#E05A47]"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#71717A] hover:text-[#1E1B4B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-3 py-3 rounded-xl clay-btn-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>{loading ? 'Authenticating...' : 'Authenticate & Enter'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                <span className="bg-white px-3 text-[#71717A] font-bold">Or Instant Simulation Mode</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl border border-amber-200 text-xs font-bold text-[#1E1B4B] hover:bg-amber-50 cursor-pointer transition-colors"
              onClick={() => {
                login('demo.operator@prepaura.ai', 'demo123');
                navigate('/dashboard');
              }}
            >
              Sign In as Demo Candidate (Staff L6)
            </button>
          </motion.div>

          {/* Right: Editorial Quote Showcase */}
          <div className="lg:col-span-6 hidden lg:block pl-6 text-left">
            <div className="clay-card-amber p-8 sm:p-10 border-2 border-white shadow-xl space-y-6">
              <div className="w-2 h-2 rounded-full bg-[#E05A47]" />

              <blockquote className="font-serif text-2xl font-bold tracking-tight text-[#1E1B4B] leading-relaxed italic">
                “Confidence is not an accident. It is the residue of deliberate, high-conviction simulation under genuine cognitive load.”
              </blockquote>

              <div className="pt-6 border-t border-amber-900/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1E1B4B]">Staff Bar Raiser Architecture</p>
                  <p className="text-[11px] text-[#71717A] font-mono mt-0.5">Distributed Telemetry Core</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-bold text-[#E05A47]">4.98 / 5.0</p>
                  <p className="text-[11px] text-[#71717A]">Candidate Fidelity</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Minimal */}
      <footer className="h-14 px-6 lg:px-12 flex items-center justify-between border-t border-amber-900/10 text-xs text-[#71717A] font-mono bg-white/60">
        <span>PREPAURA AUTH GATEWAY · ZERO EMOJIS</span>
        <span>SYSTEM RELEASE 2.4</span>
      </footer>

    </div>
  );
};
export default Login;