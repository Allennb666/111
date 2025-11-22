import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Trash2, AlertCircle, Calculator, History, ArrowRight } from 'lucide-react';
import { calculateCriterionRawAverage, calculateCriterionAverage } from '../services/gradeService';

interface CriteriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  criteriaLabel: string;
  scores: number[];
  onUpdateScores: (newScores: number[]) => void;
}

export const CriteriaModal: React.FC<CriteriaModalProps> = ({
  isOpen,
  onClose,
  subjectName,
  criteriaLabel,
  scores,
  onUpdateScores,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
    setInputValue('');
    setError(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    if (!val) {
      setError(null);
      return;
    }

    const num = parseFloat(val);
    if (num < 0 || num > 8) {
      setError('Score must be 0-8');
    } else {
      setError(null);
    }
  };

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    const val = parseInt(inputValue, 10);
    
    if (!isNaN(val) && val >= 0 && val <= 8) {
      onUpdateScores([...scores, val]);
      setInputValue('');
      setError(null);
      inputRef.current?.focus();
    }
  };

  const handleRemove = (index: number) => {
    const newScores = [...scores];
    newScores.splice(index, 1);
    onUpdateScores(newScores);
  };

  const average = calculateCriterionAverage(scores);
  const rawAverage = calculateCriterionRawAverage(scores);
  const isInputInvalid = error !== null;
  const isSubmitDisabled = !inputValue || isInputInvalid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-200/30 backdrop-blur-xl animate-fade-in-up">
      {/* Main Lens Container */}
      <div 
        className="w-full max-w-lg animate-modal-pop rounded-[4rem] relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
      >
        {/* The Hyper Liquid Glass Effect */}
        <div className="absolute inset-0 glass-hyper rounded-[4rem]"></div>
        
        <div className="relative z-10">
          
          {/* Header Area */}
          <div className="px-12 py-10 flex justify-between items-start">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-stone-800 animate-pulse"></span>
                <span className="text-[11px] font-black uppercase tracking-widest text-stone-600">
                  Criterion {criteriaLabel}
                </span>
              </div>
              <h3 className="text-5xl font-serif font-bold text-stone-800 tracking-tight drop-shadow-sm">{subjectName}</h3>
            </div>
            <button 
              onClick={onClose}
              className="w-14 h-14 rounded-full flex items-center justify-center glass-hyper-bubble text-stone-400 hover:text-rose-500 transition-all duration-500 hover:rotate-90 hover:scale-110"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Content Body */}
          <div className="px-12 pb-12 space-y-10">
            
            {/* Calculation Display - Floating Prism */}
            <div className="relative glass-hyper-well rounded-[2.5rem] p-8 flex items-center justify-between overflow-hidden group">
                {/* Fluid background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_4s_infinite]"></div>
                
                <div className="flex flex-col justify-between relative z-10">
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">Average Score</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl font-serif font-bold text-stone-800 text-etched drop-shadow-lg">{average}</span>
                    <span className="text-lg text-stone-400 font-bold mb-2 opacity-60">/ 8</span>
                  </div>
                </div>
                
                {/* Vertical Divider */}
                <div className="w-0.5 bg-stone-300/40 h-16 mx-6 rounded-full"></div>
                
                <div className="flex flex-col justify-center text-right relative z-10 min-w-[80px]">
                   <div className="flex items-center justify-end gap-1.5 text-stone-400 mb-2">
                     <Calculator className="w-4 h-4" />
                     <span className="text-[9px] uppercase font-black tracking-wider">Raw</span>
                   </div>
                   <p className="font-mono text-3xl font-bold text-stone-600 tracking-tighter">{rawAverage}</p>
                </div>
            </div>

            {/* Interactive Input Area */}
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="flex gap-6">
                {/* Deep Well Input */}
                <div className="relative flex-shrink-0 group w-40">
                  <input
                    ref={inputRef}
                    type="number"
                    min="0"
                    max="8"
                    step="1"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="-"
                    className={`relative w-full h-24 px-4 rounded-[2.5rem] outline-none text-5xl font-serif font-bold text-center transition-all duration-300 glass-hyper-well
                      ${isInputInvalid 
                        ? 'text-rose-500 bg-rose-50/30 shadow-[inset_0_0_20px_rgba(225,29,72,0.1)]' 
                        : 'text-stone-800 focus:shadow-[inset_0_10px_25px_rgba(0,0,0,0.08)] focus:bg-white/20'
                      }
                    `}
                  />
                  <span className="absolute top-3 right-6 text-[10px] font-bold text-stone-400 opacity-50">MAX 8</span>
                </div>
                
                {/* Massive Liquid Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="flex-1 h-24 rounded-[2.5rem] font-medium transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group
                    disabled:opacity-50 disabled:cursor-not-allowed
                    bg-stone-900 text-stone-50 shadow-xl
                    hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-500/40
                    active:scale-95 active:translate-y-1
                  "
                >
                  {/* Gloss overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                  
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-serif font-bold tracking-wide">Add Score</span>
                </button>
              </div>
              
              <div className="h-6 pl-4">
                {error && (
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wide animate-fade-in-up bg-rose-50/50 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </form>

            {/* Floating History Strip */}
            <div className="pt-6 border-t border-stone-300/20">
              <div className="flex items-center justify-between px-2 mb-4 opacity-60">
                 <div className="flex items-center gap-2">
                   <History className="w-4 h-4 text-stone-500" />
                   <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Score History</h4>
                 </div>
                 <span className="text-[10px] font-bold text-stone-400">{scores.length} entries</span>
              </div>
              
              <div className="max-h-52 overflow-y-auto pr-2 custom-scrollbar space-y-3 -mx-2 px-2 pb-2">
                {scores.length === 0 ? (
                  <div className="text-center py-12 rounded-[2rem] border-2 border-dashed border-stone-300/30 bg-white/5">
                    <p className="text-stone-400 text-sm font-serif italic">Tap the input to add a score</p>
                  </div>
                ) : (
                  scores.map((score, idx) => (
                    <div 
                        key={idx} 
                        className="flex items-center justify-between p-5 rounded-[1.5rem] glass-hyper-bubble animate-spring-up hover:scale-[1.02] transition-transform group" 
                        style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                    >
                      <div className="flex items-center gap-5">
                        <span className="w-8 h-8 rounded-full bg-stone-200/50 border border-white text-stone-400 flex items-center justify-center text-[11px] font-mono font-bold shadow-inner">
                          {idx + 1}
                        </span>
                        <span className="font-serif text-3xl font-bold text-stone-800">{score}</span>
                      </div>
                      <button
                        onClick={() => handleRemove(idx)}
                        className="w-10 h-10 flex items-center justify-center text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};