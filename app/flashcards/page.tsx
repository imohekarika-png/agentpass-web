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
  Award
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

const SAMPLE_FLASHCARDS: Flashcard[] = [
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
    frontZh: '根據 Cap. 7，住宅租約終動通知期一般為多久？',
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
  }
];

export default function FlashcardsPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [cards] = useState<Flashcard[]>(SAMPLE_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  const filteredCards = selectedCategory === 'All' 
    ? cards 
    : cards.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = (id: number) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Cap. 511', 'Forms 1-6', 'Cap. 7', 'Land Search', 'Code of Ethics'];

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
            <button className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition flex items-center gap-2 cursor-pointer">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Generate AI Flashcards</span>
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
        {currentCard && (
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
                  {!isFlipped ? 'Front: Question' : 'Back: Answer'}
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
        )}

      </div>
    </div>
  );
}