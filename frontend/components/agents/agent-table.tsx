"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Agent, Project } from "@/lib/api"

interface AgentTableProps {
  agents: Agent[]
  projects: Project[]
  onSelect: (agent: Agent) => void
  onDelete: (agentId: string) => void
}

export function AgentTable({ agents, projects, onSelect: onAgentClick, onDelete: onAgentDelete }: AgentTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null)

  const handleDelete = (agentId: string) => {
    setAgentToDelete(agentId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (agentToDelete) {
      onAgentDelete(agentToDelete)
      setAgentToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const getProjectName = (projectId?: string) => {
    if (!projectId) return "No Project"
    const project = projects.find(p => p.id === projectId)
    return project ? project.name : "Unknown Project"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>ElevenLabs ID</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No agents found. Create your first agent to get started.
                </TableCell>
              </TableRow>
            ) : (
              agents.map((agent) => (
                <TableRow
                  key={agent.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onAgentClick(agent)}
                >
                  <TableCell>
                    <div className="font-medium">{agent.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${agent.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span className="capitalize">{agent.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getProjectName(agent.project_id)}</TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground font-mono">
                      {agent.eleven_labs_agent_id ? agent.eleven_labs_agent_id.substring(0, 8) + '...' : 'Not configured'}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(agent.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(agent.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the agent and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
