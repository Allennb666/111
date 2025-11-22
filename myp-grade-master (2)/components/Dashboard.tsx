import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SubjectData } from '../types';
import { calculateTotalScore, calculateFinalGrade, getGradeColorRaw } from '../services/gradeService';
import { GraduationCap, Award, Book, LineChart, Sparkles } from 'lucide-react';

interface DashboardProps {
  subjects: SubjectData[];
}

export const Dashboard: React.FC<DashboardProps> = ({ subjects }) => {
  const subjectsWithGrades = subjects.map(s => {
    const total = calculateTotalScore(s.scores);
    const grade = calculateFinalGrade(total);
    const shortName = s.id.toUpperCase();

    return {
      name: s.name,
      shortName: shortName,
      grade: grade,
      total: total
    };
  });

  const totalPoints = subjectsWithGrades.reduce((acc, curr) => acc + curr.grade, 0);
  const gpa = totalPoints / subjects.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
      
      {/* Left Column - Hero Stats */}
      <div className="lg:col-span-4 grid grid-cols-1 gap-8">
        
        {/* GPA "Holographic Crystal" Card */}
        <div className="glass-hyper rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col justify-between min-h-[300px] animate-spring-up group z-10 hover:-translate-y-3 transition-transform duration-700">
          
          {/* Animated Holographic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-rose-500/10 opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,white_90deg,transparent_180deg)] opacity-10 animate-[spin_10s_linear_infinite]"></div>
          
          {/* Background Icon */}
          <div className="absolute -top-10 -right-10 text-indigo-300/20 transform rotate-12 group-hover:rotate-[-12deg] group-hover:scale-125 transition-all duration-1000 ease-in-out blur-sm">
             <GraduationCap size={240} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/50 border border-white/60 backdrop-blur-md shadow-sm mb-6">
               <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400" />
               <h3 className="text-stone-500 font-sans text-[10px] font-black tracking-widest uppercase">Cumulative GPA</h3>
            </div>
            
            <div className="flex items-baseline gap-1">
               <span className="text-[7rem] font-serif font-bold tracking-tighter text-stone-800 drop-shadow-2xl leading-[0.8] text-etched">{gpa.toFixed(2)}</span>
            </div>
            <div className="mt-4 w-fit px-4 py-1.5 rounded-full glass-hyper-well text-stone-500 text-xs font-bold tracking-tight shadow-inner flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
               out of 7.00 scale
            </div>
          </div>
          
          <div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex items-center gap-3 text-stone-500 text-xs font-bold uppercase tracking-wider">
             <div className="p-2 rounded-full bg-white/40">
               <Book className="w-4 h-4" />
             </div>
             <span>{subjects.length} Subjects Active</span>
          </div>
        </div>

        {/* Total Points - Fluid Block */}
        <div className="glass-hyper rounded-[3rem] p-9 animate-spring-up [animation-delay:200ms] opacity-0 fill-mode-forwards hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden">
           {/* Amber Glow */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 blur-[50px] rounded-full pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-stone-500 font-sans text-[10px] font-black tracking-widest uppercase text-etched">Total Points</h3>
            <div className="glass-hyper-bubble p-3 rounded-[1.2rem] text-amber-500 shadow-md">
               <Award className="w-7 h-7" />
            </div>
          </div>
          
          <div className="flex items-end gap-3 mb-6 relative z-10">
            <span className="text-6xl font-serif font-bold text-stone-800 text-etched lh-1">{totalPoints}</span>
            <span className="text-stone-400 text-lg font-bold mb-2">/ {subjects.length * 7}</span>
          </div>
          
          <div className="w-full glass-hyper-well h-4 rounded-full overflow-hidden p-[2px] relative z-10">
            <div 
                className="h-full bg-gradient-to-r from-amber-300 to-orange-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] relative transition-all duration-1000 ease-out" 
                style={{ width: `${(totalPoints / (subjects.length * 7)) * 100}%` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent w-full h-1/2"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column - Chart Container */}
      <div className="lg:col-span-8 glass-hyper rounded-[3.5rem] p-10 flex flex-col animate-spring-up [animation-delay:400ms] opacity-0 fill-mode-forwards relative overflow-hidden">
        
        {/* Background Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="flex items-center space-x-5 mb-12 relative z-10">
            <div className="glass-hyper-bubble p-4 rounded-[1.5rem] shadow-md">
                <LineChart className="w-7 h-7 text-stone-600" />
            </div>
            <div>
               <h3 className="font-serif text-3xl text-stone-800 font-bold tracking-tight text-etched">Performance</h3>
               <p className="text-[11px] text-stone-400 font-black uppercase tracking-widest mt-1">Grade Distribution Visualization</p>
            </div>
        </div>
        
        <div className="flex-grow h-96 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectsWithGrades} margin={{ top: 20, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(0, 0, 0, 0.03)" />
              <XAxis 
                dataKey="shortName" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a8a29e', fontSize: 11, fontFamily: 'Outfit', fontWeight: 800, letterSpacing: '1px' }} 
                dy={15}
                interval={0}
              />
              <YAxis 
                domain={[0, 8]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#d6d3d1', fontSize: 12, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}
                ticks={[0, 2, 4, 6, 8]}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.03)', radius: 24 }}
                contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    borderRadius: '24px', 
                    border: '1px solid rgba(255, 255, 255, 1)', 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    fontFamily: 'Outfit',
                    padding: '16px 24px',
                    color: '#1c1917'
                }}
                itemStyle={{ color: '#44403c', fontWeight: 700, fontSize: '16px' }}
              />
              <Bar dataKey="grade" radius={[16, 16, 16, 16]} barSize={40} animationDuration={1500} animationEasing="cubic-bezier(0.34, 1.56, 0.64, 1)">
                {subjectsWithGrades.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getGradeColorRaw(entry.grade)} 
                    fillOpacity={0.9} 
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth={2}
                    style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.08))' }}
                    className="hover:opacity-100 transition-all duration-300 hover:scale-y-105 origin-bottom cursor-pointer" 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};