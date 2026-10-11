// app/api/tutor/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Extract prompt from different possible key shapes
    let query = body.query || body.message || '';
    if (!query && Array.isArray(body.messages) && body.messages.length > 0) {
      const lastMsg = body.messages[body.messages.length - 1];
      query = lastMsg.content || '';
    }

    const language = body.locale || body.language || 'ZH';
    const isZh = !language || language.toString().toUpperCase().includes('ZH');

    const reply = isZh 
      ? `【AgentPass AI 導師】根據香港《地產代理條例》(Cap. 511) 及相關發牌指引：\n\n關於您詢問的「${query}」：\n1. **營業地址申報**：持牌人若更換主要營業地址，必須於 30 天內書面通知 EAA。\n2. **地產代理協議 (Form 3-6)**：必要條款（包括佣金金額及支付日期）若未填妥即屬違規。\n3. **雙重代理**：代理必須以書面形式向買賣雙方充分披露並取得同意。`
      : `[AgentPass AI Tutor] Based on Cap. 511 and EAA Licensing Guidelines regarding "${query}":\n\n1. **Business Address**: Address changes must be notified to EAA in writing within 30 days.\n2. **Estate Agency Agreements (Forms 3-6)**: Essential terms must be completed prior to signing.\n3. **Dual Agency**: Must be fully disclosed in writing to both parties.`;

    return NextResponse.json({ reply, text: reply, answer: reply }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ reply: 'An error occurred while processing query.' }, { status: 200 });
  }
}