// app/api/tutor/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Flexible extraction of query text
    let query = body.query || body.message || '';
    if (!query && Array.isArray(body.messages) && body.messages.length > 0) {
      const lastMsg = body.messages[body.messages.length - 1];
      query = lastMsg.content || '';
    }

    const language = body.locale || body.language || 'ZH';
    const isZh = !language || language.toString().toUpperCase().includes('ZH');

    // Ordinance Knowledge Lookup Simulation
    const reply = isZh
      ? `【AgentPass AI 導師】關於您查詢的「${query || '考規疑難'}」：\n\n根據香港《地產代理條例》(Cap. 511) 及 EAA 執業通告：\n1. **營業地址申報 (s.40)**：持牌地產代理若更換主要營業地址，必須於 30 天內以書面形式通知地產代理監管局。\n2. **地產代理協議 (Form 3 - Form 6)**：所有必要條款（包括佣金金額與支付條件）均須於簽署前完整填妥，否則屬違規行為。\n3. **雙重代理 (Dual Agency)**：代理如同時代表買賣雙方，必須事先向雙方作出書面披露並取得同意。`
      : `[AgentPass AI Tutor] Regarding your query on "${query || 'EAA Exam Rules'}":\n\nBased on Cap. 511 and EAA Guidelines:\n1. **Business Address Notice**: Licensees must notify EAA in writing within 30 days of changing principal business address.\n2. **Statutory Forms (Forms 3-6)**: Essential terms, including commission details, must be fully completed prior to execution.\n3. **Dual Agency**: Written disclosure and consent from both parties are legally required.`;

    return NextResponse.json({ reply, text: reply, answer: reply }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { reply: '發生錯誤，請稍後重試。 (API Error processing query)' },
      { status: 200 }
    );
  }
}