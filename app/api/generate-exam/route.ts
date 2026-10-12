// app/api/generate-exam/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mode = 'express', batchIndex = 0, language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY is not configured.' }, { status: 500 });
    }

    const isZh = !language || language.toString().toUpperCase().includes('ZH');
    const isCaseStudyBatch = batchIndex >= 3;

    // Targeted single-language prompt cuts output tokens in half!
    const langInstructions = isZh
      ? 'Output question, options, and explanation ONLY in Traditional Chinese (HK Real Estate Terminology).'
      : 'Output question, options, and explanation ONLY in English.';

    const systemPrompt = `You are the AgentPass™ Ultra-Fast Exam Engine. Output EXACTLY 5 realistic HK EAA exam questions in raw valid JSON.

MODE: ${mode.toUpperCase()}
PART: ${isCaseStudyBatch ? 'Part II (Case Studies)' : 'Part I (Multiple Choice)'}
LANGUAGE: ${langInstructions}

CRITICAL RULES:
1. Return ONLY raw valid JSON array. NO markdown codeblocks.
2. Explanations must be 1 sentence citing Cap. section (e.g., Cap. 511 s.40).

JSON Format:
[
  {
    "id": number,
    "part": ${isCaseStudyBatch ? 2 : 1},
    "topic": "string",
    "questionZh": "${isZh ? '中文題目' : ''}",
    "questionEn": "${!isZh ? 'English Question' : ''}",
    "optionsZh": ${isZh ? '["選項A", "選項B", "選項C", "選項D"]' : '[]'},
    "optionsEn": ${!isZh ? '["Opt A", "Opt B", "Opt C", "Opt D"]' : '[]'},
    "correctIndex": number,
    "explanationZh": "${isZh ? '中文解析' : ''}",
    "explanationEn": "${!isZh ? 'English Explanation' : ''}"
  }
]`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'https://agentpass-web-eight.vercel.app',
        'X-Title': 'AgentPass Ultra-Fast Generator',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.2,
        max_tokens: 1000,
        // Route to highest-throughput fast providers on OpenRouter
        provider: {
          order: ['Fireworks', 'Together', 'DeepInfra'],
          allow_fallbacks: true
        },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 5 fast questions now.` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter status ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '[]';
    const cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    const questions = JSON.parse(cleanJson);

    return NextResponse.json({ questions }, { status: 200 });

  } catch (error: any) {
    console.error('Generate Exam Error:', error);
    return NextResponse.json({ error: 'Failed to generate dynamic exam batch.' }, { status: 500 });
  }
}