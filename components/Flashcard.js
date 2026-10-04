'use client'; 

import { useState } from 'react';
import { calculateNextReview } from '../lib/srs-engine';
import { supabase } from '../lib/supabase';

export default function Flashcard({ questionData, user, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [srsResult, setSrsResult] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!questionData) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading question...</div>;

  const handleOptionClick = (key) => {
    if (showAnswer) return; 
    setSelectedOption(key);
    setShowAnswer(true);
  };

  const handleMemoryRating = async (quality) => {
    setIsSaving(true);
    
    // 1. Fetch the user's PREVIOUS memory state for this specific question
    const { data: previousState } = await supabase
      .from('user_srs_states')
      .select('interval, repetitions, ease_factor')
      .eq('user_id', user.id)
      .eq('question_id', questionData.id)
      .maybeSingle();

    // 2. Set our starting variables (use defaults if it is a brand new question)
    const currentInterval = previousState?.interval || 0;
    const currentRepetitions = previousState?.repetitions || 0;
    const currentEaseFactor = previousState?.ease_factor || 2.5;

    // 3. Feed the REAL previous data into our SM-2 algorithm!
    const result = calculateNextReview(quality, currentInterval, currentRepetitions, currentEaseFactor);
    setSrsResult(result);

    // 4. Save the newly calculated data back to the database
    const { error } = await supabase
      .from('user_srs_states')
      .upsert({
        user_id: user.id,
        question_id: questionData.id,
        interval: result.interval,
        repetitions: result.repetitions,
        ease_factor: result.easeFactor,
        next_review_date: result.nextReviewDate
      }, { 
        onConflict: 'user_id, question_id' 
      });

    if (error) {
      console.error("Error saving memory state:", error.message);
    }
    
    setIsSaving(false);
  };

  const isCorrect = selectedOption === questionData.correct_option;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      <div className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex justify-between items-center">
        <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase">
          {questionData.ordinance_tag || 'EAA Syllabus'}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
          {questionData.stem}
        </h2>

        <div className="space-y-3">
          {questionData.options.map((option) => {
            let buttonStyle = "border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700";
            
            if (showAnswer) {
              if (option.key === questionData.correct_option) {
                buttonStyle = "border-green-500 bg-green-50 text-green-800 ring-2 ring-green-500 ring-opacity-50"; 
              } else if (option.key === selectedOption) {
                buttonStyle = "border-red-500 bg-red-50 text-red-800 opacity-70"; 
              } else {
                buttonStyle = "border-gray-200 text-gray-400 opacity-50"; 
              }
            }

            return (
              <button
                key={option.key}
                onClick={() => handleOptionClick(option.key)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${buttonStyle}`}
              >
                <span className="font-bold shrink-0 w-6">{option.key}.</span>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>

        {showAnswer && !srsResult && (
          <div className="mt-8 animate-fade-in-up">
            <div className={`p-5 rounded-xl mb-6 ${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
              <p className="font-bold mb-2">{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</p>
              <p className="text-sm leading-relaxed">{questionData.explanation}</p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-center text-sm font-semibold text-gray-500 mb-4">How hard was this to remember?</p>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => handleMemoryRating(1)} disabled={isSaving} className="py-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-sm transition-colors">
                  Again
                </button>
                <button onClick={() => handleMemoryRating(3)} disabled={isSaving} className="py-3 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold rounded-lg text-sm transition-colors">
                  Hard
                </button>
                <button onClick={() => handleMemoryRating(4)} disabled={isSaving} className="py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-sm transition-colors">
                  Good
                </button>
                <button onClick={() => handleMemoryRating(5)} disabled={isSaving} className="py-3 bg-green-50 hover:bg-green-100 text-green-700 font-bold rounded-lg text-sm transition-colors">
                  Easy
                </button>
              </div>
            </div>
          </div>
        )}

        {srsResult && (
          <div className="mt-8 p-6 bg-slate-900 rounded-xl text-white font-mono text-sm shadow-inner relative animate-fade-in-up">
            <p className="text-green-400 mb-2">✅ Saved to Supabase Database</p>
            <p>Next Interval: <span className="text-blue-300">{srsResult.interval} days</span></p>
            <p>Repetition Streak: <span className="text-blue-300">{srsResult.repetitions}</span></p>
            <p>New Ease Factor: <span className="text-blue-300">{srsResult.easeFactor}</span></p>
            <p className="mt-3 text-gray-400 text-xs mb-6">Target Date: {new Date(srsResult.nextReviewDate).toLocaleDateString()}</p>
            
            <button 
              onClick={onNext}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-lg transition-colors shadow-lg"
            >
              Next Question ➔
            </button>
          </div>
        )}

      </div>
    </div>
  );
}