'use client';

import { useEffect, useState } from 'react';
import Flashcard from '../components/Flashcard';
import Auth from '../components/Auth';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [session, setSession] = useState(null);
  const [liveQuestion, setLiveQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchQuestion();
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchQuestion();
    });

    return () => subscription.unsubscribe();
  }, []);

  // 💥 THE UPDATED SMART FETCH FUNCTION 💥
  const fetchQuestion = async () => {
    setLoading(true);
    
    // We safely grab the current user ID
    const { data: authData } = await supabase.auth.getSession();
    const userId = authData.session?.user?.id;

    if (!userId) return;

    // Call our new custom SQL function!
    const { data, error } = await supabase.rpc('get_next_question', { p_user_id: userId });

    if (error) {
      console.error("Failed to fetch question:", error);
    } else if (data && data.length > 0) {
      setLiveQuestion(data[0]); // Serve the adaptive question
    } else {
      setLiveQuestion('DONE'); // They finished everything!
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLiveQuestion(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-12">
      
      <div className="w-full max-w-3xl flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">AgentPass 地產考牌通</h1>
          <p className="text-gray-500">
            {session ? `Logged in as ${session.user.email}` : 'Please log in to study'}
          </p>
        </div>
        
        {session && (
          <button 
            onClick={handleLogout}
            className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
          >
            Log Out
          </button>
        )}
      </div>
      
      <div className="w-full max-w-3xl">
        {loading ? (
          <div className="text-center text-gray-500 animate-pulse">Loading...</div>
        ) : !session ? (
          <Auth onLogin={() => {}} />
        ) : liveQuestion === 'DONE' ? (
          // 💥 THE NEW "ALL CAUGHT UP" SCREEN 💥
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 You're all caught up!</h2>
            <p className="text-gray-500 mb-6">No more questions due for review today.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Check Again
            </button>
          </div>
        ) : liveQuestion ? (
          <Flashcard key={liveQuestion.id} questionData={liveQuestion} user={session.user} onNext={fetchQuestion} />
        ) : (
          <div className="text-center text-red-500">Failed to load question.</div>
        )}
      </div>
    </main>
  );
}