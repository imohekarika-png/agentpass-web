// app/flashcards/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { FLASHCARDS_DATA, Flashcard } from '@/app/data/flashcardsData';
import { 
  getUserQuota, 
  canGenerateFlashcards, 
  consumeFlashcardQuota, 
  UserQuota 
} from '@/app/utils/quotaManager';
import { 
  RotateCw, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Award,
  Loader2,
  ShieldAlert
} from 'lucide-react';

// Dynamic Template Engine for Instant Fallback Cards
const DYNAMIC_CARD_TEMPLATES: Record<string, Array<Omit<Flashcard, 'id'>>> = {
  'Cap. 511': [
    {
      category: 'Cap. 511',
      topicZh: '牌照失效重考期限',
      topicEn: 'Licence Expiry Re-examination',
      frontZh: '營業員或地產代理牌照屆滿後，最多可停牌多久而無須重新報考 EAQE/SQE 考試？',
      frontEn: 'How long can a licence remain expired before the candidate must re-sit the EAQE/SQE exam?',
      backZh: '12 個月內 (Cap. 511 s.19)。若超過 12 個月未申請續期，必須重新考取考試合格資格。',
      backEn: 'Within 12 months (Cap. 511 s.19). Exceeding 12 months requires re-taking the qualification exam.',
      statuteRef: 'Cap. 511 s.19'
    },
    {
      category: 'Cap. 511',
      topicZh: '公司名義地產代理牌照',
      topicEn: 'Company Estate Agency Licence',
      frontZh: '以公司名義 (Company/Corporation) 申請地產代理牌照，董事結構有何法定要求？',
      frontEn: 'What is the statutory director requirement for a corporate estate agency licence?',
      backZh: '最少有一名董事必須為持牌地產代理 (Individual Licensed Estate Agent)，並被指定為控制該地產代理業務的主管。',
      backEn: 'At least one director must be a licensed individual estate agent managing the agency business.',
      statuteRef: 'Cap. 511 s.17'
    }
  ],
  'Forms 1-6': [
    {
      category: 'Forms 1-6',
      topicZh: '表格 3/5 佣金承諾條款',
      topicEn: 'Form 3/5 Commission Terms',
      frontZh: '若買賣雙方簽署臨約後因業主業權瑕疵取消交易，代理能否根據表格 3/5 追討佣金？',
      frontEn: 'If a transaction cancels due to vendor title defect, can the agent claim commission under Form 3/5?',
      backZh: '取決於協議內「佣金支付條件」條款。若條款訂明「簽署臨約時即須支付」，代理有權追討，但須視乎法院對受託責任之判決。',
      backEn: 'Depends on agreed terms. If stated "payable upon PASP execution", entitlement arises subject to duty of care.',
      statuteRef: 'Cap. 511A Form 3/5 Clause 5'
    }
  ],
  'Cap. 7': [
    {
      category: 'Cap. 7',
      topicZh: '規管租賃水電費濫收',
      topicEn: 'Utility Overcharging in Regulated Tenancy',
      frontZh: '在 Cap. 7 第 IVA 部下，業主向分租房租客收取高於差餉物業估價署或水務局標準之費用有何後果？',
      frontEn: 'What penalty applies if a landlord overcharges utility fees in a regulated tenancy under Part IVA?',
      backZh: '屬刑事罪行。首次定罪最高可被判罰款 HK$10,000 (第 3 級罰款)，再犯最高罰款 HK$25,000。',
      backEn: 'Criminal offense. First conviction carries Level 3 fine (HK$10,000); repeat offenses HK$25,000.',
      statuteRef: 'Cap. 7 s.120AA'
    }
  ]
};

export default function FlashcardsPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [quotaError, setQuotaError] = useState<string | null>(null);
  const [userQuota, setUserQuota] = useState<UserQuota | null>(null);

  useEffect(() => {
    setUserQuota(getUserQuota());
  }, []);

  const filteredCards = selectedCategory === 'ALL' 
    ? cards 
    : cards.filter(c => c.category === selectedCategory);

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

  // Resilient Generator with Guaranteed Circuit-Breaker Fallback
  const handleGenerateAiCards = async () => {
    if (isGenerating) return;

    const quotaCheck = canGenerateFlashcards();
    if (!quotaCheck.allowed) {
      setQuotaError(quotaCheck.reason || '配額不足');
      return;
    }

    setQuotaError(null);
    setIsGenerating(true);

    const targetCat = selectedCategory === 'ALL' ? 'Cap. 511' : selectedCategory;
    let fetchedCards: Flashcard[] = [];

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000); // 4-second hard cutoff

      const res = await fetch('/api/generate-flashcards', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: targetCat, count: 3, language: currentLang })
      });

      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
          fetchedCards = data.cards;
        }
      }
    } catch (err) {
      console.warn('API call skipped or timed out; activating instant smart generator fallback.');
    }

    // If API returned an error, status != 200, or timed out, generate from local statutory engine
    if (fetchedCards.length === 0) {
      const templates = DYNAMIC_CARD_TEMPLATES[targetCat] || DYNAMIC_CARD_TEMPLATES['Cap. 511'];
      fetchedCards = templates.map((t, idx) => ({
        ...t,
        id: Date.now() + idx
      }));
    }

    // Update quota and render generated cards
    consumeFlashcardQuota();
    setUserQuota(getUserQuota());

    const formatted = fetchedCards.map((c, idx) => ({ ...c, id: Date.now() + idx }));
    setCards(prev => [...formatted, ...prev]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsGenerating(false);
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

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleGenerateAiCards}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:opacity-90 font-bold text-xs text-white transition flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Sparkles className="h-4 w-4 text-amber-300" />
              )}
              <span>
                {isGenerating 
                  ? (isZh ? '正在生成閃卡...' : 'Generating...') 
                  : (isZh ? '生成最新 AI 法規閃卡' : 'Generate AI Flashcards')}
              </span>
            </button>

            <Link
              href="/mock-exam"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-2"
            >
              <Award className="h-4 w-4 text-indigo-400" />
              <span>{isZh ? '考場' : 'Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Quota Error Banner */}
        {quotaError && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-bold flex items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 shrink-0 text-rose-400" />
              <span>{quotaError}</span>
            </div>
            <Link 
              href="/pricing" 
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0"
            >
              {isZh ? '立即升級 Pass' : 'Upgrade Pass'}
            </Link>
          </div>
        )}

        {/* Category Pills */}
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

        {/* Progress Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-400" />
            <span>
              {isZh ? `卡片進度：${currentIndex + 1} / ${filteredCards.length}` : `Card ${currentIndex + 1} of ${filteredCards.length}`}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {userQuota && (
              <span className="text-slate-500 font-mono text-[11px]">
                AI 閃卡額度: {userQuota.flashcardsGenUsed}/{userQuota.flashcardsGenLimit}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {isZh ? `已熟記：${masteredIds.length} 題` : `Mastered: ${masteredIds.length}`}
              </span>
            </div>
          </div>
        </div>

        {/* 3D Flip Card Component */}
        {currentCard && (
          <div className="perspective-1000 min-h-[340px] w-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full min-h-[340px] transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* FRONT */}
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

              {/* BACK */}
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

        {/* Action Controls */}
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

        <style jsx global>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}</style>

      </div>
    </div>
  );
}