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

FORMATTING INSTRUCTIONS (MANDATORY):
You MUST format EVERY response using strict Markdown structure:
- Use section headers (### Header Title) to organize topics.
- Use bold text (**important term**) for key legal terms, Ordinance section numbers, dates (Cap. 511 enacted in 1997), and statutory form names (Form 1 to Form 6).
- Use bullet points (- point) or numbered lists (1. step) for multi-item lists.
- Use Markdown tables when comparing options or forms.

CONTENT ACCURACY RULES:
1. Provide highly accurate guidance grounded in the Estate Agents Ordinance (Cap. 511) enacted in 1997, EAA Practice Circulars, and Hong Kong law.
2. Ensure legal facts, section numbers, and statutory forms are exact. Never guess or hallucinate facts.`
        : `你是 AgentPass AI 導師，專為香港地產代理資格考試 (EAQE) 及營業員資格考試 (SQE) 考生提供輔導。

格式規則（必須嚴格遵守）：
你必須在每個回答中使用標準 Markdown 結構：
- 使用小標題 (### 標題名稱) 結構化內容。
- 使用粗體 (**關鍵詞**) 標示法律術語、條例編號、年份（第511章於 1997 年通過）及法定表格名稱 (Form 1 至 Form 6)。
- 使用點陣清單 (- 項目) 或數字清單整理考點。
- 比較概念時必須使用 Markdown 表格。

內容規則：
1. 依據 1997 年通過的《地產代理條例》(第511章) 及地產代理監管局 (EAA) 執業指引回答問題。
2. 確保法律事實、條文編號及法定表格準確無誤，切勿虛構日期或內容。`;

    const formattedMessages = (messages || []).map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: typeof m.content === 'string' ? m.content : '',
    }));

    const result = streamText({
      model: openrouter('meta-llama/llama-3.3-70b-instruct'),
      system: systemPrompt,
      messages: formattedMessages,
      temperature: 0.2,
      topP: 0.9,
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