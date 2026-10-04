// scripts/pre-cache-explanations.mjs
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENROUTER_API_KEY) {
  console.error('❌ Error: Missing required environment variables in .env.local');
  process.exit(1);
}

// Initialize Supabase Admin Client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Initialize OpenAI SDK with OpenRouter Gateway
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'EAA Platform Pre-Cacher',
  }
});

// Delay helper to manage OpenRouter rate limits gracefully
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateAndCacheExplanation(question, userChoice, language) {
  const isZh = language === 'ZH';
  const stem = isZh && question.stem_zh ? question.stem_zh : question.stem;
  const options = question.options.map((opt) => ({
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

  try {
    const response = await openai.chat.completions.create({
      model: 'meta-llama/llama-3.1-8b-instruct',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    });

    const parsedExplanation = JSON.parse(response.choices[0].message.content || '{}');

    // Save to Supabase Cache
    const { error: insertError } = await supabase.from('ai_explanations').insert({
      question_id: question.id,
      user_choice: userChoice,
      language: language,
      why_wrong: parsedExplanation.whyUserChoiceIsWrong,
      why_correct: parsedExplanation.whyCorrectChoiceIsRight,
      statutory_concept: parsedExplanation.statutoryKeyConcept,
      exam_tip: parsedExplanation.examTip
    });

    if (insertError) {
      console.error(`   ⚠️ DB Insert Error [Q: ${question.id}, Opt: ${userChoice}, Lang: ${language}]:`, insertError.message);
    } else {
      console.log(`   ✅ Pre-cached [Q: ${question.id.substring(0, 8)}... | Choice: ${userChoice} | Lang: ${language}]`);
    }

  } catch (err) {
    console.error(`   ❌ Generation Error [Q: ${question.id}, Opt: ${userChoice}, Lang: ${language}]:`, err.message);
  }
}

async function runPreCache() {
  console.log('🚀 Starting Offline Pre-Caching Job for EAA Question Bank...\n');

  // 1. Fetch all questions from Supabase
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .order('id', { ascending: true });

  if (error || !questions) {
    console.error('❌ Failed to fetch questions from Supabase:', error?.message);
    process.exit(1);
  }

  console.log(`📋 Found ${questions.length} total questions in database.\n`);

  let totalProcessed = 0;
  let totalSkipped = 0;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    console.log(`\n[${i + 1}/${questions.length}] Processing Question ID: ${question.id}`);

    // Get all incorrect answer choices for this question
    const incorrectChoices = question.options
      .map((opt) => opt.key)
      .filter((key) => key !== question.correct_option);

    const languages = ['EN', 'ZH'];

    for (const lang of languages) {
      for (const choice of incorrectChoices) {
        // Check if already cached
        const { data: existing } = await supabase
          .from('ai_explanations')
          .select('id')
          .eq('question_id', question.id)
          .eq('user_choice', choice)
          .eq('language', lang)
          .maybeSingle();

        if (existing) {
          console.log(`   ⏩ Skipping [Choice: ${choice} | Lang: ${lang}] - Already Cached`);
          totalSkipped++;
          continue;
        }

        // Generate and cache new explanation
        await generateAndCacheExplanation(question, choice, lang);
        totalProcessed++;

        // Pause 250ms between API calls to stay within rate limits cleanly
        await delay(250);
      }
    }
  }

  console.log('\n==================================================');
  console.log(`🎉 Pre-Caching Job Complete!`);
  console.log(`   - Newly Generated & Cached: ${totalProcessed}`);
  console.log(`   - Skipped (Already Cached): ${totalSkipped}`);
  console.log('==================================================\n');
}

runPreCache();