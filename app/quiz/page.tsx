// app/quiz/page.tsx
import { createClient } from '@supabase/supabase-js';
import QuizRunner from '@/components/QuizRunner';

export const revalidate = 0; // Disable static caching so fresh data is loaded

export default async function QuizPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
        <h3 className="font-bold text-lg mb-2">Environment Variables Not Loaded</h3>
        <p className="text-sm">
          Please make sure your <code className="bg-red-100 px-1 py-0.5 rounded font-mono">.env.local</code> file is saved correctly in the project root and restart your dev server.
        </p>
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .order('id', { ascending: true })
    .limit(20);

  if (error || !questions) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load questions from Supabase: {error?.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <QuizRunner questions={questions} />
    </main>
  );
}