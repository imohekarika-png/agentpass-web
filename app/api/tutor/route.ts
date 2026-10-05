// app/api/tutor/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Configure OpenAI SDK to route requests through OpenRouter
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://agentpass-web.vercel.app',
    'X-Title': 'AgentPass',
  },
});

export async function POST(req: Request) {
  const cookieStore = await cookies();
  
  // Verify Supabase user session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages, locale } = await req.json();

  const systemPrompt = locale === 'zh-HK'
    ? `你是 AgentPass AI 導師，專為香港地產代理資格考試 (EAQE) 及營業員資格考試 (SQE) 考生提供輔導。
       請依據《地產代理條例》(第511章) 及地產代理監管局 (EAA) 指引回答問題。保持答案精準、專業且易於理解。`
    : `You are the AgentPass AI Tutor for Hong Kong EAQE and SQE licensing exams.
       Provide guidance grounded in the Estate Agents Ordinance (Cap. 511) and EAA regulatory guidelines. Keep responses precise, clear, and professional.`;

  const result = streamText({
    // Use OpenRouter model slug (e.g. openai/gpt-4o-mini or anthropic/claude-3.5-sonnet)
    model: openrouter('openai/gpt-4o-mini'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
