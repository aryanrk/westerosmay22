"use client"

import { useState } from "react"
import { Copy, Edit, MessageSquare, Plus, Save, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface Template {
  id: string
  name: string
  content: string
  category: "welcome" | "follow-up" | "information" | "custom"
  variables: string[]
  createdAt: string
  updatedAt: string
}

export function WhatsAppTemplates() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "template1",
      name: "New Lead Welcome",
      content:
        "Hello {{name}}, thank you for your interest in {{project}}. I'm your AI assistant and I'll help you with information about our properties.",
      category: "welcome",
      variables: ["name", "project"],
      createdAt: "2023-05-10T10:00:00Z",
      updatedAt: "2023-05-15T14:30:00Z",
    },
    {
      id: "template2",
      name: "Project Information",
      content:
        "Hi {{name}}, we're excited about your interest in {{project}}. Here are the details you requested. Let me know if you have any questions!",
      category: "information",
      variables: ["name", "project"],
      createdAt: "2023-05-12T09:15:00Z",
      updatedAt: "2023-05-12T09:15:00Z",
    },
    {
      id: "template3",
      name: "Follow-up Message",
      content:
        "Hello {{name}}, just following up on your inquiry about {{project}}. Would you like to schedule a viewing or have any questions I can answer?",
      category: "follow-up",
      variables: ["name", "project"],
      createdAt: "2023-05-14T16:45:00Z",
      updatedAt: "2023-05-18T11:20:00Z",
    },
    {
      id: "template4",
      name: "Document Sharing",
      content:
        "Hello {{name}}, as requested, here are the documents for {{project}}. Please let me know if you need anything else.",
      category: "information",
      variables: ["name", "project"],
      createdAt: "2023-05-16T13:30:00Z",
      updatedAt: "2023-05-16T13:30:00Z",
    },
  ])

  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate({ ...template })
    setIsDialogOpen(true)
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((template) => template.id !== templateId))
    toast({
      title: "Template deleted",
      description: "The message template has been permanently removed.",
    })
  }

  const handleSaveTemplate = () => {
    if (!editingTemplate) return

    const now = new Date().toISOString()

    if (editingTemplate.id.includes("new")) {
      // Creating a new template
      const newTemplate: Template = {
        ...editingTemplate,
        id: `template${templates.length + 1}`,
        variables: extractVariables(editingTemplate.content),
        createdAt: now,
        updatedAt: now,
      }

      setTemplates([...templates, newTemplate])
    } else {
      // Updating existing template
      setTemplates(
        templates.map((template) =>
          template.id === editingTemplate.id
            ? {
                ...editingTemplate,
                variables: extractVariables(editingTemplate.content),
                updatedAt: now,
              }
            : template,
        ),
      )
    }

    setIsDialogOpen(false)
    setEditingTemplate(null)

    toast({
      title: "Template saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: `new-${Date.now()}`,
      name: "",
      content: "",
      category: "custom",
      variables: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setEditingTemplate(newTemplate)
    setIsDialogOpen(true)
  }

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g
    const variables: string[] = []
    let match

    while ((match = regex.exec(content)) !== null) {
      variables.push(match[1])
    }

    return [...new Set(variables)] // Remove duplicates
  }

  const copyTemplateContent = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Template content has been copied to your clipboard.",
    })
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "welcome":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Welcome</Badge>
      case "follow-up":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Follow-up</Badge>
      case "information":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Information</Badge>
      case "custom":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Custom</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-medium">Message Templates</h2>
          <p className="text-sm text-muted-foreground">Create and manage WhatsApp message templates</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[200px]"
            />
          </div>

          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="welcome">Welcome</option>
            <option value="follow-up">Follow-up</option>
            <option value="information">Information</option>
            <option value="custom">Custom</option>
          </select>

          <Button onClick={handleCreateTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{template.name}</CardTitle>
                {getCategoryBadge(template.category)}
              </div>
              <CardDescription className="text-xs">
                Last updated: {new Date(template.updatedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="relative rounded-md bg-muted p-3 text-sm">
                <p className="whitespace-pre-wrap">{template.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6 opacity-70 hover:opacity-100"
                  onClick={() => copyTemplateContent(template.content)}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>

              {template.variables.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Variables:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-1">
              <div className="flex justify-end gap-2 w-full">
                <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                  <Edit className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  <Trash className="mr-2 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {filteredTemplates.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No templates found</p>
              <Button onClick={handleCreateTemplate}>
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingTemplate?.id.includes("new") ? "Create Template" : "Edit Template"}</DialogTitle>
            <DialogDescription>
              Create or modify a WhatsApp message template. Use {`{{variable}}`} syntax for dynamic content.
            </DialogDescription>
          </DialogHeader>

          {editingTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                  placeholder="e.g., Welcome Message"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-category">Category</Label>
                <select
                  id="template-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={editingTemplate.category}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      category: e.target.value as Template["category"],
                    })
                  }
                >
                  <option value="welcome">Welcome</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="information">Information</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-content">Message Content</Label>
                <Textarea
                  id="template-content"
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                  placeholder="Hello {{name}}, thank you for your interest in {{project}}..."
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Use {`{{variable}}`} syntax for dynamic content. Available variables: {`{{name}}`}, {`{{project}}`},{" "}
                  {`{{agent}}`}, etc.
                </p>
              </div>

              {extractVariables(editingTemplate.content).length > 0 && (
                <div className="space-y-2">
                  <Label>Detected Variables</Label>
                  <div className="flex flex-wrap gap-1 p-2 border rounded-md">
                    {extractVariables(editingTemplate.content).map((variable) => (
                      <Badge key={variable} variant="secondary">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
