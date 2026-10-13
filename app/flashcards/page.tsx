// app/flashcards/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Award,
  X,
  Plus,
  Zap,
  BookOpen
} from 'lucide-react';

interface Flashcard {
  id: number;
  category: string;
  section: string;
  frontZh: string;
  frontEn: string;
  backZh: string;
  backEn: string;
}

const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    category: 'Cap. 511',
    section: 'Cap. 511 s.40',
    frontZh: '變更營業地點 notice 之法定期限為何？',
    frontEn: 'CHANGE OF BUSINESS ADDRESS',
    backZh: '持牌人必須於變更營業地點後 31 天內，以書面通知地產代理監管局 (EAA)。',
    backEn: 'A licensee must notify the Estate Agents Authority (EAA) in writing within 31 days after changing their business address.'
  },
  {
    id: 2,
    category: 'Forms 1-6',
    section: 'Form 3 - Section 6',
    frontZh: '地產代理協議 (Form 3) 的有效期限限制？',
    frontEn: 'FORM 3 VALIDITY PERIOD',
    backZh: '住宅物業出售代理協議不得超過 3 個月，除非雙方另行書面同意續期。',
    backEn: 'Residential vendor agency agreement shall not exceed 3 months unless renewed in writing by both parties.'
  },
  {
    id: 3,
    category: 'Cap. 7',
    section: 'Cap. 7 Tenancy Notice',
    frontZh: '根據 Cap. 7，住宅租約終止通知期一般為多久？',
    frontEn: 'NOTICE TO QUIT (TENANCY)',
    backZh: '無固定期限租約或月租合約，終止通知期通常為至少 1 個完整曆月。',
    backEn: 'For periodic or monthly tenancies, the notice to quit must be at least 1 full calendar month.'
  },
  {
    id: 4,
    category: 'Land Search',
    section: 'P-O-I-M Inspection',
    frontZh: '土地查冊中「M」代表甚麼？如何處理？',
    frontEn: 'LAND SEARCH "M" - MEMORANDUM',
    backZh: '「M」代表 Memorandum (備忘錄/押記令)。須核實是否影響業權完整性或涉及未解除法庭押記。',
    backEn: '"M" stands for Memorandum/Charging Order. Must verify if it encumbers title or involves unreleased charges.'
  },
  {
    id: 5,
    category: 'Code of Ethics',
    section: 'EAA Code of Ethics s.3(5)',
    frontZh: '地產代理處理雙重代理 (Dual Agency) 的法定披露義務？',
    frontEn: 'DUAL AGENCY DISCLOSURE',
    backZh: '必須向買賣雙方充分披露雙重代理身份及佣金安排，並取得雙方書面同意。',
    backEn: 'Must fully disclose dual agency status and commission arrangements to both parties and obtain written consent.'
  }
];

export default function FlashcardsPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [cards, setCards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  // Generator Modal State
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedModule, setSelectedModule] = useState('Cap. 511');
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ['All', 'Cap. 511', 'Forms 1-6', 'Cap. 7', 'Land Search', 'Code of Ethics'];

  const filteredCards = selectedCategory === 'All' 
    ? cards 
    : cards.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0] || cards[0];

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = (id: number) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newCard: Flashcard = {
        id: Date.now(),
        category: selectedModule,
        section: `${selectedModule} AI Spec`,
        frontZh: customPrompt ? `AI 特訓題目：${customPrompt}` : `地產代理監管局 (EAA) 高頻考試核心解析 (AI 模組: ${selectedModule})`,
        frontEn: customPrompt ? `AI FOCUS DRILL: ${customPrompt.toUpperCase()}` : `AI GENERATED DRILL (${selectedModule.toUpperCase()})`,
        backZh: `重點條文解析：根據地產代理條例與最新的法庭判例，持牌人必須保持盡職審查 (Due Diligence) 責任。`,
        backEn: `Key Statutory Provision: Under the Estate Agents Ordinance, licensees must exercise due diligence in all transaction representations.`
      };

      setCards((prev) => [newCard, ...prev]);
      setSelectedCategory(selectedModule);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsGenerating(false);
      setIsGeneratorOpen(false);
      setCustomPrompt('');
    }, 800);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header & AI Generator Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-colors duration-300"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Official Legal Flashcard Deck</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              EAA High-Frequency Flashcard Deck
            </h1>
            <p className="text-xs font-medium opacity-80">
              {isZh ? '針對香港地產代理法規條文與數字錨點的速記訓練。' : 'Interval memory drills for HK EAA regulations & statutory numeric anchors.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setIsGeneratorOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-200" />
              <span>{isZh ? '生成 AI 閃卡' : 'Generate AI Flashcards'}</span>
            </button>

            <Link 
              href="/mock-exam"
              style={{ borderColor: 'var(--border-color)' }}
              className="px-4 py-2.5 rounded-2xl border font-bold text-xs transition flex items-center gap-1.5 hover:border-indigo-500"
            >
              <Award className="h-3.5 w-3.5 text-indigo-400" />
              <span>Exam</span>
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                style={{ 
                  backgroundColor: isSelected ? undefined : 'var(--bg-card)', 
                  borderColor: isSelected ? undefined : 'var(--border-color)',
                  color: isSelected ? '#ffffff' : 'var(--text-main)' 
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'hover:border-indigo-500/50'
                }`}
              >
                {cat === 'All' ? (isZh ? '全部卡牌' : 'All Cards') : cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Flashcard Deck Surface */}
        {currentCard ? (
          <div className="space-y-6">
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ 
                backgroundColor: 'var(--bg-card)', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-main)' 
              }}
              className="relative min-h-[340px] p-8 rounded-3xl border shadow-2xl flex flex-col justify-between cursor-pointer group hover:border-indigo-500/60 transition-all duration-300"
            >
              {/* Card Top Metadata */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-500">
                  {currentCard.category}
                </span>

                <div className="flex items-center gap-2 text-xs font-bold opacity-70 group-hover:opacity-100 transition">
                  <RotateCw className="h-3.5 w-3.5 text-amber-500" />
                  <span>{isZh ? '點擊翻轉卡牌' : 'Click to flip'}</span>
                </div>
              </div>

              {/* Card Core Content (Front / Back) */}
              <div className="py-8 space-y-4 text-center sm:text-left">
                {!isFlipped ? (
                  <div className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-amber-500">
                      {currentCard.frontEn}
                    </h2>
                    <p className="text-base sm:text-lg font-bold leading-relaxed">
                      {currentCard.frontZh}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                    <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest block">
                      {isZh ? '【 法規條文解答 】' : '[ Statutory Answer ]'}
                    </span>
                    <p className="text-base sm:text-lg font-extrabold leading-relaxed text-emerald-500">
                      {currentCard.backZh}
                    </p>
                    <p className="text-xs sm:text-sm font-medium opacity-80 leading-relaxed">
                      {currentCard.backEn}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer Info */}
              <div 
                style={{ borderColor: 'var(--border-color)' }}
                className="pt-4 border-t flex items-center justify-between text-xs font-mono opacity-70"
              >
                <span>{currentCard.section}</span>
                <span className="font-bold">
                  {!isFlipped ? (isZh ? '正面：考題' : 'Front: Question') : (isZh ? '背面：解析' : 'Back: Answer')}
                </span>
              </div>
            </div>

            {/* Deck Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                  className="px-4 py-2.5 rounded-2xl border font-bold text-xs transition flex items-center gap-1.5 hover:border-indigo-500 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{isZh ? '上一張' : 'Previous'}</span>
                </button>

                <button
                  onClick={handleNext}
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                  className="px-4 py-2.5 rounded-2xl border font-bold text-xs transition flex items-center gap-1.5 hover:border-indigo-500 cursor-pointer"
                >
                  <span>{isZh ? '下一張' : 'Next'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="text-xs font-mono font-bold opacity-60">
                {currentIndex + 1} / {filteredCards.length}
              </div>

              <button
                onClick={() => toggleMastered(currentCard.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  masteredIds.includes(currentCard.id)
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>
                  {masteredIds.includes(currentCard.id)
                    ? (isZh ? '已完全掌握' : 'Mastered')
                    : (isZh ? '標記為已掌握' : 'Mark as Mastered')}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="p-12 text-center rounded-3xl border space-y-4"
          >
            <p className="text-sm font-bold opacity-70">
              {isZh ? '此分類下暫無速記卡牌' : 'No flashcards available for this category.'}
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
            >
              {isZh ? '查看全部卡牌' : 'View All Cards'}
            </button>
          </div>
        )}

      </div>

      {/* AI Flashcard Generator Modal */}
      {isGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
            className="w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 relative"
          >
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold">
                    {isZh ? 'AI 閃卡生成器' : 'AI Flashcard Generator'}
                  </h3>
                  <p className="text-xs opacity-60">
                    {isZh ? '輸入特定考點或選擇法案單元生成專屬卡牌' : 'Generate flashcards for custom exam topics'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsGeneratorOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-800/40 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-2 opacity-70">
                  {isZh ? '選擇考科範疇' : 'Select Exam Category'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cap. 511', 'Forms 1-6', 'Cap. 7', 'Land Search'].map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setSelectedModule(mod)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                        selectedModule === mod 
                          ? 'bg-indigo-600 border-indigo-500 text-white' 
                          : 'border-slate-800/80 hover:border-indigo-500/50'
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-2 opacity-70">
                  {isZh ? '自訂關鍵字或法例主題 (選填)' : 'Custom Topic / Keyword (Optional)'}
                </label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={isZh ? '例如：雙重代理、Form 3 違約罰則、租務通知期' : 'e.g., Dual agency, Form 3 penalties, Tenancy notice'}
                  className="w-full px-4 py-3 rounded-2xl border text-xs font-medium focus:outline-none focus:border-indigo-500 transition"
                  style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsGeneratorOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold opacity-70 hover:opacity-100 transition"
              >
                {isZh ? '取消' : 'Cancel'}
              </button>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateAI}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 hover:opacity-95 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    <span>{isZh ? '生成中...' : 'Generating...'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>{isZh ? '立即生成專屬閃卡' : 'Generate Flashcard'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}