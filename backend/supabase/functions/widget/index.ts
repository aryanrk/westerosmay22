import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseClient } from '../_shared/supabase.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const supabase = createSupabaseClient(req);
    
    // Get widget_id from URL
    const url = new URL(req.url);
    const widgetId = url.searchParams.get('widget_id');
    
    if (!widgetId) {
      return new Response(
        JSON.stringify({ error: 'Widget ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get widget details
    const { data: widget, error: widgetError } = await supabase
      .from('widgets')
      .select(`
        *,
        agent:agent_id (
          name,
          system_prompt
        ),
        project:project_id (
          name
        )
      `)
      .eq('id', widgetId)
      .single();

    if (widgetError || !widget) {
      return new Response(
        JSON.stringify({ error: 'Widget not found', details: widgetError }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate widget HTML
    const widgetConfig = widget.configuration || {};
    const widgetHtml = `
    <div id="realvoice-widget" 
      data-widget-id="${widgetId}"
      data-agent-id="${widget.agent_id}"
      data-agent-name="${widget.agent?.name || 'AI Assistant'}"
      data-theme-primary="${widgetConfig.theme?.primaryColor || '#4f46e5'}"
      data-theme-text="${widgetConfig.theme?.textColor || '#ffffff'}"
      data-theme-bg="${widgetConfig.theme?.backgroundColor || '#ffffff'}"
      data-position="${widgetConfig.position || 'bottom-right'}"
      data-initial-message="${widgetConfig.initialMessage || 'Hello! How can I help you today?'}"
    ></div>
    <script src="${Deno.env.get('WIDGET_JS_URL') || 'https://yourapp.com/widget.js'}"></script>
    `;

    // Save embed code to widget record if it doesn't exist
    if (!widget.embed_code) {
      await supabase
        .from('widgets')
        .update({ embed_code: widgetHtml })
        .eq('id', widgetId);
    }

    // If request is for JS code, return the embed code
    if (url.searchParams.get('type') === 'code') {
      return new Response(
        JSON.stringify({ embed_code: widgetHtml }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Otherwise, return widget data and configuration
    return new Response(
      JSON.stringify({
        id: widget.id,
        name: widget.name,
        agent: widget.agent,
        project: widget.project,
        configuration: widget.configuration,
        embed_code: widgetHtml
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