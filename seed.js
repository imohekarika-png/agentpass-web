// seed.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Fetch credentials securely from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local file.');
  process.exit(1);
}

// Initialize Supabase admin client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log('🌱 Starting database seed script...');

  try {
    // Example: Seeding sample EAQE/SQE question data
    const sampleQuestions = [
      {
        question_zh: '根據《地產代理條例》(第511章)，持牌地產代理在收取佣金時須遵從甚麼規定？',
        question_en: 'Under the Estate Agents Ordinance (Cap. 511), what requirements must a licensed estate agent follow regarding commission?',
        category: 'Cap. 511 Ordinance',
      },
    ];

    // Replace 'questions' with your actual table name if different
    const { data, error } = await supabase.from('questions').upsert(sampleQuestions);

    if (error) {
      throw error;
    }

    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
  }
}

seedDatabase();