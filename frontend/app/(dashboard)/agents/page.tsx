"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentTable } from "@/components/agents/agent-table"
import { CreateAgentDialog } from "@/components/agents/create-agent-dialog"
import { AgentDetails } from "@/components/agents/agent-details"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Sample data
const sampleAgents = [
  {
    id: "1",
    name: "Luxury Towers Assistant",
    project: "Luxury Towers",
    status: "active" as const,
    createdAt: "May 10, 2023",
  },
  {
    id: "2",
    name: "Garden Villas Guide",
    project: "Garden Villas",
    status: "active" as const,
    createdAt: "Jun 15, 2023",
  },
  {
    id: "3",
    name: "Downtown Lofts Expert",
    project: "Downtown Lofts",
    status: "inactive" as const,
    createdAt: "Jul 22, 2023",
  },
  {
    id: "4",
    name: "Seaside Residences Specialist",
    project: "Seaside Residences",
    status: "active" as const,
    createdAt: "Aug 5, 2023",
  },
]

export default function AgentsPage() {
  const [agents, setAgents] = useState(sampleAgents)
  const [createAgentOpen, setCreateAgentOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleCreateAgent = (data: any) => {
    const newAgent = {
      id: String(agents.length + 1),
      name: data.name as string,
      project: data.project as string,
      status: "active" as const,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }

    setAgents((prev) => [...prev, newAgent])
    setCreateAgentOpen(false)
  }

  const handleEditAgent = (agent: any) => {
    setSelectedAgent(agent)
    setDetailsOpen(true)
  }

  const handleDeleteAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId))
  }

  const handleSaveAgent = (updatedAgent: any) => {
    setAgents((prev) => prev.map((agent) => (agent.id === updatedAgent.id ? updatedAgent : agent)))
    setDetailsOpen(false)
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
        <Button onClick={() => setCreateAgentOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <AgentTable agents={agents} onSelect={handleEditAgent} onDelete={handleDeleteAgent} />
      </div>

      <CreateAgentDialog
        open={createAgentOpen}
        onOpenChange={(open) => {
          setCreateAgentOpen(open)
        }}
        onSubmit={handleCreateAgent}
      />

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl">
          {selectedAgent && (
            <AgentDetails agent={selectedAgent} onClose={() => setDetailsOpen(false)} onSave={handleSaveAgent} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
