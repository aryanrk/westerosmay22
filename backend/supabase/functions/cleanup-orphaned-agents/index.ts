import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

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
    console.log('Starting cleanup of orphaned ElevenLabs agents...');
    
    // Get all agents from ElevenLabs
    const elevenLabsResponse = await fetch(`${ELEVENLABS_API_URL}/convai/agents`, {
      method: 'GET',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY
      }
    });
    
    if (!elevenLabsResponse.ok) {
      const errorData = await elevenLabsResponse.text();
      console.error('Failed to fetch ElevenLabs agents:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch ElevenLabs agents', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const elevenLabsData = await elevenLabsResponse.json();
    const elevenLabsAgents = elevenLabsData.agents || [];
    
    console.log(`Found ${elevenLabsAgents.length} agents on ElevenLabs`);
    
    const deletedAgents = [];
    const errors = [];
    
    // Delete each agent from ElevenLabs
    for (const agent of elevenLabsAgents) {
      try {
        console.log(`Deleting agent ${agent.agent_id} (${agent.name}) from ElevenLabs...`);
        
        const deleteResponse = await fetch(`${ELEVENLABS_API_URL}/convai/agents/${agent.agent_id}`, {
          method: 'DELETE',
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY
          }
        });
        
        if (deleteResponse.ok) {
          deletedAgents.push({
            agent_id: agent.agent_id,
            name: agent.name,
            status: 'deleted'
          });
          console.log(`Successfully deleted agent ${agent.agent_id}`);
        } else {
          const errorData = await deleteResponse.text();
          errors.push({
            agent_id: agent.agent_id,
            name: agent.name,
            error: errorData
          });
          console.error(`Failed to delete agent ${agent.agent_id}:`, errorData);
        }
      } catch (error) {
        errors.push({
          agent_id: agent.agent_id,
          name: agent.name,
          error: error.message
        });
        console.error(`Error deleting agent ${agent.agent_id}:`, error);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Cleanup completed',
        deleted_count: deletedAgents.length,
        error_count: errors.length,
        deleted_agents: deletedAgents,
        errors: errors
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during cleanup:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 