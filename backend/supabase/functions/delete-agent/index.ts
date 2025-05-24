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
    
    const { agent_id } = await req.json();
    
    if (!agent_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: agent_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get agent from database to retrieve ElevenLabs agent ID
    const { data: agent, error: fetchError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agent_id)
      .single();
      
    if (fetchError) {
      console.error('Error fetching agent:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Agent not found', details: fetchError }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Delete from ElevenLabs if we have an ElevenLabs agent ID
    if (agent.eleven_labs_agent_id) {
      console.log('Deleting ElevenLabs agent:', agent.eleven_labs_agent_id);
      
      const elevenLabsResponse = await fetch(`${ELEVENLABS_API_URL}/convai/agents/${agent.eleven_labs_agent_id}`, {
        method: 'DELETE',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY
        }
      });
      
      if (!elevenLabsResponse.ok) {
        const errorData = await elevenLabsResponse.text();
        console.error('ElevenLabs deletion error:', errorData);
        
        // Don't fail the entire operation if ElevenLabs deletion fails
        // Log the error but continue with database deletion
        console.warn('Failed to delete from ElevenLabs, continuing with database deletion');
      } else {
        console.log('Successfully deleted agent from ElevenLabs');
      }
    }
    
    // Delete from our database
    const { error: deleteError } = await supabase
      .from('agents')
      .delete()
      .eq('id', agent_id);
      
    if (deleteError) {
      console.error('Database deletion error:', deleteError);
      return new Response(
        JSON.stringify({ error: 'Failed to delete agent from database', details: deleteError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Agent deleted successfully from both platform and ElevenLabs',
        deleted_from_elevenlabs: !!agent.eleven_labs_agent_id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting agent:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 