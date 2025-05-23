const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testAPI() {
  console.log('Testing API client...');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Key:', supabaseKey ? '***' + supabaseKey.slice(-4) : 'MISSING');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing environment variables!');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    console.log('Fetching projects...');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('organization_id', '83d4f887-471d-4873-b419-dd3242d3c3bc')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('Projects found:', data.length);
      console.log('Projects:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('Catch error:', err);
  }
}

testAPI(); 