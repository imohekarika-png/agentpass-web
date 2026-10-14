// app/flashcards/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
  BookOpen,
  Target
} from 'lucide-react';

interface Flashcard {
  id: number;
  blockId: string;
  category: string;
  section: string;
  frontZh: string;
  frontEn: string;
  backZh: string;
  backEn: string;
}

const ALL_FLASHCARDS: Flashcard[] = [
  // Block 01
  {
    id: 1,
    blockId: 'b1',
    category: 'Cap. 511',
    section: 'Block 01 • Cap. 511 s.40',
    frontZh: '變更營業地點 notice 之法定期限為何？',
    frontEn: 'CHANGE OF BUSINESS ADDRESS NOTICE',
    backZh: '持牌人必須於變更營業地點後 31 天內，以書面通知地產代理監管局 (EAA)。',
    backEn: 'A licensee must notify the Estate Agents Authority (EAA) in writing within 31 days after changing their business address.'
  },
  {
    id: 2,
    blockId: 'b1',
    category: 'Cap. 511',
    section: 'Block 01 • Eligibility Window',
    frontZh: '考試合格後，申請 EAQE 與 SQE 牌照的有效期限分別為？',
    frontEn: 'EXAM VALIDITY WINDOW (EAQE VS SQE)',
    backZh: '代理牌照 (EAQE) 為 12 個月；營業員牌照 (SQE) 為 6 個月。',
    backEn: '12 months for Estate Agent License (EAQE); 6 months for Salesperson License (SQE).'
  },

  // Block 02
  {
    id: 3,
    blockId: 'b2',
    category: 'Cap. 511',
    section: 'Block 02 • Cap. 511 s.36',
    frontZh: '分支機構 (SPOB) 設立之分行經理委任申報期限？',
    frontEn: 'BRANCH MANAGER APPOINTMENT NOTICE',
    backZh: '新分行成立或委任分行經理後，必須於 31 天內向 EAA 申報該經理之委任。',
    backEn: 'Must notify EAA of the appointment of a branch manager within 31 days of appointment.'
  },

  // Block 04
  {
    id: 4,
    blockId: 'b4',
    category: 'Cap. 511',
    section: 'Block 04 • Cap. 511 s.43',
    frontZh: '代客戶收取訂金時之法定戶口與收據期限？',
    frontEn: 'CLIENT MONEY TRUST ACCOUNT & RECEIPT',
    backZh: '款項必須即時存入「客戶信託帳戶」，並於 14 天內發出收據，副本保存 3 年。',
    backEn: 'Must deposit into a Client Trust Account immediately; issue receipt within 14 days; retain copy for 3 years.'
  },

  // Block 11
  {
    id: 5,
    blockId: 'b11',
    category: 'Forms 1-6',
    section: 'Block 11 • Form 3 Rules',
    frontZh: '地產代理協議 (Form 3) 的有效期限限制？',
    frontEn: 'FORM 3 VALIDITY PERIOD',
    backZh: '住宅物業出售代理協議不得超過 3 個月，除非雙方另行書面同意續期。',
    backEn: 'Residential vendor agency agreement shall not exceed 3 months unless renewed in writing by both parties.'
  },

  // Block 14
  {
    id: 6,
    blockId: 'b14',
    category: 'Land Search',
    section: 'Block 14 • Company Vendor Search',
    frontZh: '當賣方為有限公司時，必須進行哪兩項查冊？',
    frontEn: 'COMPANY VENDOR TWO-SEARCH RULE',
    backZh: '必須進行土地註冊處物業查冊 + 公司註冊處按揭抵押 (Charges) 查冊。',
    backEn: 'Must conduct Land Registry search for property + Companies Registry search for charges.'
  },

  // Block 16
  {
    id: 7,
    blockId: 'b16',
    category: 'Cap. 7',
    section: 'Block 16 • Cap. 7 Tenancy',
    frontZh: '無沒收條款下，住宅租客欠租多少天業主可行使沒收權？',
    frontEn: 'TENANCY FORFEITURE UNPAID RENT THRESHOLD',
    backZh: '租客拖欠租金達 15 天 (15 Days)，業主即可行使法定沒收租賃權。',
    backEn: 'Landlord may forfeit tenancy after 15 DAYS of unpaid rent.'
  }
];

function FlashcardsContent() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const activeBlockId = searchParams.get('block');

  const [cards, setCards] = useState<Flashcard[]>(ALL_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  // AI Generator Modal State
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedModule, setSelectedModule] = useState('Cap. 511');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter cards based on block parameter OR category pill
  const filteredCards = activeBlockId 
    ? cards.filter((c) => c.blockId === activeBlockId)
    : selectedCategory === 'All' 
    ? cards 
    : cards.filter((c) => c.category === selectedCategory);

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
    setMasteredIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newCard: Flashcard = {
        id: Date.now(),
        blockId: activeBlockId || 'b1',
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

  const categories = ['All', 'Cap. 511', 'Forms 1-6', 'Cap. 7', 'Land Search', 'Code of Ethics'];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header */}
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
              href="/course"
              style={{ borderColor: 'var(--border-color)' }}
              className="px-4 py-2.5 rounded-2xl border font-bold text-xs transition flex items-center gap-1.5 hover:border-indigo-500"
            >
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '單元' : 'Syllabus'}</span>
            </Link>
          </div>
        </div>

        {/* Active Block Indicator Banner */}
        {activeBlockId && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-xs font-bold text-indigo-400">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>{isZh ? `目前正翻閱單元 (${currentCard?.section || activeBlockId}) 專屬閃卡` : `Active Block Flashcards Deck: ${currentCard?.section}`}</span>
            </div>
            <Link href="/flashcards" className="underline hover:opacity-80">
              {isZh ? '查看全部閃卡' : 'View All Decks'}
            </Link>
          </div>
        )}

        {/* Category Filter Pills (When not filtered by query parameter) */}
        {!activeBlockId && (
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
        )}

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

export default function FlashcardsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs font-mono font-bold opacity-60">Loading Flashcards Engine...</div>}>
      <FlashcardsContent />
    </Suspense>
  );
}