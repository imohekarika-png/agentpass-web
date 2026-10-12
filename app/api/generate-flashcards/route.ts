// app/api/generate-flashcards/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { category = 'Cap. 511', count = 5, language = 'ZH' } = await req.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = `You are the official AgentPass™ Flashcard Engine. Generate exactly ${count} high-frequency legal revision flashcards for the Hong Kong Estate Agents Authority (EAA) EAQE/SQE licensing exam.

Target Category: ${category}
Language Standard: High-quality bilingual (Traditional Chinese and English).

CRITICAL REQUIREMENTS:
1. Return ONLY a valid raw JSON array of objects. NO markdown code block wrappers (no \`\`\`json).
2. Explanations/Back of cards MUST cite official statute references (e.g., Cap. 511 s.40, Cap. 7 Part IVA, Cap. 123 s.24).

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
        'X-Title': 'AgentPass Flashcard Generator',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.3,
        max_tokens: 1800,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate ${count} flashcards for ${category} now.` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '[]';
    const cleanJson = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();
    const cards = JSON.parse(cleanJson);

    return NextResponse.json({ cards }, { status: 200 });

  } catch (error: any) {
    console.error('Flashcard Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards.' }, { status: 500 });
  }
}