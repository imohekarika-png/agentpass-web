// app/api/generate-flashcards/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { category = 'Cap. 511', count = 5, language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY is not configured.' }, { status: 500 });
    }

    const langStr = (language || 'ZH').toString().toUpperCase();
    const isZh = langStr.includes('ZH') || langStr.includes('HK') || langStr.includes('CN');

    const systemPrompt = `You are the AgentPass™ Fast Flashcard Engine. Output EXACTLY 5 legal revision flashcards in raw valid JSON.

TARGET CATEGORY: ${category}
LANGUAGE FOCUS: ${isZh ? 'Traditional Chinese (HK Real Estate Terminology)' : 'English'}

CRITICAL SPEED RULES:
1. Return ONLY raw valid JSON array. NO markdown backticks, NO intro/outro text.
2. Explanations (backZh/backEn) MUST be 1-2 concise sentences citing exact Cap. section (e.g. Cap. 511 s.40, Cap. 7 Part IVA, Cap. 123 s.24).

JSON Schema per item:
[
  {
    "id": number,
    "category": "${category}",
    "topicZh": "string",
    "topicEn": "string",
    "frontZh": "string",
    "frontEn": "string",
    "backZh": "string",
    "backEn": "string",
    "statuteRef": "string"
  }
]`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'https://agentpass-web-eight.vercel.app',
        'X-Title': 'AgentPass Ultra-Fast Flashcards',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.2,
        max_tokens: 800, // Capped for sub-5 second response time
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 5 flashcards for ${category} in JSON now.` }
        ]
      })
    });

    if (!response.ok) {
      const errTxt = await response.text();
      console.error('OpenRouter Flashcards Error:', errTxt);
      return NextResponse.json({ error: `OpenRouter error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '[]';
    const cleanJson = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();

    let cards = [];
    try {
      cards = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('JSON Parse error on flashcards:', rawContent);
      return NextResponse.json({ error: 'Failed to parse JSON response from LLM' }, { status: 500 });
    }

    const sanitized = cards.map((c: any, idx: number) => ({
      id: c.id || Date.now() + idx,
      category: c.category || category,
      topicZh: c.topicZh || c.topicEn || '法規考點',
      topicEn: c.topicEn || c.topicZh || 'Statutory Topic',
      frontZh: c.frontZh || c.frontEn || '問題載入中',
      frontEn: c.frontEn || c.frontZh || 'Question Loading',
      backZh: c.backZh || c.backEn || '依據地產代理條例規定。',
      backEn: c.backEn || c.backZh || 'According to Estate Agents Ordinance.',
      statuteRef: c.statuteRef || 'Cap. 511'
    }));

    return NextResponse.json({ cards: sanitized }, { status: 200 });

  } catch (error: any) {
    console.error('Generate Flashcards Catch Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}