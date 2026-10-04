// app/api/explain-question/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// 1. Initialize Supabase Admin Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// 2. Initialize OpenAI SDK with OpenRouter Gateway
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'EAA Exam Platform',
  }
});

// --- SAFETY GUARD 1: IN-MEMORY RATE LIMITER & COOLDOWN MAP ---
// Tracks request timestamps per (questionId + userChoice) to prevent rapid multi-clicks or loops
const requestTracker = new Map<string, number>();
const COOLDOWN_MS = 5000; // 5-second lock between duplicate calls for the same item

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const { 
      questionId,
      question, 
      userChoice, 
      language = 'EN'
    } = await req.json();

    // --- SAFETY GUARD 2: PARAMETER VALIDATION ---
    if (!questionId || !question || !userChoice) {
      console.warn('⚠️ [API GUARD] Rejected request due to missing parameters.');
      return NextResponse.json(
        { error: 'Missing required parameters: questionId, question, userChoice' }, 
        { status: 400 }
      );
    }

    const requestKey = `${questionId}_${userChoice}_${language}`;
    const lastCalled = requestTracker.get(requestKey);

    // --- SAFETY GUARD 3: PREVENT REPEAT LOOPS WITHIN COOLDOWN WINDOW ---
    if (lastCalled && (Date.now() - lastCalled) < COOLDOWN_MS) {
      console.warn(`🛑 [API GUARD BLOCKED LOOP] Duplicate call prevented for key: ${requestKey}`);
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few seconds before asking again.' },
        { status: 429 }
      );
    }

    // Set/Update last called timestamp
    requestTracker.set(requestKey, Date.now());

    // --- STEP 1: SUPABASE CACHE LOOKUP (<50ms) ---
    const { data: cachedExplanation } = await supabase
      .from('ai_explanations')
      .select('*')
      .eq('question_id', questionId)
      .eq('user_choice', userChoice)
      .eq('language', language)
      .maybeSingle();

    if (cachedExplanation) {
      const duration = Date.now() - startTime;
      console.log(`⚡ [CACHE HIT | ${duration}ms] Q: ${questionId.substring(0, 8)}... | Choice: ${userChoice} | Lang: ${language} | Cost: $0.00`);

      return NextResponse.json({
        success: true,
        source: 'cache',
        durationMs: duration,
        explanation: {
          whyUserChoiceIsWrong: cachedExplanation.why_wrong,
          whyCorrectChoiceIsRight: cachedExplanation.why_correct,
          statutoryKeyConcept: cachedExplanation.statutory_concept,
          examTip: cachedExplanation.exam_tip
        }
      });
    }

    // --- STEP 2: CACHE MISS - LOG & EXECUTE LLM CALL ---
    console.log(`🔥 [LLM CALL TRIGGERED] Q: ${questionId.substring(0, 8)}... | Choice: ${userChoice} | Model: meta-llama/llama-3.1-8b-instruct`);

    const isZh = language === 'ZH';
    const stem = isZh && question.stem_zh ? question.stem_zh : question.stem;
    const options = question.options.map((opt: any) => ({
      key: opt.key,
      text: isZh && opt.text_zh ? opt.text_zh : opt.text
    }));
    const statutoryRef = question.ordinance_tag || 'Estate Agents Ordinance (Cap. 511)';

    const systemPrompt = `
You are an expert Hong Kong Estate Agents Authority (EAA) examination tutor for EAQE and SQE.
Rules:
1. Always ground explanations in Hong Kong law (Cap. 511, Cap. 511A, Cap. 511C, Code of Ethics, Practice Circulars).
2. Maintain an encouraging, clear, and professional tone.
3. Respond in ${isZh ? 'Traditional Chinese (Hong Kong terminology)' : 'English'}.
`;

    const userPrompt = `
Question Stem: ${stem}
Options: ${JSON.stringify(options, null, 2)}
Correct Answer: ${question.correct_option}
User Selected Answer: ${userChoice}
Statutory Reference / Official Note: ${isZh ? (question.explanation_zh || question.explanation) : question.explanation} (${statutoryRef})

Please return a valid JSON object matching this exact schema:
{
  "whyUserChoiceIsWrong": "Explanation of why Option ${userChoice} is incorrect according to HK law.",
  "whyCorrectChoiceIsRight": "Explanation of why Option ${question.correct_option} is the correct answer.",
  "statutoryKeyConcept": "1-2 sentence core rule or ordinance reference for the exam.",
  "examTip": "A memory hook or practical advice to avoid this mistake in the future."
}
`;

    const response = await openai.chat.completions.create({
      model: 'meta-llama/llama-3.1-8b-instruct',
      response_format: { type: 'json_object' },
      max_tokens: 600, // SAFETY GUARD 4: Strict token cap prevents run-away outputs
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    });

    const duration = Date.now() - startTime;
    const usage = response.usage;

    // Log detailed token metrics to terminal
    console.log(`✅ [LLM SUCCESS | ${duration}ms] Tokens Prompt: ${usage?.prompt_tokens || 'N/A'}, Completion: ${usage?.completion_tokens || 'N/A'}, Total: ${usage?.total_tokens || 'N/A'}`);

    const parsedExplanation = JSON.parse(response.choices[0].message.content || '{}');

    // --- STEP 3: PERSIST GENERATED EXPLANATION TO CACHE ---
    await supabase.from('ai_explanations').insert({
      question_id: questionId,
      user_choice: userChoice,
      language: language,
      why_wrong: parsedExplanation.whyUserChoiceIsWrong,
      why_correct: parsedExplanation.whyCorrectChoiceIsRight,
      statutory_concept: parsedExplanation.statutoryKeyConcept,
      exam_tip: parsedExplanation.examTip
    });

    return NextResponse.json({
      success: true,
      source: 'llm_generated',
      durationMs: duration,
      tokensUsed: usage?.total_tokens || 0,
      explanation: parsedExplanation
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ [API ERROR | ${duration}ms]:`, error.message);

    return NextResponse.json(
      { error: 'Failed to generate explanation', details: error.message },
      { status: 500 }
    );
  }
}