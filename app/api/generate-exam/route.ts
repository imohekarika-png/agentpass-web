// app/api/generate-exam/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { count = 5, language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are the official AgentPass™ Exam Generator. Generate a valid JSON array of exactly ${count} realistic EAQE/SQE exam questions based on HK EAA past paper standards.

CRITICAL PERFORMANCE RULES:
1. Keep explanations concise (max 1-2 sentences).
2. Output ONLY raw valid JSON (no markdown backticks, no introduction).

JSON Schema:
[
  {
    "id": number,
    "part": 1 or 2,
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
        'X-Title': 'AgentPass HK EAA Dynamic Exam Generator',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.4,
        max_tokens: 1800,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate ${count} EAQE questions in JSON.` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error status: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '[]';
    const cleanJsonString = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    const questions = JSON.parse(cleanJsonString);

    return NextResponse.json({ questions }, { status: 200 });

  } catch (error: any) {
    console.error('Exam Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate dynamic exam suite.' },
      { status: 500 }
    );
  }
}