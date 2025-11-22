import React, { useMemo, useState } from 'react';
import { SubjectData, CriteriaKey } from '../types';
import { CRITERIA_LABELS } from '../constants';
import { calculateTotalScore, calculateFinalGrade, getGradeColor, calculateCriterionAverage } from '../services/gradeService';
import { BookOpen, Calculator, Monitor, Music, Activity, PenTool, Leaf, Atom, Languages, Plus } from 'lucide-react';
import { CriteriaModal } from './CriteriaModal';

interface SubjectCardProps {
  subject: SubjectData;
  onUpdateScore: (id: string, criteria: CriteriaKey, value: number[]) => void;
  index?: number;
}

const getIconForSubject = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('math')) return <Calculator className="w-6 h-6" />;
  if (lower.includes('design') && lower.includes('digital')) return <Monitor className="w-6 h-6" />;
  if (lower.includes('design')) return <PenTool className="w-6 h-6" />;
  if (lower.includes('music')) return <Music className="w-6 h-6" />;
  if (lower.includes('phe')) return <Activity className="w-6 h-6" />;
  if (lower.includes('bio')) return <Leaf className="w-6 h-6" />;
  if (lower.includes('phys')) return <Atom className="w-6 h-6" />;
  if (lower.includes('chinese') || lower.includes('english')) return <Languages className="w-6 h-6" />;
  return <BookOpen className="w-6 h-6" />;
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onUpdateScore, index = 0 }) => {
  const totalScore = useMemo(() => calculateTotalScore(subject.scores), [subject.scores]);
  const finalGrade = useMemo(() => calculateFinalGrade(totalScore), [totalScore]);
  const colorClass = getGradeColor(finalGrade);

  const [activeModal, setActiveModal] = useState<CriteriaKey | null>(null);

  const handleUpdateScores = (newScores: number[]) => {
    if (activeModal) {
      onUpdateScore(subject.id, activeModal, newScores);
    }
  };

  // Stagger delay based on index
  const animationDelay = `${index * 120}ms`;

  return (
    <>
      {/* 
        Wrapper Div: Handles the one-time entrance animation (spring-up).
        This prevents conflicts where "opacity-0" in the animation keyframes 
        might be reapplied when the hover state changes transforms.
      */}
      <div 
        className="animate-spring-up opacity-0 fill-mode-forwards h-full"
        style={{ animationDelay }}
      >
        {/* 
          Inner Div: Handles the interactive hover effects and glass styling.
          The transition ensures smooth movement when mouse enters/leaves.
        */}
        <div 
          className="group relative glass-hyper rounded-[2.5rem] flex flex-col h-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02]"
        >
          {/* Interactive Glare Layer */}
          <div className="hyper-glare rounded-[2.5rem]"></div>

          {/* Card Content */}
          <div className="relative z-10 p-7 flex flex-col h-full">
            
            {/* Header Section - 3D Layout */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex flex-col space-y-3">
                 {/* Floating Icon Bubble */}
                 <div className="w-12 h-12 rounded-2xl glass-hyper-bubble flex items-center justify-center text-stone-600 shadow-lg transform transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500">
                    <div className="scale-90">{getIconForSubject(subject.name)}</div>
                 </div>
                 
                 <div>
                   <div className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-stone-400 mb-1 text-etched">{subject.id.toUpperCase()}</div>
                   <h3 className="text-2xl font-serif font-semibold text-stone-800 leading-none group-hover:text-stone-950 transition-colors duration-300 text-etched drop-shadow-sm">
                     {subject.name}
                   </h3>
                 </div>
              </div>
              
              {/* 3D Floating Orb Badge */}
              <div className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-700 ease-spring group-hover:scale-110 group-hover:-translate-y-2 shadow-2xl ${colorClass} border-4 border-white/40 backdrop-blur-md`}>
                 {/* Specular Highlight on Orb */}
                 <div className="absolute top-3 right-4 w-4 h-3 bg-white rounded-full opacity-60 blur-[2px] transform rotate-45"></div>
                 <div className="absolute bottom-2 left-4 w-6 h-6 bg-black opacity-10 rounded-full blur-[8px]"></div>
                 
                 <span className="font-serif font-bold text-4xl leading-none text-embossed z-10 text-stone-800 mix-blend-overlay">
                  {finalGrade}
                 </span>
              </div>
            </div>

            {/* Criteria Grid - Liquid Droplets */}
            <div className="flex-grow mb-4">
               <div className="grid grid-cols-4 gap-3">
                {CRITERIA_LABELS.map((crit) => {
                  const scores = subject.scores[crit];
                  const average = calculateCriterionAverage(scores);
                  const count = scores.length;
                  const hasScore = count > 0;
                  
                  return (
                    <button
                      key={crit}
                      onClick={() => setActiveModal(crit)}
                      className={`
                        relative flex flex-col items-center justify-center aspect-square w-full rounded-[1.2rem] transition-all duration-500 overflow-hidden
                        ${hasScore 
                          ? 'glass-hyper-bubble hover:-translate-y-1' 
                          : 'glass-hyper-well hover:bg-white/40 opacity-70 hover:opacity-100'
                        }
                      `}
                    >
                      {/* Label centered nicely at top or relative to content */}
                      <span className={`text-[9px] font-black absolute top-2 left-0 right-0 text-center ${hasScore ? 'text-stone-400' : 'opacity-30'}`}>{crit}</span>
                      
                      {hasScore ? (
                        <div className="flex flex-col items-center mt-2">
                           <span className="font-serif text-2xl font-bold text-stone-800 drop-shadow-sm leading-none">{average}</span>
                           {count > 1 && (
                             <div className="absolute bottom-1.5 right-1.5 bg-stone-800 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-bold shadow-md">
                               {count}
                             </div>
                           )}
                        </div>
                      ) : (
                        <Plus className="w-4 h-4 opacity-20 mt-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Footer - Deep Well Track */}
            <div className="mt-auto pt-4 border-t border-stone-900/5">
              <div className="relative px-5 py-3 glass-hyper-well rounded-[1.2rem] flex justify-between items-center">
                 <div className="text-[9px] text-stone-400 font-black uppercase tracking-widest">
                   Total
                 </div>
                 <div className="flex items-baseline gap-1.5">
                    <span className="font-serif font-bold text-stone-800 text-xl text-etched">{totalScore}</span>
                    <span className="text-[10px] text-stone-400 font-bold">/ 32</span>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {activeModal && (
        <CriteriaModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          subjectName={subject.name}
          criteriaLabel={activeModal}
          scores={subject.scores[activeModal]}
          onUpdateScores={handleUpdateScores}
        />
      )}
    </>
  );
};