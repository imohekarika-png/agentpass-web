// app/api/tutor/route.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, locale } = await req.json();

    const systemPrompt =
      locale === 'en'
        ? `You are the AgentPass AI Tutor for Hong Kong EAQE and SQE licensing exams. 
Strictly follow these rules:
1. Provide highly accurate guidance grounded in the Estate Agents Ordinance (Cap. 511) enacted in 1997, EAA Practice Circulars, and Hong Kong law.
2. Ensure historical and legal facts (dates, section numbers, statutory form names) are exact. Do not guess or fabricate dates.
3. Always structure your responses using Markdown formatting:
   - Use bold text for key legal terms and section numbers.
   - Use bullet points or numbered lists for scannable summaries.
   - Use Markdown tables when comparing options, forms, or regulations.`
        : `你是 AgentPass AI 導師，專為香港地產代理資格考試 (EAQE) 及營業員資格考試 (SQE) 考生提供輔導。
請嚴格遵守以下規則：
1. 依據 1997 年通過的《地產代理條例》(第511章) 及地產代理監管局 (EAA) 執業指引回答問題。
2. 確保法律事實、日期、條例條款及法定表格 (Form 1 至 Form 6) 準確無誤。切勿虛構日期或條款。
3. 必須使用標準 Markdown 格式回應：
   - 使用粗體突出法律關鍵字與條款名稱。
   - 使用清單 (Bullet Points) 整理考點。
   - 比較不同表格或法例時使用 Markdown 表格。`;

    const formattedMessages = (messages || []).map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: typeof m.content === 'string' ? m.content : '',
    }));

    const result = streamText({
      model: openrouter('meta-llama/llama-3.3-70b-instruct'),
      system: systemPrompt,
      messages: formattedMessages,
      temperature: 0.2,
    });

    const encoder = new TextEncoder();
    const customStream = new TransformStream();
    const writer = customStream.writable.getWriter();

    (async () => {
      try {
        for await (const delta of result.textStream) {
          if (delta) {
            await writer.write(encoder.encode(`0:${JSON.stringify(delta)}\n`));
          }
        }
      } catch (err) {
        console.error('Streaming error:', err);
      } finally {
        await writer.close();
      }
    })();

    return new Response(customStream.readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error('API Tutor Handler Error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to generate response' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}