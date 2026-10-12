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
    
    // Determine batch configuration (each batch yields 10 high-quality Qs)
    const count = 10;
    const isCaseStudyBatch = batchIndex >= 3; // Batches 0-2 = Part I (MC), Batches 3-4 = Part II (Case Study)

    const systemPrompt = `You are the official AgentPass™ Exam Engine. Generate exactly ${count} realistic HK EAA exam questions based on official past papers.
Target Mode: ${mode.toUpperCase()} (${mode === 'sqe' ? 'Salesperson SQE' : mode === 'eaqe' ? 'Estate Agent EAQE' : 'Express Drill'}).
Target Section: ${isCaseStudyBatch ? 'Part II (Case Studies: Form 1-6, Conveyancing, Demolition Orders)' : 'Part I (Multiple Choice: Cap. 511, POIM Land Search, Cap. 7)'}.

CRITICAL REQUIREMENTS:
1. Return ONLY raw valid JSON array. No markdown wrap, no markdown backticks.
2. Explanations must cite exact Cap. sections (e.g., Cap. 511 s.40, Cap. 7 Part IVA, Buildings Ordinance s.24).

JSON Schema per item:
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
        'X-Title': 'AgentPass Dynamic Exam Generator',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.4,
        max_tokens: 2800,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate batch ${batchIndex + 1} of ${count} questions in JSON.` }
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