"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

interface Agent {
  id: string
  name: string
  avatar: string
}

interface ProjectFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
}

export function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [selectedAgents, setSelectedAgents] = useState<string[]>(initialData?.agentIds || [])

  // Sample agents data - in a real app, this would come from an API
  const agents: Agent[] = [
    { id: "agent-1", name: "Property Expert", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "agent-2", name: "Mortgage Specialist", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "agent-3", name: "Investment Advisor", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "agent-4", name: "Rental Agent", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "agent-5", name: "Commercial Expert", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "agent-6", name: "Luxury Properties", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "agent-7", name: "First-time Buyers", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      })
      return
    }

    onSubmit({
      name,
      description,
      agentIds: selectedAgents,
    })
  }

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="project-name">Project Name</Label>
        <Input
          id="project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-description">Description</Label>
        <Textarea
          id="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Assign Agents ({selectedAgents.length} selected)</Label>
        <ScrollArea className="h-60 rounded-md border">
          <div className="p-4 space-y-2">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center space-x-2 py-2">
                <Checkbox
                  id={`agent-${agent.id}`}
                  checked={selectedAgents.includes(agent.id)}
                  onCheckedChange={() => toggleAgent(agent.id)}
                />
                <div className="flex items-center space-x-3 flex-1">
                  <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="h-8 w-8 rounded-full" />
                  <Label htmlFor={`agent-${agent.id}`} className="cursor-pointer flex-1">
                    {agent.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update Project" : "Create Project"}</Button>
      </div>
    </form>
  )
}
