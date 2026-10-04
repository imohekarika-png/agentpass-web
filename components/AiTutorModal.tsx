// components/AiTutorModal.tsx
'use client';

import { useState } from 'react';

interface Props {
  questionId: string;
  question: any;
  userChoice: string;
  language: 'EN' | 'ZH';
}

interface AiExplanation {
  whyUserChoiceIsWrong: string;
  whyCorrectChoiceIsRight: string;
  statutoryKeyConcept: string;
  examTip: string;
}

export default function AiTutorModal({ questionId, question, userChoice, language }: Props) {
  // 1. Declare state variables at the top of the component body
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AiExplanation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchAiExplanation = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          questionId, 
          question, 
          userChoice, 
          language 
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to generate explanation');
      }

      setAiResponse(data.explanation);
    } catch (err: any) {
      console.error('API Error:', err);
      setErrorMessage(err.message || 'Error generating AI explanation');
    } finally {
      setLoading(false);
    }
  };

  // 2. Render JSX cleanly with all variables in scope
  return (
    <div 
      key={`ai-tutor-${questionId}-${userChoice}`} 
      className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 mt-4"
    >
      {!aiResponse && !loading && (
        <button
          onClick={fetchAiExplanation}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition text-sm"
        >
          {language === 'ZH' ? '🤖 詢問 AI 導師解說' : '🤖 Ask AI Tutor for Explanation'}
        </button>
      )}

      {loading && (
        <div className="flex items-center space-x-2 text-indigo-600 text-sm">
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          <span>{language === 'ZH' ? 'AI 導師分析中...' : 'AI Tutor analyzing question...'}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-red-100 text-red-800 rounded-lg text-xs font-mono">
          ⚠️ {errorMessage}
        </div>
      )}

      {aiResponse && (
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-300 rounded-lg">
            <strong className="block font-semibold mb-1">
              {language === 'ZH' ? `❌ 選擇 (${userChoice}) 為何不正確：` : `❌ Why Option (${userChoice}) is Incorrect:`}
            </strong>
            {aiResponse.whyUserChoiceIsWrong}
          </div>

          <div className="p-3 bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-300 rounded-lg">
            <strong className="block font-semibold mb-1">
              {language === 'ZH' ? `✅ 正確答案 (${question.correct_option}) 理據：` : `✅ Why Option (${question.correct_option}) is Correct:`}
            </strong>
            {aiResponse.whyCorrectChoiceIsRight}
          </div>

          <div className="p-3 bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-300 rounded-lg">
            <strong className="block font-semibold mb-1">
              {language === 'ZH' ? '📜 核心法例條文：' : '📜 Statutory Key Concept:'}
            </strong>
            {aiResponse.statutoryKeyConcept}
          </div>

          <div className="p-3 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 rounded-lg">
            <strong className="block font-semibold mb-1">
              {language === 'ZH' ? '💡 應試技巧 / 錦囊：' : '💡 Exam Tip:'}
            </strong>
            {aiResponse.examTip}
          </div>
        </div>
      )}
    </div>
  );
}