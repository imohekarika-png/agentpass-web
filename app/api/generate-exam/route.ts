// app/api/generate-exam/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { count = 10, language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are the official AgentPass™ Exam Engine. Generate a structured JSON array containing exactly ${count} realistic EAQE/SQE exam questions based on official Hong Kong EAA past paper patterns.

Requirements:
1. Divide questions into Part 1 (Multiple Choice, Cap. 511, POIM Land Search, Cap. 7) and Part 2 (Case Studies, Forms 1-6, Conveyancing, Demolition Orders).
2. Format MUST strictly return a valid raw JSON array of objects with no surrounding markdown or explanation.

JSON Schema per item:
[
  {
    "id": number,
    "part": 1 or 2,
    "topic": "string",
    "questionZh": "string",
    "questionEn": "string",
    "optionsZh": ["string", "string", "string", "string"],
    "optionsEn": ["string", "string", "string", "string"],
    "correctIndex": number (0-3),
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
        temperature: 0.5,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate ${count} EAQE exam questions now.` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '[]';
    
    // Clean any markdown backticks from model output
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