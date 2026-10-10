// app/api/tutor/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query, language } = await req.json();

    const isZh = !language || language.toString().toUpperCase().includes('ZH');

    // Ordinance knowledge response helper
    let reply = isZh 
      ? `【AgentPass AI 導師】根據香港《地產代理條例》(Cap. 511) 及《業主與租客(綜合)條例》(Cap. 7)：\n\n您提及的查詢「${query}」涉及監管核心守則。持牌人在處理此類事項時，務必確保資料填妥及遵循 EAA 執業通告。`
      : `[AgentPass AI Tutor] According to Cap. 511 and Cap. 7 of the Laws of Hong Kong regarding query "${query}":\n\nLicensees must comply strictly with the EAA Practice Circulars and ensure statutory forms are fully completed.`;

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI Tutor query.' }, { status: 500 });
  }
}