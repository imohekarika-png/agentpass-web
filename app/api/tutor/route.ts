// app/api/tutor/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Flexible extraction of user query
    let query = body.query || body.message || '';
    if (!query && Array.isArray(body.messages) && body.messages.length > 0) {
      const lastMsg = body.messages[body.messages.length - 1];
      query = lastMsg.content || '';
    }

    const language = body.locale || body.language || 'ZH';
    const isZh = !language || language.toString().toUpperCase().includes('ZH');

    if (!query.trim()) {
      return NextResponse.json({ reply: isZh ? '請輸入您的問題。' : 'Please ask a question.' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json({
        reply: isZh
          ? '⚠️ OPENROUTER_API_KEY 未設定，請於 Vercel 環境變數中設定該 Key。'
          : '⚠️ OPENROUTER_API_KEY is missing. Please configure it in Vercel Environment Variables.'
      });
    }

    const systemPrompt = `You are the official AgentPass™ AI Tutor, an authority on Hong Kong Estate Agents Authority (EAA) licensing examinations (EAQE - Estate Agent's Licence, and SQE - Salesperson's Licence).

Core Statutory Knowledge Base:
1. Estate Agents Ordinance (Cap. 511) & Subsidiary Legislation (Cap. 511A - Cap. 511E):
   - Notice of address change must be served to EAA in writing within 30 days (Cap. 511 s.40).
   - Prescribed Forms (Forms 3 through 6): All essential terms (including commission rate, terms of payment, and validity period) MUST be fully completed prior to signing.
2. Licence Validity & EAA Statutory Renewal Fee Schedule:
   - Licences are granted for either 12 months (1 year) or 24 months (2 years).
   - Renewal applications must be submitted no later than 1 month before expiry (and no earlier than 3 months).
   - Individual Estate Agent's Licence: HK$2,010 (12 months) / HK$3,620 (24 months)
   - Salesperson's Licence: HK$1,280 (12 months) / HK$2,300 (24 months)
3. Landlord and Tenant (Consolidation) Ordinance (Cap. 7):
   - Part IVA regulated tenancies provide a 4-year security of tenure (2+2 years right of renewal).

Instructions:
- Provide accurate, well-structured, and concise responses formatted with markdown bullet points.
- Language preference: ${isZh ? 'Traditional Chinese (Hong Kong real estate terminology)' : 'English'}.`;

    // OpenRouter completion call with Llama 3.3 70B Instruct
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'https://agentpass-web-eight.vercel.app',
        'X-Title': 'AgentPass HK EAA AI Tutor',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter Llama 3.3 Error:', errText);
      return NextResponse.json({
        reply: isZh
          ? '無法連接至 OpenRouter AI 服務，請稍後重試。'
          : 'Failed to communicate with OpenRouter AI service.'
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || (isZh ? '無法取得 AI 回覆。' : 'No response generated.');

    return NextResponse.json({ reply, text: reply, answer: reply }, { status: 200 });

  } catch (error) {
    console.error('OpenRouter Tutor Route Error:', error);
    return NextResponse.json({
      reply: 'An error occurred while processing your request via OpenRouter.'
    }, { status: 200 });
  }
}