import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseClient } from '../_shared/supabase.ts';

const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY') || '';
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const supabase = createSupabaseClient(req);
    const { agent_id, message, conversation_id, project_id } = await req.json();
    
    if (!agent_id || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get agent from database
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agent_id)
      .single();

    if (agentError || !agent) {
      return new Response(
        JSON.stringify({ error: 'Agent not found', details: agentError }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if this is a new conversation or continuing an existing one
    let convoId = conversation_id;
    let messageHistory = [];
    
    if (convoId) {
      // Get existing conversation
      const { data: conversation, error: convoError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', convoId)
        .single();

      if (convoError || !conversation) {
        return new Response(
          JSON.stringify({ error: 'Conversation not found', details: convoError }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      messageHistory = conversation.transcript || [];
    } else {
      // Create new conversation
      const { data: newConversation, error: createError } = await supabase
        .from('conversations')
        .insert({
          agent_id,
          project_id,
          status: 'ongoing',
          transcript: []
        })
        .select()
        .single();

      if (createError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create conversation', details: createError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      convoId = newConversation.id;
    }

    // Add user message to history
    messageHistory.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });

    // Get project-specific documents if needed
    // const { data: projectDocs } = await supabase
    //   .from('document_chunks')
    //   .select('content')
    //   .eq('document.project_id', project_id)
    //   .limit(10);

    // Call ElevenLabs API to get response
    const elevenLabsResponse = await fetch(`${ELEVENLABS_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: message,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!elevenLabsResponse.ok) {
      const errorData = await elevenLabsResponse.json();
      return new Response(
        JSON.stringify({ error: 'ElevenLabs API error', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await elevenLabsResponse.json();
    
    // Add AI response to history
    messageHistory.push({
      role: 'assistant',
      content: aiResponse.text,
      timestamp: new Date().toISOString()
    });

    // Update conversation with new messages
    const { error: updateError } = await supabase
      .from('conversations')
      .update({
        transcript: messageHistory,
        updated_at: new Date().toISOString()
      })
      .eq('id', convoId);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update conversation', details: updateError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if we have lead info and save it
    if (aiResponse.extracted_data?.name || aiResponse.extracted_data?.email || aiResponse.extracted_data?.phone) {
      const { error: leadError } = await supabase
        .from('leads')
        .upsert({
          name: aiResponse.extracted_data.name,
          email: aiResponse.extracted_data.email,
          phone: aiResponse.extracted_data.phone,
          project_id: project_id,
          conversation_id: convoId,
          metadata: aiResponse.extracted_data
        });

      if (leadError) {
        console.error('Failed to save lead data:', leadError);
      }
    }

    return new Response(
      JSON.stringify({
        id: convoId,
        response: aiResponse.text,
        audio_url: aiResponse.audio_url || null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 