// app/api/generate-exam/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mode = 'express', batchIndex = 0, language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY is not configured.' }, { status: 500 });
    }

    const langStr = (language || 'ZH').toString().toUpperCase();
    const isZh = langStr.includes('ZH') || langStr.includes('HK') || langStr.includes('CN');
    const isCaseStudyBatch = batchIndex >= 3;

    const systemPrompt = `You are the AgentPass™ Fast Exam Engine. Output EXACTLY 5 realistic HK EAA exam questions in raw valid JSON.

MODE: ${mode.toUpperCase()}
PART: ${isCaseStudyBatch ? 'Part II (Case Studies)' : 'Part I (Multiple Choice)'}
LANGUAGE FOCUS: ${isZh ? 'Traditional Chinese (HK Real Estate Terminology)' : 'English'}

CRITICAL RULES:
1. Return ONLY a valid raw JSON array. NO markdown backticks, NO intro/outro text.
2. Explanations MUST be 1 concise sentence citing Cap. section (e.g. Cap. 511 s.40 or Cap. 7).
3. Populate BOTH Zh and En fields (you can duplicate the active text into both fields for speed).

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
        'X-Title': 'AgentPass Fast Generator',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.2,
        max_tokens: 1600,
        provider: {
          order: ['Fireworks', 'Together', 'DeepInfra'],
          allow_fallbacks: true
        },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 5 questions for batch ${batchIndex + 1} in JSON.` }
        ]
      })
    });

    if (!response.ok) {
      const errTxt = await response.text();
      console.error('OpenRouter Error:', errTxt);
      return NextResponse.json({ error: `OpenRouter error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '[]';
    
    // Clean codeblock wrappers
    const cleanJson = rawContent
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    let questions = [];
    try {
      questions = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('JSON Parse error on content:', rawContent);
      return NextResponse.json({ error: 'Failed to parse JSON response from LLM' }, { status: 500 });
    }

    // Sanitize and fallback-fill missing bilingual fields
    const sanitized = questions.map((q: any, idx: number) => ({
      id: q.id || idx + 1,
      part: q.part || (isCaseStudyBatch ? 2 : 1),
      topic: q.topic || 'EAA Licensing',
      questionZh: q.questionZh || q.questionEn || '題目載入中',
      questionEn: q.questionEn || q.questionZh || 'Question Loading',
      optionsZh: Array.isArray(q.optionsZh) && q.optionsZh.length === 4 ? q.optionsZh : (q.optionsEn || ['A', 'B', 'C', 'D']),
      optionsEn: Array.isArray(q.optionsEn) && q.optionsEn.length === 4 ? q.optionsEn : (q.optionsZh || ['A', 'B', 'C', 'D']),
      correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
      explanationZh: q.explanationZh || q.explanationEn || '依據地產代理條例規定。',
      explanationEn: q.explanationEn || q.explanationZh || 'According to Estate Agents Ordinance.'
    }));

    return NextResponse.json({ questions: sanitized }, { status: 200 });

  } catch (error: any) {
    console.error('Generate Exam Catch Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}