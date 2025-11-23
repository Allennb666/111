// ==================== DATA STRUCTURE ====================

const DEFAULT_SUBJECTS = [
  { id: 'chn', name: 'Chinese', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'eng', name: 'English', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'math', name: 'Mathematics', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'bio', name: 'Biology', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'phys', name: 'Physics', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'dd', name: 'Digital Design', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'pd', name: 'Product Design', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'mus', name: 'Music', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'phe', name: 'PHE', scores: { A: [], B: [], C: [], D: [] } },
];

const GRADE_BOUNDARIES = [
  { grade: 1, min: 0, max: 5 },
  { grade: 2, min: 6, max: 9 },
  { grade: 3, min: 10, max: 14 },
  { grade: 4, min: 15, max: 18 },
  { grade: 5, min: 19, max: 23 },
  { grade: 6, min: 24, max: 27 },
  { grade: 7, min: 28, max: 32 },
];

const CRITERIA_LABELS = ['A', 'B', 'C', 'D'];

// ==================== STATE ====================

let subjects = loadSubjects();

function loadSubjects() {
  const saved = localStorage.getItem('myp-subjects-v1');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_SUBJECTS));
}

function saveSubjects() {
  localStorage.setItem('myp-subjects-v1', JSON.stringify(subjects));
}

// ==================== CALCULATIONS ====================

function calculateCriterionAverage(scores) {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / scores.length);
}

function calculateCriterionRawAverage(scores) {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return parseFloat((sum / scores.length).toFixed(1));
}

function calculateTotalScore(scores) {
  const scoreA = calculateCriterionAverage(scores.A);
  const scoreB = calculateCriterionAverage(scores.B);
  const scoreC = calculateCriterionAverage(scores.C);
  const scoreD = calculateCriterionAverage(scores.D);
  return scoreA + scoreB + scoreC + scoreD;
}

function calculateFinalGrade(totalScore) {
  const boundary = GRADE_BOUNDARIES.find(
    (b) => totalScore >= b.min && totalScore <= b.max
  );
  return boundary ? boundary.grade : 1;
}

function getGradeColor(grade) {
  if (grade === 7) return 'bg-emerald-500/10 border-emerald-400/20 text-emerald-300';
  if (grade === 6) return 'bg-teal-500/10 border-teal-400/20 text-teal-300';
  if (grade === 5) return 'bg-blue-500/10 border-blue-400/20 text-blue-300';
  if (grade === 4) return 'bg-amber-500/10 border-amber-400/20 text-amber-300';
  if (grade === 3) return 'bg-orange-500/10 border-orange-400/20 text-orange-300';
  return 'bg-rose-500/10 border-rose-400/20 text-rose-300';
}

function getGradeColorHex(grade) {
  if (grade === 7) return '#6ee7b7';
  if (grade === 6) return '#5eead4';
  if (grade === 5) return '#93c5fd';
  if (grade === 4) return '#fcd34d';
  if (grade === 3) return '#fdba74';
  return '#fda4af';
}

function getIconForSubject(name) {
  const lower = name.toLowerCase();
  if (lower.includes('math')) return '🔢';
  if (lower.includes('design') && lower.includes('digital')) return '💻';
  if (lower.includes('design')) return '✏️';
  if (lower.includes('music')) return '🎵';
  if (lower.includes('phe')) return '⚽';
  if (lower.includes('bio')) return '🌿';
  if (lower.includes('phys')) return '⚛️';
  if (lower.includes('chinese') || lower.includes('english')) return '🌐';
  return '📚';
}

// ==================== RENDERING ====================

function renderDashboard() {
  const subjectsWithGrades = subjects.map(s => {
    const total = calculateTotalScore(s.scores);
    const grade = calculateFinalGrade(total);
    return { name: s.name, shortName: s.id.toUpperCase(), grade, total };
  });

  const totalPoints = subjectsWithGrades.reduce((acc, curr) => acc + curr.grade, 0);
  const gpa = totalPoints / subjects.length;

  const dashboardHTML = `
    <!-- Left Column - Hero Stats -->
    <div class="lg:col-span-4 grid grid-cols-1 gap-8">
      
      <!-- GPA Card -->
      <div class="glass-hyper rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col justify-between min-h-[300px] animate-spring-up group z-10 hover:-translate-y-3 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-rose-500/10 opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
        <div class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,white_90deg,transparent_180deg)] opacity-10 animate-[spin_10s_linear_infinite]"></div>
        
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/50 border border-white/60 backdrop-blur-md shadow-sm mb-6">
             <span class="text-indigo-400">✨</span>
             <h3 class="text-stone-500 font-sans text-[10px] font-black tracking-widest uppercase">Cumulative GPA</h3>
          </div>
          
          <div class="flex items-baseline gap-1">
             <span class="text-[7rem] font-serif font-bold tracking-tighter text-stone-800 drop-shadow-2xl leading-[0.8] text-etched">${gpa.toFixed(2)}</span>
          </div>
          <div class="mt-4 w-fit px-4 py-1.5 rounded-full glass-hyper-well text-stone-500 text-xs font-bold tracking-tight shadow-inner flex items-center gap-2">
             <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
             out of 7.00 scale
          </div>
        </div>
        
        <div class="relative z-10 mt-8 pt-6 border-t border-white/20 flex items-center gap-3 text-stone-500 text-xs font-bold uppercase tracking-wider">
           <div class="p-2 rounded-full bg-white/40">
             📚
           </div>
           <span>${subjects.length} Subjects Active</span>
        </div>
      </div>

      <!-- Total Points Card -->
      <div class="glass-hyper rounded-[3rem] p-9 animate-spring-up [animation-delay:200ms] opacity-0 fill-mode-forwards hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden">
         <div class="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 blur-[50px] rounded-full pointer-events-none"></div>

        <div class="flex items-center justify-between mb-8 relative z-10">
          <h3 class="text-stone-500 font-sans text-[10px] font-black tracking-widest uppercase text-etched">Total Points</h3>
          <div class="glass-hyper-bubble p-3 rounded-[1.2rem] text-amber-500 shadow-md">
             🏆
          </div>
        </div>
        
        <div class="flex items-end gap-3 mb-6 relative z-10">
          <span class="text-6xl font-serif font-bold text-stone-800 text-etched lh-1">${totalPoints}</span>
          <span class="text-stone-400 text-lg font-bold mb-2">/ ${subjects.length * 7}</span>
        </div>
        
        <div class="w-full glass-hyper-well h-4 rounded-full overflow-hidden p-[2px] relative z-10">
          <div 
              class="h-full bg-gradient-to-r from-amber-300 to-orange-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] relative transition-all duration-1000 ease-out" 
              style="width: ${(totalPoints / (subjects.length * 7)) * 100}%"
          >
              <div class="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent w-full h-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Chart -->
    <div class="lg:col-span-8 glass-hyper rounded-[3.5rem] p-10 flex flex-col animate-spring-up [animation-delay:400ms] opacity-0 fill-mode-forwards relative overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div class="flex items-center space-x-5 mb-12 relative z-10">
          <div class="glass-hyper-bubble p-4 rounded-[1.5rem] shadow-md">
              📊
          </div>
          <div>
             <h3 class="font-serif text-3xl text-stone-800 font-bold tracking-tight text-etched">Performance</h3>
             <p class="text-[11px] text-stone-400 font-black uppercase tracking-widest mt-1">Grade Distribution Visualization</p>
          </div>
      </div>
      
      <div class="flex-grow h-96 w-full relative z-10">
        <canvas id="gradeChart"></canvas>
      </div>
    </div>
  `;

  document.getElementById('dashboard').innerHTML = dashboardHTML;
  
  // Render chart
  setTimeout(() => {
    renderChart(subjectsWithGrades);
  }, 100);
}

function renderChart(data) {
  const ctx = document.getElementById('gradeChart');
  if (!ctx) return;

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.shortName),
      datasets: [{
        label: 'Grade',
        data: data.map(d => d.grade),
        backgroundColor: data.map(d => getGradeColorHex(d.grade)),
        borderColor: 'rgba(255,255,255,0.6)',
        borderWidth: 2,
        borderRadius: 16,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1c1917',
          bodyColor: '#44403c',
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1,
          padding: 16,
          cornerRadius: 24,
          titleFont: { size: 14, weight: 'bold', family: 'Outfit' },
          bodyFont: { size: 16, weight: '700', family: 'Outfit' },
          displayColors: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 8,
          ticks: {
            stepSize: 2,
            color: '#d6d3d1',
            font: { size: 12, family: 'JetBrains Mono', weight: 'bold' }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.03)',
            drawBorder: false,
          }
        },
        x: {
          ticks: {
            color: '#a8a29e',
            font: { size: 11, family: 'Outfit', weight: '800' }
          },
          grid: { display: false }
        }
      }
    }
  });
}

function renderSubjects() {
  const container = document.getElementById('subjectsContainer');
  container.innerHTML = subjects.map((subject, idx) => {
    const totalScore = calculateTotalScore(subject.scores);
    const finalGrade = calculateFinalGrade(totalScore);
    const colorClass = getGradeColor(finalGrade);
    const icon = getIconForSubject(subject.name);
    
    const criteriaHTML = CRITERIA_LABELS.map(crit => {
      const scores = subject.scores[crit];
      const average = calculateCriterionAverage(scores);
      const count = scores.length;
      const hasScore = count > 0;
      
      return `
        <button
          onclick="openModal('${subject.id}', '${crit}')"
          class="relative flex flex-col items-center justify-center aspect-square w-full rounded-[1.2rem] transition-all duration-500 overflow-hidden ${hasScore ? 'glass-hyper-bubble hover:-translate-y-1' : 'glass-hyper-well hover:bg-white/40 opacity-70 hover:opacity-100'}"
        >
          <span class="text-[9px] font-black absolute top-2 left-0 right-0 text-center ${hasScore ? 'text-stone-400' : 'opacity-30'}">${crit}</span>
          
          ${hasScore ? `
            <div class="flex flex-col items-center mt-2">
               <span class="font-serif text-2xl font-bold text-stone-800 drop-shadow-sm leading-none">${average}</span>
               ${count > 1 ? `
                 <div class="absolute bottom-1.5 right-1.5 bg-stone-800 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-bold shadow-md">
                   ${count}
                 </div>
               ` : ''}
            </div>
          ` : `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-20 mt-2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          `}
        </button>
      `;
    }).join('');

    return `
      <div class="animate-spring-up opacity-0 fill-mode-forwards h-full" style="animation-delay: ${idx * 120}ms">
        <div class="group relative glass-hyper rounded-[2.5rem] flex flex-col h-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02]">
          <div class="hyper-glare rounded-[2.5rem]"></div>

          <div class="relative z-10 p-7 flex flex-col h-full">
            
            <!-- Header -->
            <div class="flex items-start justify-between mb-6">
              <div class="flex flex-col space-y-3">
                 <div class="w-12 h-12 rounded-2xl glass-hyper-bubble flex items-center justify-center text-stone-600 shadow-lg transform transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500 text-2xl">
                    ${icon}
                 </div>
                 
                 <div>
                   <div class="text-[9px] font-extrabold tracking-[0.2em] uppercase text-stone-400 mb-1 text-etched">${subject.id.toUpperCase()}</div>
                   <h3 class="text-2xl font-serif font-semibold text-stone-800 leading-none group-hover:text-stone-950 transition-colors duration-300 text-etched drop-shadow-sm">
                     ${subject.name}
                   </h3>
                 </div>
              </div>
              
              <!-- Grade Badge -->
              <div class="relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-700 ease-spring group-hover:scale-110 group-hover:-translate-y-2 shadow-2xl ${colorClass} border-4 border-white/40 backdrop-blur-md">
                 <div class="absolute top-3 right-4 w-4 h-3 bg-white rounded-full opacity-60 blur-[2px] transform rotate-45"></div>
                 <div class="absolute bottom-2 left-4 w-6 h-6 bg-black opacity-10 rounded-full blur-[8px]"></div>
                 
                 <span class="font-serif font-bold text-4xl leading-none text-embossed z-10 text-stone-800 mix-blend-overlay">
                  ${finalGrade}
                 </span>
              </div>
            </div>

            <!-- Criteria Grid -->
            <div class="flex-grow mb-4">
               <div class="grid grid-cols-4 gap-3">
                ${criteriaHTML}
              </div>
            </div>
            
            <!-- Footer -->
            <div class="mt-auto pt-4 border-t border-stone-900/5">
              <div class="relative px-5 py-3 glass-hyper-well rounded-[1.2rem] flex justify-between items-center">
                 <div class="text-[9px] text-stone-400 font-black uppercase tracking-widest">
                   Total
                 </div>
                 <div class="flex items-baseline gap-1.5">
                    <span class="font-serif font-bold text-stone-800 text-xl text-etched">${totalScore}</span>
                    <span class="text-[10px] text-stone-400 font-bold">/ 32</span>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== MODAL ====================

function openModal(subjectId, criteria) {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return;

  const scores = subject.scores[criteria];
  const average = calculateCriterionAverage(scores);
  const rawAverage = calculateCriterionRawAverage(scores);

  const scoresHTML = scores.length === 0 ? `
    <div class="text-center py-12 rounded-[2rem] border-2 border-dashed border-stone-300/30 bg-white/5">
      <p class="text-stone-400 text-sm font-serif italic">点击输入框添加分数</p>
    </div>
  ` : scores.map((score, idx) => `
    <div class="flex items-center justify-between p-5 rounded-[1.5rem] glass-hyper-bubble animate-spring-up hover:scale-[1.02] transition-transform group" style="animation-delay: ${idx * 50}ms; animation-fill-mode: both;">
      <div class="flex items-center gap-5">
        <span class="w-8 h-8 rounded-full bg-stone-200/50 border border-white text-stone-400 flex items-center justify-center text-[11px] font-mono font-bold shadow-inner">
          ${idx + 1}
        </span>
        <span class="font-serif text-3xl font-bold text-stone-800">${score}</span>
      </div>
      <button
        onclick="removeScore('${subjectId}', '${criteria}', ${idx})"
        class="w-10 h-10 flex items-center justify-center text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
      >
        🗑️
      </button>
    </div>
  `).join('');

  const modalHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-200/30 backdrop-blur-xl animate-fade-in-up" onclick="closeModalOnBackdrop(event)">
      <div class="w-full max-w-lg animate-modal-pop rounded-[4rem] relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
        <div class="absolute inset-0 glass-hyper rounded-[4rem]"></div>
        
        <div class="relative z-10">
          
          <!-- Header -->
          <div class="px-12 py-10 flex justify-between items-start">
            <div class="space-y-2">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-stone-800 animate-pulse"></span>
                <span class="text-[11px] font-black uppercase tracking-widest text-stone-600">
                  Criterion ${criteria}
                </span>
              </div>
              <h3 class="text-5xl font-serif font-bold text-stone-800 tracking-tight drop-shadow-sm">${subject.name}</h3>
            </div>
            <button 
              onclick="closeModal()"
              class="w-14 h-14 rounded-full flex items-center justify-center glass-hyper-bubble text-stone-400 hover:text-rose-500 transition-all duration-500 hover:rotate-90 hover:scale-110"
            >
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="px-12 pb-12 space-y-10">
            
            <!-- Stats Display -->
            <div class="relative glass-hyper-well rounded-[2.5rem] p-8 flex items-center justify-between overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-shimmer"></div>
                
                <div class="flex flex-col justify-between relative z-10">
                  <p class="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">Average Score</p>
                  <div class="flex items-baseline gap-3">
                    <span class="text-7xl font-serif font-bold text-stone-800 text-etched drop-shadow-lg">${average}</span>
                    <span class="text-lg text-stone-400 font-bold mb-2 opacity-60">/ 8</span>
                  </div>
                </div>
                
                <div class="w-0.5 bg-stone-300/40 h-16 mx-6 rounded-full"></div>
                
                <div class="flex flex-col justify-center text-right relative z-10 min-w-[80px]">
                   <div class="flex items-center justify-end gap-1.5 text-stone-400 mb-2">
                     🧮
                     <span class="text-[9px] uppercase font-black tracking-wider">Raw</span>
                   </div>
                   <p class="font-mono text-3xl font-bold text-stone-600 tracking-tighter">${rawAverage}</p>
                </div>
            </div>

            <!-- Input Area -->
            <form onsubmit="addScore(event, '${subjectId}', '${criteria}')" class="space-y-4">
              <div class="flex gap-6">
                <div class="relative flex-shrink-0 group w-40">
                  <input
                    id="scoreInput"
                    type="number"
                    min="0"
                    max="8"
                    step="1"
                    placeholder="-"
                    class="relative w-full h-24 px-4 rounded-[2.5rem] outline-none text-5xl font-serif font-bold text-center transition-all duration-300 glass-hyper-well text-stone-800 focus:shadow-[inset_0_10px_25px_rgba(0,0,0,0.08)] focus:bg-white/20"
                  />
                  <span class="absolute top-3 right-6 text-[10px] font-bold text-stone-400 opacity-50">MAX 8</span>
                </div>
                
                <button
                  type="submit"
                  class="flex-1 h-24 rounded-[2.5rem] font-medium transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group bg-stone-900 text-stone-50 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-500/40 active:scale-95 active:translate-y-1"
                >
                  <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                  
                  <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                     ➕
                  </div>
                  <span class="text-xl font-serif font-bold tracking-wide">Add Score</span>
                </button>
              </div>
              
              <div id="errorMsg" class="h-6 pl-4"></div>
            </form>

            <!-- History -->
            <div class="pt-6 border-t border-stone-300/20">
              <div class="flex items-center justify-between px-2 mb-4 opacity-60">
                 <div class="flex items-center gap-2">
                   🕐
                   <h4 class="text-[10px] font-black text-stone-500 uppercase tracking-widest">Score History</h4>
                 </div>
                 <span class="text-[10px] font-bold text-stone-400">${scores.length} entries</span>
              </div>
              
              <div class="max-h-52 overflow-y-auto pr-2 custom-scrollbar space-y-3 -mx-2 px-2 pb-2">
                ${scoresHTML}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modalContainer').innerHTML = modalHTML;
  
  // Auto focus input
  setTimeout(() => {
    document.getElementById('scoreInput')?.focus();
  }, 400);
}

function closeModal() {
  document.getElementById('modalContainer').innerHTML = '';
  render();
}

function closeModalOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function addScore(event, subjectId, criteria) {
  event.preventDefault();
  const input = document.getElementById('scoreInput');
  const value = parseInt(input.value, 10);
  
  if (isNaN(value) || value < 0 || value > 8) {
    showError('Score must be 0-8');
    return;
  }

  const subject = subjects.find(s => s.id === subjectId);
  if (subject) {
    subject.scores[criteria].push(value);
    saveSubjects();
    openModal(subjectId, criteria); // Re-render modal
  }
}

function removeScore(subjectId, criteria, index) {
  const subject = subjects.find(s => s.id === subjectId);
  if (subject) {
    subject.scores[criteria].splice(index, 1);
    saveSubjects();
    openModal(subjectId, criteria); // Re-render modal
  }
}

function showError(message) {
  const errorDiv = document.getElementById('errorMsg');
  errorDiv.innerHTML = `
    <div class="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wide animate-fade-in-up bg-rose-50/50 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
      ⚠️
      <span>${message}</span>
    </div>
  `;
  setTimeout(() => {
    errorDiv.innerHTML = '';
  }, 3000);
}

// ==================== RESET ====================

function handleReset() {
  if (confirm('重新开始？这将清除所有已记录的分数。')) {
    subjects = JSON.parse(JSON.stringify(DEFAULT_SUBJECTS));
    saveSubjects();
    render();
  }
}

// ==================== CSV IMPORT ====================

function handleImportClick() {
  document.getElementById('csvInput').click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    try {
      processCSV(text);
      // Reset input value to allow selecting the same file again
      event.target.value = '';
    } catch (err) {
      alert('Error parsing CSV: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (i + 1 < line.length && line[i + 1] === '"') {
        // Handle escaped quotes ("")
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function processCSV(text) {
  const lines = text.split('\n');
  if (lines.length < 2) return; // Empty or just header

  // 1. Map CSV subjects to our internal IDs
  const subjectMap = {
    'Chinese': 'chn',
    'English': 'eng',
    'Mathematics': 'math',
    'Biology': 'bio',
    'Physics': 'phys',
    'Digital Design': 'dd',
    'Product Design': 'pd',
    'Physical and health': 'phe',
    'Music': 'mus',
  };

  // Create a temporary storage for parsed grades
  const newScores = {}; 
  // Initialize with empty arrays for all known subjects
  subjects.forEach(s => {
    newScores[s.id] = { A: [], B: [], C: [], D: [] };
  });

  let processedCount = 0;

  // Skip header (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = parseCSVLine(line);
    // Expected columns based on provided CSV:
    // 0: Class Name (e.g., "Chinese (Grade 8) B")
    // ...
    // 6: A
    // 7: B
    // 8: C
    // 9: D
    
    if (columns.length < 10) continue;

    const className = columns[0];
    let subjectId = null;

    // Find matching subject ID
    for (const [key, id] of Object.entries(subjectMap)) {
      if (className.includes(key)) {
        subjectId = id;
        break;
      }
    }

    if (!subjectId || !newScores[subjectId]) continue;

    // Parse grades for A, B, C, D (columns 6, 7, 8, 9)
    ['A', 'B', 'C', 'D'].forEach((crit, idx) => {
      const colIndex = 6 + idx;
      const cellContent = columns[colIndex]; 
      // cellContent format example: "7/8", "2/8", or empty
      
      if (cellContent) {
        // Extract the numerator (score)
        const match = cellContent.match(/^(\d+)/);
        if (match) {
          const score = parseInt(match[1], 10);
          if (!isNaN(score) && score >= 0 && score <= 8) {
            newScores[subjectId][crit].push(score);
            processedCount++;
          }
        }
      }
    });
  }

  if (processedCount === 0) {
    alert('No valid grades found in the CSV.');
    return;
  }

  if (confirm(`Found valid grades for ${processedCount} criteria entries. This will overwrite existing grades for matched subjects. Continue?`)) {
    // Update subjects with new scores
    subjects.forEach(s => {
      if (newScores[s.id]) {
        // Only update if we found valid data for this subject? 
        // Or clear if the CSV implies emptiness?
        // Logic: The CSV is the source of truth. If CSV has data for 'chn', we use it.
        // But if CSV has 0 entries for 'mus', should we clear 'mus'?
        // Let's assume CSV is comprehensive. But to be safe, only overwrite if newScores[s.id] is not empty-ish?
        // Actually, for "Sync" behavior, we should probably overwrite.
        // However, since we initialized newScores with empty arrays, doing this will clear subjects not present in CSV.
        // Let's check if the subject appeared in the CSV at all to decide whether to clear.
        
        // Better approach: Since we iterated through the CSV, we populated newScores.
        // If a subject was never found in CSV, newScores[s.id] remains empty.
        // If we want to support partial updates (only update Chinese), we need to track which subjects were touched.
        
        // For now, let's simply replace the scores for subjects that we found in the CSV.
        // But how do we know if we found them? 
        // Let's just check if there are ANY scores in the new set for that subject.
        const hasData = Object.values(newScores[s.id]).some(arr => arr.length > 0);
        if (hasData) {
            s.scores = newScores[s.id];
        }
      }
    });
    
    saveSubjects();
    render();
    alert('Import successful!');
  }
}

// ==================== INIT ====================

function render() {
  renderDashboard();
  renderSubjects();
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  
  document.getElementById('resetBtn').addEventListener('click', handleReset);
  document.getElementById('importBtn').addEventListener('click', handleImportClick);
  document.getElementById('csvInput').addEventListener('change', handleFileSelect);
});

