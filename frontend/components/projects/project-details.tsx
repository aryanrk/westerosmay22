"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Building, FileText, Upload, X, Download, Eye, Calendar, Users } from "lucide-react"
import { Project } from "@/lib/api"

interface Agent {
  id: string
  name: string
  avatar: string
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  uploadedBy: string
}

interface ProjectDetailsProps {
  project: Project
  onSave: (project: Project) => void
  onClose: () => void
}

export function ProjectDetails({ project, onSave, onClose }: ProjectDetailsProps) {
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description || "")
  const [status, setStatus] = useState(project.status)
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [documents, setDocuments] = useState<Document[]>([])

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

    onSave({
      ...project,
      name,
      description,
      status,
    })
  }

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]))
  }

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
    toast({
      title: "Document deleted",
      description: "The document has been removed from this project.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Planning</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </span>
            {getStatusBadge(project.status)}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">
            <Building className="mr-2 h-4 w-4" />
            Project Details
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents ({documents.length})
          </TabsTrigger>
          <TabsTrigger value="agents">
            <Users className="mr-2 h-4 w-4" />
            Assigned Agents ({selectedAgents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Update your project's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="project-status">Status</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="status-planning"
                      checked={status === "planning"}
                      onChange={() => setStatus("planning")}
                    />
                    <Label htmlFor="status-planning">Planning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="status-active"
                      checked={status === "active"}
                      onChange={() => setStatus("active")}
                    />
                    <Label htmlFor="status-active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="status-paused"
                      checked={status === "paused"}
                      onChange={() => setStatus("paused")}
                    />
                    <Label htmlFor="status-paused">Paused</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="status-completed"
                      checked={status === "completed"}
                      onChange={() => setStatus("completed")}
                    />
                    <Label htmlFor="status-completed">Completed</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Documents</CardTitle>
                  <CardDescription>Manage documents for this project</CardDescription>
                </div>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No documents uploaded yet</div>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <span>
                              {doc.type} • {doc.size}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Agents</CardTitle>
              <CardDescription>Select AI voice agents for this project</CardDescription>
            </CardHeader>
            <CardContent>
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
                        <img
                          src={agent.avatar || "/placeholder.svg"}
                          alt={agent.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <Label htmlFor={`agent-${agent.id}`} className="cursor-pointer flex-1">
                          {agent.name}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
