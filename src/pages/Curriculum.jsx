import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  Search,
  CheckCircle2,
  ArrowRight,
  Play,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  Server,
  Globe,
  Database,
  Users
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Curriculum = () => {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(0);

  const curriculumData = [
    {
      title: 'Distributed Systems & Microservices',
      category: 'Distributed Systems',
      level: 'Staff / Principal (L6+)',
      duration: '4 Weeks · 18 Drills',
      icon: Server,
      description: 'Master large-scale distributed architectures, consensus protocols, and global fault tolerance.',
      modules: [
        {
          name: 'Module 1: Consensus & Replication',
          topics: ['Raft vs Paxos Consensus', 'Quorum Writes & Eventual Consistency', 'Split-Brain & Leader Election'],
          sampleQuestion: 'Explain the Raft leader election algorithm and how uncommitted logs are resolved after network partition.',
        },
        {
          name: 'Module 2: High-Throughput Partitioning',
          topics: ['Consistent Hashing Rings', 'Sharding Hotspots & Rebalancing', 'Distributed Lock Managers with Redis'],
          sampleQuestion: 'Design a distributed unique ID generator producing 100k ordered 64-bit IDs per second across 3 continents.',
        },
        {
          name: 'Module 3: Global Streaming & Storage',
          topics: ['Kafka Partitioning & Consumer Groups', 'LSM-Trees vs B-Trees in Storage Engines', 'CDC Pipelines'],
          sampleQuestion: 'How does an LSM tree optimize write throughput compared to B+ trees, and what is the read amplification cost?',
        },
      ],
    },
    {
      title: 'Modern Frontend Systems & Architecture',
      category: 'Frontend Architecture',
      level: 'Senior / Lead (L5)',
      duration: '3 Weeks · 14 Drills',
      icon: Globe,
      description: 'Deep dive into React reconciliation, rendering pipelines, state machines, and Core Web Vitals optimization.',
      modules: [
        {
          name: 'Module 1: Rendering Engine & Reconciliation',
          topics: ['React Fiber Tree Mechanics', 'Concurrent Mode & Time-Slicing', 'SSR, Hydration & Island Architectures'],
          sampleQuestion: 'Describe how React Fiber enables cooperative scheduling and how priority levels interrupt background reconciliation.',
        },
        {
          name: 'Module 2: State Management & Complexity Control',
          topics: ['XState & Finite State Machines', 'Normalized Entity Stores', 'Selector Memoization & Re-render Diagnostics'],
          sampleQuestion: 'When would you pick a finite state machine over traditional Redux or Zustand for a complex multi-step checkout workflow?',
        },
        {
          name: 'Module 3: Web Performance Telemetry',
          topics: ['INP, LCP & CLS Optimization', 'Resource Hints & Critical Path Rendering', 'Virtual Scrolling for 100k Rows'],
          sampleQuestion: 'How would you debug and remediate an Interaction to Next Paint (INP) bottleneck exceeding 400ms on mobile?',
        },
      ],
    },
    {
      title: 'Concurrency, Operating Systems & Low-Level',
      category: 'Core Concurrency',
      level: 'Mid-to-Senior (L4/L5)',
      duration: '3 Weeks · 12 Drills',
      icon: Cpu,
      description: 'Threads, locks, race conditions, and memory models that separate surface coders from true systems engineers.',
      modules: [
        {
          name: 'Module 1: Concurrency Primitives',
          topics: ['Mutexes, Semaphores & Spinlocks', 'Lock-Free Data Structures', 'Deadlock Detection & Prevention'],
          sampleQuestion: 'Implement a lock-free queue using atomic compare-and-swap (CAS) primitives and explain the ABA problem.',
        },
        {
          name: 'Module 2: Event Loops & Asynchronous Runtimes',
          topics: ['Node.js libuv Threads', 'Microtask Queue vs Macrotask Queue', 'Non-blocking I/O & epoll/kqueue'],
          sampleQuestion: 'Walk through an event loop iteration detailing exactly when nextTick, Promises, and I/O callbacks fire.',
        },
      ],
    },
    {
      title: 'Engineering Leadership & Behavioral STAR',
      category: 'Leadership',
      level: 'EM / Staff / Director',
      duration: '2 Weeks · 10 Drills',
      icon: Users,
      description: 'Architecting cross-functional consensus, resolving executive friction, and demonstrating quantified business impact.',
      modules: [
        {
          name: 'Module 1: STAR Structuring',
          topics: ['Situation & Task Framing (30s max)', 'Action: Personal Ownership vs Team', 'Quantified Result Metrics'],
          sampleQuestion: 'Tell me about a time an architectural decision you championed failed in production. How did you handle stakeholder fallout?',
        },
        {
          name: 'Module 2: Cross-Functional Alignment',
          topics: ['Product vs Engineering Trade-offs', 'Tech Debt Prioritization', 'Mentoring Underperforming Engineers'],
          sampleQuestion: 'How do you convince leadership to allocate 30% of sprint capacity to technical debt when feature deadlines are pressing?',
        },
      ],
    },
  ];

  const tracks = ['All', 'Distributed Systems', 'Frontend Architecture', 'Core Concurrency', 'Leadership'];

  const filteredCurriculum = curriculumData.filter((item) => {
    const matchTrack = selectedTrack === 'All' || item.category === selectedTrack;
    const matchQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTrack && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B4B] font-modern selection:bg-[#E05A47] selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#D97706_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
      
      <Navbar />

      <main className="w-full pt-28 pb-16">
        
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop pb-12">
          <div className="max-w-3xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-[#B45309] text-xs font-bold uppercase tracking-wider clay-pill-inset">
              <BookOpen className="w-3.5 h-3.5 text-[#E05A47]" />
              <span>SPECIALIZED CURRICULUM MATRIX</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1B4B] leading-[1.12]">
              Engineered for <span className="text-[#E05A47] italic font-serif">High Conviction.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
              Explore our exhaustive syllabus tracks covering distributed systems, frontend engineering, concurrency, and executive leadership. Calibrated to target Staff and Principal interview loops.
            </p>

            {/* Search and Track Filter Bar (Zero Emojis) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" />
                <input
                  type="text"
                  placeholder="Search topics, modules, algorithms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-amber-200 text-sm text-[#1E1B4B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#E05A47] shadow-inner"
                />
              </div>
            </div>

            {/* Track Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {tracks.map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedTrack === track
                      ? 'clay-btn-terracotta text-white shadow-sm'
                      : 'clay-card-antique text-[#52525B] hover:text-[#1E1B4B] border-amber-200/80'
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Track Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-page-padding-desktop space-y-8">
          <div className="grid grid-cols-1 gap-7">
            {filteredCurriculum.map((item, index) => {
              const IconComp = item.icon;
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="clay-card-antique p-7 sm:p-9 border-2 border-white shadow-lg space-y-6 text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E05A47] shrink-0 clay-wax-seal">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-amber-100 text-[#B45309] border border-amber-300">
                            {item.level}
                          </span>
                          <span className="text-xs text-[#71717A] flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                            {item.duration}
                          </span>
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-[#1E1B4B]">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-auto">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => navigate('/interview/setup')}
                        className="clay-btn-terracotta text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Launch Drills</span>
                      </motion.button>
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#1E1B4B] transition-colors border border-amber-200"
                        aria-label="Toggle module view"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-[#52525B] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Modules Accordion */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-4 border-t border-amber-900/10 space-y-4"
                    >
                      <p className="font-mono text-xs font-bold text-[#B45309] uppercase tracking-wider">
                        SYLLABUS MODULES & SAMPLE EVALUATIONS
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {item.modules.map((mod, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-5 rounded-2xl bg-[#FAF7F2] border border-amber-200/80 space-y-3 flex flex-col justify-between text-left"
                          >
                            <div className="space-y-2">
                              <h3 className="font-serif text-sm font-bold text-[#1E1B4B]">
                                {mod.name}
                              </h3>
                              <ul className="space-y-1.5 text-xs text-[#52525B]">
                                {mod.topics.map((t, tIdx) => (
                                  <li key={tIdx} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-3 border-t border-amber-200/50">
                              <p className="font-mono text-[10px] text-[#B45309] font-bold uppercase mb-1">
                                Sample Interview Probe:
                              </p>
                              <p className="text-xs italic text-[#1E1B4B] font-serif leading-relaxed">
                                “{mod.sampleQuestion}”
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
export default Curriculum;
