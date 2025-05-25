"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentTable } from "@/components/agents/agent-table"
import { CreateAgentDialog } from "@/components/agents/create-agent-dialog"
import { AgentDetails } from "@/components/agents/agent-details"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { api, Agent, Project } from "@/lib/api"

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [createAgentOpen, setCreateAgentOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const { toast } = useToast()

  // For now, we'll use a dummy organization ID
  // In a real app, this would come from user context/auth
  const organizationId = "83d4f887-471d-4873-b419-dd3242d3c3bc"

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [agentsData, projectsData] = await Promise.all([
        api.getAgents(organizationId),
        api.getProjects(organizationId)
      ])
      
      // If no projects exist, create a sample project
      if (projectsData.length === 0) {
        try {
          const sampleProject = await api.createProject({
            name: "Sample Real Estate Project",
            description: "A sample project for demonstrating the AI voice agents",
            organization_id: organizationId,
            status: "active"
          })
          projectsData.push(sampleProject)
        } catch (error) {
          console.error('Error creating sample project:', error)
        }
      }
      
      setAgents(agentsData)
      setProjects(projectsData)
    } catch (error) {
      console.error('Error loading data:', error)
      toast({
        title: "Error",
        description: "Failed to load agents and projects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAgent = async (data: any) => {
    try {
      setCreating(true)
      
      // Convert files to base64 format for ElevenLabs upload
      let processedFiles = [];
      if (data.files && data.files.length > 0) {
        const filePromises = data.files.map((file: File) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64Content = reader.result?.toString().split(',')[1]; // Remove data:type;base64, prefix
              resolve({
                name: file.name,
                content: base64Content,
                type: file.type,
                size: file.size
              });
            };
            reader.readAsDataURL(file);
          });
        });
        
        processedFiles = await Promise.all(filePromises);
      }
      
      // Create the agent with all required ElevenLabs fields including files
      const newAgent = await api.createAgent({
        name: data.name,
        system_prompt: data.system_prompt,
        first_message: data.first_message,
        voice_id: data.voice_id,
        project_id: data.project,
        organization_id: organizationId,
        files: processedFiles, // Pass processed files to ElevenLabs
        status: 'active',
        configuration: {
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          }
        }
      })

      // Show success message with file count
      if (processedFiles.length > 0) {
        toast({
          title: "Success",
          description: `Agent created successfully with ${processedFiles.length} document(s) uploaded to knowledge base!`,
        })
      } else {
        toast({
          title: "Success",
          description: "Agent created successfully!",
        })
      }

      // Refresh agents list
      await loadData()
      setCreateAgentOpen(false)
    } catch (error) {
      console.error('Error creating agent:', error)
      toast({
        title: "Error",
        description: "Failed to create agent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setCreating(false)
    }
  }

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setDetailsOpen(true)
  }

  const handleDeleteAgent = async (agentId: string) => {
    try {
      await api.deleteAgent(agentId)
      toast({
        title: "Success",
        description: "Agent deleted successfully!",
      })
      await loadData()
    } catch (error) {
      console.error('Error deleting agent:', error)
      toast({
        title: "Error",
        description: "Failed to delete agent. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveAgent = async (updatedAgent: Agent) => {
    try {
      await api.updateAgent(updatedAgent.id, updatedAgent)
      toast({
        title: "Success",
        description: "Agent updated successfully!",
      })
      await loadData()
      setDetailsOpen(false)
    } catch (error) {
      console.error('Error updating agent:', error)
      toast({
        title: "Error",
        description: "Failed to update agent. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Voice Agents</h1>
          <p className="text-muted-foreground">
            Manage your AI voice assistants. Click on an agent to view details, recordings, and documents.
          </p>
        </div>
        <Button onClick={() => setCreateAgentOpen(true)} disabled={creating}>
          {creating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <PlusCircle className="mr-2 h-4 w-4" />
          )}
          Create Agent
        </Button>
      </div>

      <div className="bg-background rounded-lg border shadow-sm">
        <AgentTable 
          agents={agents} 
          projects={projects}
          onSelect={handleEditAgent} 
          onDelete={handleDeleteAgent} 
        />
      </div>

      <CreateAgentDialog
        open={createAgentOpen}
        onOpenChange={setCreateAgentOpen}
        onSubmit={handleCreateAgent}
        projects={projects}
        loading={creating}
      />

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Agent Details</DialogTitle>
          </DialogHeader>
          {selectedAgent && (
            <AgentDetails 
              agent={selectedAgent} 
              projects={projects}
              onClose={() => setDetailsOpen(false)} 
              onSave={handleSaveAgent} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
