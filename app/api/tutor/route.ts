// app/api/tutor/route.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, locale } = await req.json();

    const systemPrompt = locale === 'zh-HK'
      ? `你是 AgentPass AI 導師，專為香港地產代理資格考試 (EAQE) 及營業員資格考試 (SQE) 考生提供輔導。
         請依據《地產代理條例》(第511章) 及地產代理監管局 (EAA) 指引回答問題。保持答案精準、專業且易於理解。`
      : `You are the AgentPass AI Tutor for Hong Kong EAQE and SQE licensing exams.
         Provide guidance grounded in the Estate Agents Ordinance (Cap. 511) and EAA regulatory guidelines. Keep responses precise, clear, and professional.`;

    const result = streamText({
      // Use Meta Llama 3.3 70B Instruct (supported on restricted OpenRouter accounts)
      model: openrouter('meta-llama/llama-3.3-70b-instruct'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('API Tutor Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process AI request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}