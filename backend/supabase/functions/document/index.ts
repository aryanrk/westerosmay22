import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseClient } from '../_shared/supabase.ts';

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
    const supabase = createSupabaseClient(req);
    const { project_id, name, file_path, file_type, file_size } = await req.json();
    
    if (!project_id || !name || !file_path) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Create document record
    const { data: document, error: createError } = await supabase
      .from('documents')
      .insert({
        project_id,
        name,
        file_path,
        file_type,
        file_size,
        status: 'processing'
      })
      .select()
      .single();
      
    if (createError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create document', details: createError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Simulate document processing (in real implementation, this would be a separate background job)
    // For the purpose of this example, we'll just update the status
    setTimeout(async () => {
      try {
        // Create sample chunks
        const chunks = [
          {
            document_id: document.id,
            content: `Sample content from ${name} - page 1`,
            metadata: { page: 1 }
          },
          {
            document_id: document.id,
            content: `Sample content from ${name} - page 2`,
            metadata: { page: 2 }
          }
        ];
        
        // Insert chunks
        const { error: chunksError } = await supabase
          .from('document_chunks')
          .insert(chunks);
          
        if (chunksError) {
          console.error('Failed to create document chunks:', chunksError);
        }
        
        // Update document status
        await supabase
          .from('documents')
          .update({ status: 'ready' })
          .eq('id', document.id);
      } catch (err) {
        console.error('Error processing document:', err);
        
        await supabase
          .from('documents')
          .update({ status: 'error' })
          .eq('id', document.id);
      }
    }, 2000);
    
    return new Response(
      JSON.stringify({
        id: document.id,
        name: document.name,
        status: document.status,
        message: 'Document processing started'
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