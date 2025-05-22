-- Additional RLS Policies for Projects, Agents, Documents, Conversations, Leads, and Widgets

-- Policies for projects
CREATE POLICY "Users can view projects in their organization"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = projects.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create projects in their organization"
  ON projects FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = projects.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admin and manager users can update projects"
  ON projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = projects.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admin and manager users can delete projects"
  ON projects FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = projects.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

-- Policies for agents
CREATE POLICY "Users can view agents in their organization"
  ON agents FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = agents.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create agents in their organization"
  ON agents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = agents.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admin and manager users can update agents"
  ON agents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = agents.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admin and manager users can delete agents"
  ON agents FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = agents.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

-- Policies for documents
CREATE POLICY "Users can view documents in their organization"
  ON documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = documents.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create documents in their organization"
  ON documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = documents.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin and manager users can update documents"
  ON documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = documents.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admin and manager users can delete documents"
  ON documents FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = documents.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

-- Policies for document_chunks
CREATE POLICY "Users can view document chunks in their organization"
  ON document_chunks FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM documents
      JOIN organization_members ON documents.organization_id = organization_members.organization_id
      WHERE document_chunks.document_id = documents.id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Policies for conversations
CREATE POLICY "Users can view conversations in their organization"
  ON conversations FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = conversations.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Policies for leads
CREATE POLICY "Users can view leads in their organization"
  ON leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = leads.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update leads in their organization"
  ON leads FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = leads.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Policies for widgets
CREATE POLICY "Users can view widgets in their organization"
  ON widgets FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = widgets.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create widgets in their organization"
  ON widgets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = widgets.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admin and manager users can update widgets"
  ON widgets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = widgets.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admin and manager users can delete widgets"
  ON widgets FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_members
      WHERE organization_members.organization_id = widgets.organization_id
      AND organization_members.user_id = auth.uid()
      AND organization_members.role IN ('admin', 'manager')
    )
  );

-- Allow anonymous access to widget data via API
CREATE POLICY "Anonymous widget access via API"
  ON widgets FOR SELECT
  USING (true); 