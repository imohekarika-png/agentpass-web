// app/api/generate-exam/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mode = 'express', batchIndex = 0, language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY is not configured.' }, { status: 500 });
    }

    const isCaseStudyBatch = batchIndex >= 3;

    const systemPrompt = `You are the AgentPass™ Fast Exam Engine. Output EXACTLY 5 realistic HK EAA exam questions in raw valid JSON.

MODE: ${mode.toUpperCase()}
PART: ${isCaseStudyBatch ? 'Part II (Case Studies)' : 'Part I (Multiple Choice)'}

CRITICAL FAST GENERATION RULES:
1. Output ONLY a valid raw JSON array. NO markdown formatting, NO backticks.
2. Keep explanations EXTREMELY CONCISE (max 1-2 sentences citing Cap. sections like Cap. 511 s.40 or Buildings Ordinance s.24).

JSON Format per item:
[
  {
    "id": number,
    "part": ${isCaseStudyBatch ? 2 : 1},
    "topic": "string",
    "questionZh": "string",
    "questionEn": "string",
    "optionsZh": ["string", "string", "string", "string"],
    "optionsEn": ["string", "string", "string", "string"],
    "correctIndex": number,
    "explanationZh": "string",
    "explanationEn": "string"
  }
]`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'https://agentpass-web-eight.vercel.app',
        'X-Title': 'AgentPass Dynamic Fast Generator',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.3,
        max_tokens: 1500, // Capped to guarantee fast token throughput
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 5 questions for batch ${batchIndex + 1} now.` }
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