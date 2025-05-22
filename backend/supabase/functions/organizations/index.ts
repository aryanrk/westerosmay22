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
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();
    
    // Get user info
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get organizations the user belongs to
    if (req.method === 'GET' && path === 'list') {
      const { data: orgs, error: orgsError } = await supabase
        .from('organizations')
        .select(`
          *,
          organization_members!inner (
            user_id,
            role
          )
        `)
        .eq('organization_members.user_id', user.id);
        
      if (orgsError) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch organizations', details: orgsError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ organizations: orgs }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Create a new organization
    if (req.method === 'POST' && path === 'create') {
      const { name } = await req.json();
      
      if (!name) {
        return new Response(
          JSON.stringify({ error: 'Organization name is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Create organization
      const { data: org, error: createError } = await supabase
        .from('organizations')
        .insert({
          name,
          created_by: user.id,
          subscription_tier: 'free', // Default tier
          subscription_status: 'active'
        })
        .select()
        .single();
        
      if (createError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create organization', details: createError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Add user as admin
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: org.id,
          user_id: user.id,
          role: 'admin'
        });
        
      if (memberError) {
        // Roll back if adding member fails
        await supabase
          .from('organizations')
          .delete()
          .eq('id', org.id);
          
        return new Response(
          JSON.stringify({ error: 'Failed to add user to organization', details: memberError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ organization: org }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Add member to organization
    if (req.method === 'POST' && path === 'members') {
      const { organization_id, email, role } = await req.json();
      
      if (!organization_id || !email || !role) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Check if user has admin access
      const { data: membership, error: membershipError } = await supabase
        .from('organization_members')
        .select('role')
        .eq('organization_id', organization_id)
        .eq('user_id', user.id)
        .single();
        
      if (membershipError || !membership || membership.role !== 'admin') {
        return new Response(
          JSON.stringify({ error: 'Unauthorized - must be an admin' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Find user by email
      const { data: targetUser, error: targetUserError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
        
      if (targetUserError || !targetUser) {
        return new Response(
          JSON.stringify({ error: 'User not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Add member
      const { data: newMember, error: addError } = await supabase
        .from('organization_members')
        .insert({
          organization_id,
          user_id: targetUser.id,
          role
        })
        .select()
        .single();
        
      if (addError) {
        return new Response(
          JSON.stringify({ error: 'Failed to add member', details: addError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ member: newMember }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 