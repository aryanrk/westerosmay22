"use client"

import { useState } from "react"
import { ChevronDown, Edit, FileText, MessageSquare, Plus, Save, Trash, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/components/ui/use-toast"

interface AutomationRule {
  id: string
  name: string
  project: string
  templateId: string
  active: boolean
  sendDocuments: boolean
  delay: number
  conditions: {
    field: string
    operator: string
    value: string
  }[]
}

interface Project {
  id: string
  name: string
  documents: {
    id: string
    name: string
    selected: boolean
    type: string
  }[]
}

interface Template {
  id: string
  name: string
  content: string
}

export function WhatsAppAutomation() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "rule1",
      name: "New Luxury Towers Lead",
      project: "luxury-towers",
      templateId: "template1",
      active: true,
      sendDocuments: true,
      delay: 5,
      conditions: [
        { field: "project", operator: "equals", value: "Luxury Towers" },
        { field: "source", operator: "equals", value: "website" },
      ],
    },
    {
      id: "rule2",
      name: "Garden Villas Follow-up",
      project: "garden-villas",
      templateId: "template2",
      active: true,
      sendDocuments: true,
      delay: 10,
      conditions: [{ field: "project", operator: "equals", value: "Garden Villas" }],
    },
    {
      id: "rule3",
      name: "Downtown Lofts Inquiry",
      project: "downtown-lofts",
      templateId: "template3",
      active: false,
      sendDocuments: false,
      delay: 0,
      conditions: [{ field: "project", operator: "equals", value: "Downtown Lofts" }],
    },
  ])

  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>("rule1")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  // Sample data
  const projects: Project[] = [
    {
      id: "luxury-towers",
      name: "Luxury Towers",
      documents: [
        { id: "doc1", name: "Luxury Towers Brochure.pdf", selected: true, type: "pdf" },
        { id: "doc2", name: "Floor Plans.pdf", selected: true, type: "pdf" },
        { id: "doc3", name: "Amenities List.docx", selected: false, type: "docx" },
        { id: "doc4", name: "Price Sheet.xlsx", selected: false, type: "xlsx" },
      ],
    },
    {
      id: "garden-villas",
      name: "Garden Villas",
      documents: [
        { id: "doc5", name: "Garden Villas Overview.pdf", selected: true, type: "pdf" },
        { id: "doc6", name: "Villa Specifications.pdf", selected: true, type: "pdf" },
        { id: "doc7", name: "Community Map.jpg", selected: false, type: "jpg" },
      ],
    },
    {
      id: "downtown-lofts",
      name: "Downtown Lofts",
      documents: [
        { id: "doc8", name: "Downtown Lofts Catalog.pdf", selected: true, type: "pdf" },
        { id: "doc9", name: "Interior Finishes.pdf", selected: false, type: "pdf" },
      ],
    },
  ]

  const templates: Template[] = [
    {
      id: "template1",
      name: "New Lead Welcome",
      content:
        "Hello {{name}}, thank you for your interest in {{project}}. Here are some documents that might be helpful for you.",
    },
    {
      id: "template2",
      name: "Project Information",
      content: "Hi {{name}}, we're excited about your interest in {{project}}. Attached are the details you requested.",
    },
    {
      id: "template3",
      name: "Follow-up Message",
      content:
        "Hello {{name}}, just following up on your inquiry about {{project}}. Let me know if you have any questions.",
    },
  ]

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map((rule) => (rule.id === ruleId ? { ...rule, active: !rule.active } : rule)))

    toast({
      title: "Automation rule updated",
      description: `The rule has been ${rules.find((r) => r.id === ruleId)?.active ? "disabled" : "enabled"}.`,
    })
  }

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule)
    setSelectedProject(rule.project)

    // Find selected documents for this project
    const projectDocs = projects.find((p) => p.id === rule.project)?.documents || []
    setSelectedDocuments(projectDocs.filter((d) => d.selected).map((d) => d.id))

    setIsDialogOpen(true)
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId))
    toast({
      title: "Automation rule deleted",
      description: "The rule has been permanently removed.",
    })
  }

  const handleSaveRule = () => {
    if (!editingRule) return

    // Update the rule
    const updatedRules = rules.map((rule) => (rule.id === editingRule.id ? editingRule : rule))

    setRules(updatedRules)
    setIsDialogOpen(false)
    setEditingRule(null)

    toast({
      title: "Automation rule saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleCreateRule = () => {
    const newRule: AutomationRule = {
      id: `rule${rules.length + 1}`,
      name: "New Automation Rule",
      project: projects[0].id,
      templateId: templates[0].id,
      active: true,
      sendDocuments: true,
      delay: 5,
      conditions: [{ field: "project", operator: "equals", value: projects[0].name }],
    }

    setEditingRule(newRule)
    setSelectedProject(newRule.project)
    setSelectedDocuments([])
    setIsDialogOpen(true)
  }

  const handleProjectChange = (projectId: string) => {
    if (!editingRule) return

    setSelectedProject(projectId)
    setEditingRule({
      ...editingRule,
      project: projectId,
      conditions: [
        { field: "project", operator: "equals", value: projects.find((p) => p.id === projectId)?.name || "" },
        ...editingRule.conditions.filter((c) => c.field !== "project"),
      ],
    })

    // Reset selected documents when project changes
    setSelectedDocuments([])
  }

  const toggleDocument = (docId: string) => {
    setSelectedDocuments((prev) => (prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]))
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "docx":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "xlsx":
        return <FileText className="h-4 w-4 text-green-500" />
      case "jpg":
      case "png":
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const testAutomation = (ruleId: string) => {
    toast({
      title: "Test message sent",
      description: "A test WhatsApp message has been sent using this automation rule.",
    })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Automation Rules</h2>
          <p className="text-sm text-muted-foreground">Configure when and how WhatsApp messages are sent to leads</p>
        </div>
        <Button onClick={handleCreateRule}>
          <Plus className="mr-2 h-4 w-4" />
          Create Rule
        </Button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <Collapsible
            key={rule.id}
            open={expandedRuleId === rule.id}
            onOpenChange={() => setExpandedRuleId(expandedRuleId === rule.id ? null : rule.id)}
            className="border rounded-lg"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Switch checked={rule.active} onCheckedChange={() => handleToggleRule(rule.id)} />
                <div>
                  <h3 className="font-medium">{rule.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {projects.find((p) => p.id === rule.project)?.name} •{" "}
                    {templates.find((t) => t.id === rule.templateId)?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={rule.active ? "default" : "outline"}>{rule.active ? "Active" : "Inactive"}</Badge>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expandedRuleId === rule.id ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>

            <CollapsibleContent>
              <div className="border-t p-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Conditions</h4>
                    <div className="space-y-2">
                      {rule.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Badge variant="outline" className="mr-2">
                            {condition.field}
                          </Badge>
                          <span className="text-muted-foreground mr-2">{condition.operator}</span>
                          <span>"{condition.value}"</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Send documents:</span>
                        <span>{rule.sendDocuments ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delay:</span>
                        <span>{rule.delay} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Template:</span>
                        <span>{templates.find((t) => t.id === rule.templateId)?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => testAutomation(rule.id)}>
                    Test
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditRule(rule)}>
                    <Edit className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Trash className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {rules.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No automation rules created yet</p>
              <Button onClick={handleCreateRule}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Rule
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingRule?.id.includes("new") ? "Create Automation Rule" : "Edit Automation Rule"}
            </DialogTitle>
            <DialogDescription>Configure when and how WhatsApp messages are sent to leads</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-auto py-4">
            {editingRule && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <input
                    id="rule-name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingRule.name}
                    onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <Select value={selectedProject || ""} onValueChange={handleProjectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Message Template</Label>
                  <Select
                    value={editingRule.templateId}
                    onValueChange={(value) => setEditingRule({ ...editingRule, templateId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Preview: {templates.find((t) => t.id === editingRule.templateId)?.content}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="send-documents">Send Project Documents</Label>
                    <Switch
                      id="send-documents"
                      checked={editingRule.sendDocuments}
                      onCheckedChange={(checked) => setEditingRule({ ...editingRule, sendDocuments: checked })}
                    />
                  </div>

                  {editingRule.sendDocuments && selectedProject && (
                    <Card className="mt-2">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Select Documents to Send</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ScrollArea className="h-[200px]">
                          <div className="space-y-2">
                            {projects
                              .find((p) => p.id === selectedProject)
                              ?.documents.map((doc) => (
                                <div key={doc.id} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`doc-${doc.id}`}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={selectedDocuments.includes(doc.id)}
                                    onChange={() => toggleDocument(doc.id)}
                                  />
                                  <Label htmlFor={`doc-${doc.id}`} className="flex items-center gap-2 cursor-pointer">
                                    {getDocumentIcon(doc.type)}
                                    <span>{doc.name}</span>
                                  </Label>
                                </div>
                              ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delay">Delay (minutes)</Label>
                  <Select
                    value={String(editingRule.delay)}
                    onValueChange={(value) => setEditingRule({ ...editingRule, delay: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Immediately</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Trigger Conditions</Label>
                    <Button variant="outline" size="sm" disabled>
                      <Plus className="mr-2 h-3.5 w-3.5" />
                      Add Condition
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="py-3">
                      {editingRule.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{condition.field}</Badge>
                            <span className="text-sm text-muted-foreground">{condition.operator}</span>
                            <span className="text-sm">"{condition.value}"</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            disabled={condition.field === "project"}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRule}>
              <Save className="mr-2 h-4 w-4" />
              Save Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
