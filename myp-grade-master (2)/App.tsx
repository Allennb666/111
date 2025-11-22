import React, { useState, useEffect, useCallback } from 'react';
import { DEFAULT_SUBJECTS } from './constants';
import { SubjectData, CriteriaKey } from './types';
import { SubjectCard } from './components/SubjectCard';
import { Dashboard } from './components/Dashboard';
import { RotateCcw, Info } from 'lucide-react';

const App: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>(() => {
    const saved = localStorage.getItem('myp-subjects-v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return parsed.map((sub: any) => ({
          ...sub,
          scores: {
            A: Array.isArray(sub.scores.A) ? sub.scores.A : (sub.scores.A ? [sub.scores.A] : []),
            B: Array.isArray(sub.scores.B) ? sub.scores.B : (sub.scores.B ? [sub.scores.B] : []),
            C: Array.isArray(sub.scores.C) ? sub.scores.C : (sub.scores.C ? [sub.scores.C] : []),
            D: Array.isArray(sub.scores.D) ? sub.scores.D : (sub.scores.D ? [sub.scores.D] : []),
          }
        }));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return DEFAULT_SUBJECTS;
  });

  useEffect(() => {
    localStorage.setItem('myp-subjects-v1', JSON.stringify(subjects));
  }, [subjects]);

  const handleUpdateScore = useCallback((id: string, criteria: CriteriaKey, value: number[]) => {
    setSubjects(prev => prev.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          scores: {
            ...sub.scores,
            [criteria]: value
          }
        };
      }
      return sub;
    }));
  }, []);

  const handleReset = () => {
    if (window.confirm('Start fresh? This will clear all your recorded scores.')) {
      setSubjects(DEFAULT_SUBJECTS);
    }
  };

  return (
    // Main Container with Light Stone Background
    <div className="min-h-screen bg-[#f5f5f4] text-stone-800 font-sans pb-32 relative overflow-x-hidden selection:bg-stone-300 selection:text-stone-900">
      
      {/* Ambient Background Elements - Liquid Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-rose-200/60 rounded-full mix-blend-multiply filter blur-[120px] animate-blob-slow"></div>
         <div className="absolute top-[10%] right-[-20%] w-[900px] h-[900px] bg-indigo-200/60 rounded-full mix-blend-multiply filter blur-[120px] animate-blob-slow [animation-delay:4s]"></div>
         <div className="absolute bottom-[-20%] left-[20%] w-[1200px] h-[1200px] bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-[150px] animate-blob-slow [animation-delay:8s]"></div>
         
         {/* Noise Texture Overlay */}
         <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50"></div>
      </div>

      {/* Header - Floating Liquid Bar */}
      <div className="sticky top-6 z-40 px-6 mb-12">
        <header className="max-w-6xl mx-auto glass-liquid rounded-[2rem] flex items-center justify-between px-8 py-5 animate-spring-up transition-all duration-300 hover:shadow-2xl">
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-stone-100 font-serif font-bold text-2xl shadow-[0_8px_16px_rgba(0,0,0,0.2)] transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
              IB
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-stone-800 leading-none drop-shadow-sm">MYP Grade Master</h1>
              <p className="text-[11px] text-stone-500 font-sans tracking-widest uppercase mt-1.5 font-bold">Academic GPA Tracker</p>
            </div>
          </div>
          <div className="relative z-10 flex items-center space-x-2">
            <button 
              onClick={handleReset}
              className="group flex items-center gap-2 text-stone-500 hover:text-rose-500 transition-all px-5 py-2.5 rounded-full hover:bg-white/50 border border-transparent hover:border-white/60 active:scale-95 active:bg-white/80"
              title="Reset all scores"
            >
              <span className="text-sm font-bold hidden sm:block">Reset</span>
              <RotateCcw className="w-4 h-4 transition-transform duration-500 ease-in-out group-hover:-rotate-180" />
            </button>
          </div>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-6 space-y-16">
        
        {/* Intro/Dashboard Section */}
        <div>
            <div className="flex items-end justify-between mb-8 px-2 animate-fade-in-up [animation-delay:100ms] opacity-0 fill-mode-forwards">
               <h2 className="text-4xl font-serif font-bold text-stone-800 text-etched">Overview</h2>
               <span className="hidden sm:block text-sm text-stone-500 font-serif italic relative top-[-4px]">"Strive for progress, not perfection."</span>
            </div>
            <Dashboard subjects={subjects} />
        </div>

        {/* Subjects Section */}
        <div>
            <div className="mb-8 flex items-center justify-between px-2 animate-fade-in-up [animation-delay:300ms] opacity-0 fill-mode-forwards">
                <h2 className="text-3xl font-serif font-bold text-stone-800 text-etched">Subject Criteria</h2>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 bg-white/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/60 shadow-sm">
                    <Info className="w-4 h-4 text-stone-400" />
                    <span>Tap criteria to edit</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, idx) => (
                <SubjectCard 
                  key={subject.id} 
                  index={idx}
                  subject={subject} 
                  onUpdateScore={handleUpdateScore} 
                />
              ))}
            </div>
        </div>

        {/* Legend - Floating Liquid Slab */}
        <div className="glass-liquid rounded-[3rem] p-10 animate-spring-up [animation-delay:800ms] opacity-0 fill-mode-forwards text-center relative">
           {/* Glare */}
           <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
           
           <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8 text-etched relative z-10">Grade Boundaries Reference</h3>
           <div className="flex flex-wrap justify-center gap-6 relative z-10">
              {[
                { g: 1, range: '0-5', color: 'text-rose-400' },
                { g: 2, range: '6-9', color: 'text-rose-400' },
                { g: 3, range: '10-14', color: 'text-orange-400' },
                { g: 4, range: '15-18', color: 'text-amber-400' },
                { g: 5, range: '19-23', color: 'text-blue-400' },
                { g: 6, range: '24-27', color: 'text-teal-400' },
                { g: 7, range: '28-32', color: 'text-emerald-500' },
              ].map((item, idx) => (
                <div key={item.g} className={`flex flex-col items-center justify-center w-24 h-24 rounded-[1.5rem] glass-liquid-button transition-transform duration-300 hover:-translate-y-2 hover:scale-110`}>
                  <span className={`text-3xl font-serif font-bold ${item.color} drop-shadow-sm`}>{item.g}</span>
                  <span className="text-[10px] font-mono font-bold text-stone-400 mt-1">{item.range}</span>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;