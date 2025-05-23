import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types
export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
};

export type Organization = {
  id: string;
  name: string;
  subscription_tier: string;
  subscription_status: string;
  created_at: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  status: string;
  organization_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type Agent = {
  id: string;
  name: string;
  project_id?: string;
  organization_id: string;
  eleven_labs_agent_id?: string;
  voice_id?: string;
  system_prompt?: string;
  status: string;
  configuration: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type Document = {
  id: string;
  name: string;
  project_id?: string;
  organization_id: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Conversation = {
  id: string;
  agent_id?: string;
  organization_id: string;
  status: string;
  duration?: number;
  recording_url?: string;
  transcript: Array<{
    role: string;
    content: string;
    timestamp: string;
  }>;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  project_id?: string;
  organization_id: string;
  conversation_id?: string;
  status: string;
  notes?: string;
  assigned_to?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type Widget = {
  id: string;
  name: string;
  project_id?: string;
  organization_id: string;
  agent_id?: string;
  configuration: {
    theme?: {
      primaryColor?: string;
      textColor?: string;
      backgroundColor?: string;
    };
    position?: string;
    showAvatar?: boolean;
    displayName?: string;
    initialMessage?: string;
  };
  embed_code?: string;
  status: string;
  created_at: string;
  updated_at: string;
};

class API {
  private supabase: SupabaseClient;
  private apiUrl: string;
  
  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.apiUrl = supabaseUrl;
  }
  
  // Auth methods
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) throw error;
    return data;
  }
  
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }
  
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
  
  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser();
    
    if (error || !data.user) return null;
    
    const { data: profile } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    return {
      id: data.user.id,
      email: data.user.email || '',
      full_name: profile?.full_name,
      avatar_url: profile?.avatar_url,
    };
  }
  
  async updateProfile(profile: Partial<User>) {
    const { data: user } = await this.supabase.auth.getUser();
    
    if (!user.user) throw new Error('Not authenticated');
    
    const { data, error } = await this.supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.user.id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  // Organization methods
  async getOrganizations(): Promise<Organization[]> {
    const { data, error } = await this.supabase
      .functions.invoke('organizations', {
        body: { action: 'list' },
      });
      
    if (error) throw error;
    return data.organizations || [];
  }
  
  async createOrganization(name: string): Promise<Organization> {
    const { data, error } = await this.supabase
      .functions.invoke('organizations', {
        body: { action: 'create', name },
      });
      
    if (error) throw error;
    return data.organization;
  }
  
  // Project methods
  async getProjects(organizationId: string): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  }
  
  async getProject(id: string): Promise<Project> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async createProject(project: Partial<Project>): Promise<Project> {
    // Get the current user for user_id
    const { data: user } = await this.supabase.auth.getUser();
    
    // Use existing user ID as fallback for demo purposes
    const userId = user.user?.id || 'bc3c39ac-9207-4d06-b04b-079b2f97c82b';
    
    const projectWithUserId = {
      ...project,
      user_id: userId
    };
    
    const { data, error } = await this.supabase
      .from('projects')
      .insert(projectWithUserId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const { data, error } = await this.supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async deleteProject(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
  
  // Agent methods
  async getAgents(organizationId: string): Promise<Agent[]> {
    const { data, error } = await this.supabase
      .from('agents')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  }
  
  async getAgent(id: string): Promise<Agent> {
    const { data, error } = await this.supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async createAgent(agent: Partial<Agent>): Promise<Agent> {
    const { data, error } = await this.supabase
      .functions.invoke('create-agent', {
        body: agent,
      });
      
    if (error) throw error;
    return data.agent;
  }
  
  async updateAgent(id: string, agent: Partial<Agent>): Promise<Agent> {
    const { data, error } = await this.supabase
      .from('agents')
      .update(agent)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async deleteAgent(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('agents')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
  
  // Widget methods
  async getWidgets(organizationId: string): Promise<Widget[]> {
    const { data, error } = await this.supabase
      .from('widgets')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  }
  
  async createWidget(widget: Partial<Widget>): Promise<Widget> {
    const { data, error } = await this.supabase
      .functions.invoke('widget', {
        body: { action: 'create', ...widget },
      });
      
    if (error) throw error;
    return data.widget;
  }
  
  async getWidgetEmbedCode(widgetId: string): Promise<string> {
    const { data, error } = await this.supabase
      .functions.invoke('widget', {
        body: { action: 'generate_embed', widget_id: widgetId },
      });
      
    if (error) throw error;
    return data.embed_code;
  }
  
  // Conversation methods
  async converse(params: {
    agent_id: string;
    message: string;
    conversation_id?: string;
    project_id?: string;
  }): Promise<{
    id: string;
    response: string;
    audio_url: string | null;
  }> {
    const { data, error } = await this.supabase
      .functions.invoke('converse', {
        body: params,
      });
      
    if (error) throw error;
    return {
      id: data.conversation_id,
      response: data.response,
      audio_url: data.audio_url,
    };
  }
  
  async getConversations(agentId?: string, limit = 10): Promise<Conversation[]> {
    let query = this.supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (agentId) {
      query = query.eq('agent_id', agentId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  }
  
  // Lead methods
  async getLeads(organizationId: string): Promise<Lead[]> {
    const { data, error } = await this.supabase
      .from('leads')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  }
  
  async updateLead(id: string, lead: Partial<Lead>): Promise<Lead> {
    const { data, error } = await this.supabase
      .from('leads')
      .update(lead)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
  
  // Document methods
  async uploadDocument(file: File, projectId: string, organizationId: string): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    formData.append('organization_id', organizationId);
    
    const { data, error } = await this.supabase
      .functions.invoke('document', {
        body: formData,
      });
      
    if (error) throw error;
    return data.document;
  }
  
  async getDocuments(projectId: string): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  }
}

// Export singleton instance
export const api = new API(); 