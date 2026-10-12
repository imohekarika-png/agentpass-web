// app/flashcards/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { FLASHCARDS_DATA, Flashcard } from '@/app/data/flashcardsData';
import { 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Award,
  LayoutDashboard
} from 'lucide-react';

export default function FlashcardsPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  const filteredCards = selectedCategory === 'ALL' 
    ? FLASHCARDS_DATA 
    : FLASHCARDS_DATA.filter(c => c.category === selectedCategory);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = (id: number) => {
    if (masteredIds.includes(id)) {
      setMasteredIds(masteredIds.filter(mId => mId !== id));
    } else {
      setMasteredIds([...masteredIds, id]);
      handleNext();
    }
  };

  const categories = ['ALL', 'Cap. 511', 'Forms 1-6', 'Cap. 7', 'Land Search', 'Code of Ethics'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{isZh ? 'EAA 核心法規記憶卡片庫' : 'Official Legal Flashcard Deck'}</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {isZh ? '地產牌照高頻考點閃卡 (Flashcards)' : 'EAA High-Frequency Flashcard Deck'}
            </h1>
          </div>

          <Link
            href="/mock-exam"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-600/20"
          >
            <Award className="h-4 w-4" />
            <span>{isZh ? '前往模擬試題考場' : 'Go to Mock Exam'}</span>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? (isZh ? '全部記憶卡 (All)' : 'All Cards') : cat}
            </button>
          ))}
        </div>

        {/* Progress Tracker Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-400" />
            <span>
              {isZh ? `卡片進度：${currentIndex + 1} / ${filteredCards.length}` : `Card ${currentIndex + 1} of ${filteredCards.length}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>
              {isZh ? `已熟記：${masteredIds.length} 題` : `Mastered: ${masteredIds.length}`}
            </span>
          </div>
        </div>

        {/* Interactive 3D Flip Card */}
        {currentCard && (
          <div className="perspective-1000 min-h-[340px] w-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full min-h-[340px] transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* FRONT OF CARD */}
              <div className="absolute inset-0 w-full min-h-[340px] p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl flex flex-col justify-between backface-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold">
                    {currentCard.category}
                  </span>
                  <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                    <RotateCw className="h-3.5 w-3.5" />
                    {isZh ? '點擊翻轉看答案' : 'Click to flip'}
                  </span>
                </div>

                <div className="space-y-3 my-auto">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    {isZh ? currentCard.topicZh : currentCard.topicEn}
                  </span>
                  <p className="text-lg sm:text-xl font-black text-white leading-relaxed">
                    {isZh ? currentCard.frontZh : currentCard.frontEn}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
                  <span>{currentCard.statuteRef || 'HK EAA Syllabus'}</span>
                  <span className="text-indigo-400 font-bold">{isZh ? '正面：問題' : 'Front: Question'}</span>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="absolute inset-0 w-full min-h-[340px] p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-emerald-500/40 shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                    {currentCard.category} • Correct Answer
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {isZh ? '解答/法條依據' : 'Answer Key'}
                  </span>
                </div>

                <div className="space-y-3 my-auto">
                  <p className="text-base sm:text-lg font-bold text-emerald-100 leading-relaxed whitespace-pre-line">
                    {isZh ? currentCard.backZh : currentCard.backEn}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
                  <span className="text-amber-400 font-mono font-bold">{currentCard.statuteRef}</span>
                  <span className="text-emerald-400 font-bold">{isZh ? '背面：解答解析' : 'Back: Explanation'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Card Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrev}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{isZh ? '上一張' : 'Previous'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isZh ? '下一張' : 'Next'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {currentCard && (
            <button
              onClick={() => toggleMastered(currentCard.id)}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                masteredIds.includes(currentCard.id)
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {masteredIds.includes(currentCard.id)
                  ? (isZh ? '已標記為熟記 (Unmark)' : 'Marked Mastered')
                  : (isZh ? '標記為已熟記 (Mastered)' : 'Mark as Mastered')}
              </span>
            </button>
          )}
        </div>

        {/* CSS 3D Utility Classes */}
        <style jsx global>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>

      </div>
    </div>
  );
}