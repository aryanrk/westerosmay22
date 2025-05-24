import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// For demo purposes, using the API key directly
const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY') || 'sk_7cf13b2dd39d6f278b39c1fd98dff6d3249b66374e7696c4';
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = req.headers.get('apikey') || Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { name, project_id, organization_id, system_prompt, voice_id } = await req.json();
    
    if (!name || !organization_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name and organization_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Create ElevenLabs conversational agent with proper name field
    const elevenLabsPayload = {
      name: name,  // This is the key fix - passing the name at the top level
      conversation_config: {
        agent: {
          prompt: {
            prompt: system_prompt || `You are ${name}, a helpful AI assistant for real estate inquiries. You help potential buyers and renters with property information, scheduling viewings, and answering questions about available properties. Be friendly, professional, and knowledgeable about real estate.`
          },
          first_message: `Hi! I'm ${name}, your AI assistant. How can I help you with your real estate needs today?`
        }
      }
    };
    
    console.log('Creating ElevenLabs agent with payload:', JSON.stringify(elevenLabsPayload, null, 2));
    
    const elevenLabsResponse = await fetch(`${ELEVENLABS_API_URL}/convai/agents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify(elevenLabsPayload)
    });
    
    if (!elevenLabsResponse.ok) {
      const errorData = await elevenLabsResponse.text();
      console.error('ElevenLabs API error:', errorData);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create ElevenLabs agent', 
          details: errorData,
          status: elevenLabsResponse.status
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const elevenLabsAgent = await elevenLabsResponse.json();
    console.log('ElevenLabs agent created:', elevenLabsAgent);
    
    // Create agent record in our database
    const { data: agent, error: createError } = await supabase
      .from('agents')
      .insert({
        name,
        project_id,
        organization_id,
        eleven_labs_agent_id: elevenLabsAgent.agent_id,
        voice_id: voice_id || '21m00Tcm4TlvDq8ikWAM',
        system_prompt: system_prompt || `You are ${name}, a helpful AI assistant for real estate inquiries.`,
        status: 'active',
        configuration: {
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          },
          eleven_labs_config: elevenLabsPayload
        }
      })
      .select()
      .single();
      
    if (createError) {
      console.error('Database error:', createError);
      return new Response(
        JSON.stringify({ error: 'Failed to create agent in database', details: createError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        agent: agent,
        eleven_labs_agent_id: elevenLabsAgent.agent_id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating agent:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 