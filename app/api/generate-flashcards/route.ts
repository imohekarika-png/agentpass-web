// app/api/generate-flashcards/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { category = 'Cap. 511', language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY is not configured.' }, { status: 500 });
    }

    const langStr = (language || 'ZH').toString().toUpperCase();
    const isZh = langStr.includes('ZH') || langStr.includes('HK') || langStr.includes('CN');

    const systemPrompt = `You are AgentPass Fast Flashcards. Return EXACTLY 3 short legal flashcards in raw JSON.
CATEGORY: ${category}
LANG: ${isZh ? 'Traditional Chinese' : 'English'}

JSON Schema ONLY:
[
  {
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

    // Controller to enforce strict server-side 8s timeout to OpenRouter
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'https://agentpass-web-eight.vercel.app',
        'X-Title': 'AgentPass Fast Flashcards',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.1,
        max_tokens: 500,
        // FORCE high-throughput providers to bypass OpenRouter queues
        provider: {
          order: ['Fireworks', 'Together', 'DeepInfra'],
          allow_fallbacks: false
        },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 3 cards for ${category} now.` }
        ]
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ error: `OpenRouter returned status ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '[]';
    const cleanJson = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();

    const cards = JSON.parse(cleanJson);

    const sanitized = cards.map((c: any, idx: number) => ({
      id: Date.now() + idx,
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
    console.error('Generate Flashcards Error:', error);
    return NextResponse.json({ error: error.message || 'Timeout/Server error' }, { status: 500 });
  }
}