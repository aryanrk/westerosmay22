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
    
    const { name, project_id, organization_id, system_prompt, first_message, voice_id, files } = await req.json();
    
    console.log('🎯 RECEIVED DATA:', {
      name,
      project_id,
      organization_id,
      voice_id,
      files_count: files?.length || 0,
      system_prompt: system_prompt?.substring(0, 100) + '...',
      first_message: first_message?.substring(0, 50) + '...'
    });
    
    console.log('🎤 VOICE DEBUGGING:', {
      received_voice_id: voice_id,
      fallback_voice_id: '21m00Tcm4TlvDq8ikWAM',
      final_voice_id: voice_id || '21m00Tcm4TlvDq8ikWAM'
    });
    
    if (!name || !organization_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name and organization_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Create ElevenLabs conversational agent with proper configuration including voice_id
    const elevenLabsPayload = {
      name: name,
      conversation_config: {
        agent: {
          prompt: {
            prompt: system_prompt || `You are ${name}, a helpful AI assistant for real estate inquiries. You help potential buyers and renters with property information, scheduling viewings, and answering questions about available properties. Be friendly, professional, and knowledgeable about real estate.`
          },
          first_message: first_message || `Hi! I'm ${name}, your AI assistant. How can I help you with your real estate needs today?`
        },
        tts: {
          voice_id: voice_id || '21m00Tcm4TlvDq8ikWAM', // Set the voice ID here
          model_id: 'eleven_turbo_v2_5',
          stability: 0.5,
          similarity_boost: 0.75
        }
      }
    };
    
    console.log('🚀 CREATING ELEVENLABS AGENT with voice_id:', voice_id);
    console.log('📤 ElevenLabs payload:', JSON.stringify(elevenLabsPayload, null, 2));
    
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
      console.error('❌ ElevenLabs API error:', errorData);
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
    console.log('✅ ElevenLabs agent created:', {
      agent_id: elevenLabsAgent.agent_id,
      name: elevenLabsAgent.name
    });
    
    let knowledgeBaseItems = [];
    
    // Upload files to ElevenLabs knowledge base if provided
    if (files && files.length > 0) {
      console.log(`📁 Uploading ${files.length} files to ElevenLabs knowledge base...`);
      
      for (const fileData of files) {
        try {
          console.log(`📄 Processing file: ${fileData.name} (${fileData.type}, ${fileData.size} bytes)`);
          
          // Convert base64 to blob if needed (files should be passed as base64 from frontend)
          const formData = new FormData();
          
          if (fileData.content) {
            // File content is base64 encoded
            const byteCharacters = atob(fileData.content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: fileData.type || 'application/octet-stream' });
            formData.append('file', blob, fileData.name);
          }
          
          formData.append('name', fileData.name);
          
          console.log(`🔄 Uploading to ${ELEVENLABS_API_URL}/convai/knowledge-base...`);
          
          const uploadResponse = await fetch(`${ELEVENLABS_API_URL}/convai/knowledge-base`, {
            method: 'POST',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY
            },
            body: formData
          });
          
          console.log(`📡 Upload response status: ${uploadResponse.status}`);
          console.log(`📡 Upload response headers:`, Object.fromEntries(uploadResponse.headers.entries()));
          
          if (uploadResponse.ok) {
            const knowledgeItem = await uploadResponse.json();
            console.log(`✅ Knowledge base response:`, knowledgeItem);
            
            // The response might have different ID fields
            const documentId = knowledgeItem.document_id || knowledgeItem.id;
            if (documentId) {
              knowledgeBaseItems.push(documentId);
              console.log(`✅ Successfully uploaded file: ${fileData.name}, ID: ${documentId}`);
            } else {
              console.warn(`⚠️ No document ID returned for ${fileData.name}:`, knowledgeItem);
            }
          } else {
            const errorData = await uploadResponse.text();
            console.error(`❌ Failed to upload file ${fileData.name}:`, errorData);
          }
        } catch (uploadError) {
          console.error(`💥 Error uploading file ${fileData.name}:`, uploadError);
        }
      }
      
      // Update agent with knowledge base items if any were uploaded
      if (knowledgeBaseItems.length > 0) {
        console.log('🔄 Updating agent with knowledge base items...', knowledgeBaseItems);
        
        const updatePayload = {
          conversation_config: {
            ...elevenLabsPayload.conversation_config,
            agent: {
              ...elevenLabsPayload.conversation_config.agent,
              prompt: {
                ...elevenLabsPayload.conversation_config.agent.prompt,
                knowledge_base: knowledgeBaseItems
              }
            }
          }
        };
        
        console.log('📤 Agent update payload:', JSON.stringify(updatePayload, null, 2));
        
        const updateResponse = await fetch(`${ELEVENLABS_API_URL}/convai/agents/${elevenLabsAgent.agent_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY
          },
          body: JSON.stringify(updatePayload)
        });
        
        console.log(`🔄 Agent update response status: ${updateResponse.status}`);
        
        if (updateResponse.ok) {
          const updateResult = await updateResponse.json();
          console.log('✅ Successfully updated agent with knowledge base:', updateResult);
        } else {
          const errorData = await updateResponse.text();
          console.error('❌ Failed to update agent with knowledge base:', errorData);
        }
      }
    }
    
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
        first_message: first_message || `Hi! I'm ${name}, your AI assistant. How can I help you with your real estate needs today?`,
        status: 'active',
        configuration: {
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          },
          eleven_labs_config: elevenLabsPayload,
          knowledge_base_items: knowledgeBaseItems
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
        eleven_labs_agent_id: elevenLabsAgent.agent_id,
        knowledge_base_items: knowledgeBaseItems,
        files_uploaded: knowledgeBaseItems.length
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