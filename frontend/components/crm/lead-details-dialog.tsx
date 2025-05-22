"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  Edit,
  MessageSquare,
  User,
  FileText,
  BarChart,
  Phone,
  Plus,
  Save,
  Tag,
  Trash,
  Send,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { toast } from "@/components/ui/use-toast"
import { SmartNotes } from "@/components/crm/smart-notes"
import type { Lead } from "./leads-table"

interface Activity {
  id: string
  type: "note" | "call" | "email" | "status-change" | "follow-up" | "whatsapp"
  content: string
  timestamp: string
  user?: string
}

interface LeadDetailsDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailsDialog({ lead, open, onOpenChange }: LeadDetailsDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [date, setDate] = useState<Date>()
  const [whatsappMessage, setWhatsappMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [activities, setActivities] = useState<Activity[]>([])

  // Templates for WhatsApp messages
  const templates = [
    { id: "template1", name: "New Lead Welcome" },
    { id: "template2", name: "Project Information" },
    { id: "template3", name: "Follow-up Message" },
    { id: "template4", name: "Document Sharing" },
  ]

  // Projects data
  const projects = [
    { id: "luxury-towers", name: "Luxury Towers" },
    { id: "garden-villas", name: "Garden Villas" },
    { id: "downtown-lofts", name: "Downtown Lofts" },
    { id: "seaside-residences", name: "Seaside Residences" },
  ]

  useEffect(() => {
    if (lead?.id) {
      // Sample activities for the lead
      const sampleActivities: Activity[] = [
        {
          id: "a1",
          type: "status-change",
          content: `Status changed from New to ${lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}`,
          timestamp: "May 15, 2023 • 10:30 AM",
          user: "John Doe",
        },
        {
          id: "a2",
          type: "note",
          content: "Lead is interested in 3-bedroom units with ocean view. Budget around $1.5M.",
          timestamp: "May 15, 2023 • 10:35 AM",
          user: "John Doe",
        },
        {
          id: "a3",
          type: "call",
          content: "Had a follow-up call. Discussed financing options and potential move-in dates.",
          timestamp: "May 17, 2023 • 2:15 PM",
          user: "Sarah Johnson",
        },
        {
          id: "a4",
          type: "follow-up",
          content: "Scheduled a property viewing for next week.",
          timestamp: "May 18, 2023 • 9:00 AM",
          user: "John Doe",
        },
      ]

      setActivities(sampleActivities)

      // Set project based on lead's project
      const projectMatch = projects.find((p) => p.name === lead.project)
      if (projectMatch) {
        setSelectedProject(projectMatch.id)
      }

      // Reset WhatsApp message
      setWhatsappMessage("")
      setSelectedTemplate("")
    }
  }, [lead])

  if (!lead) return null

  // Format the lead's name for the avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const togglePlayPause = () => {
    const audioElement = document.getElementById("conversation-audio") as HTMLAudioElement
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newActivity: Activity = {
        id: `a${activities.length + 1}`,
        type: "note",
        content: newNote,
        timestamp: new Date().toLocaleString(),
        user: "John Doe",
      }

      setActivities([newActivity, ...activities])
      setNewNote("")

      toast({
        title: "Note added",
        description: "Your note has been added to the lead's activity timeline.",
      })
    }
  }

  const handleScheduleFollowUp = () => {
    if (date) {
      const newActivity: Activity = {
        id: `a${activities.length + 1}`,
        type: "follow-up",
        content: `Follow-up scheduled for ${format(date, "PPP")}`,
        timestamp: new Date().toLocaleString(),
        user: "John Doe",
      }

      setActivities([newActivity, ...activities])
      setDate(undefined)

      toast({
        title: "Follow-up scheduled",
        description: `A follow-up has been scheduled for ${format(date, "PPP")}.`,
      })
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)

    // Set message content based on template
    switch (templateId) {
      case "template1":
        setWhatsappMessage(
          `Hello ${lead.name}, thank you for your interest in ${lead.project}. I'm your AI assistant and I'll help you with information about our properties.`,
        )
        break
      case "template2":
        setWhatsappMessage(
          `Hi ${lead.name}, we're excited about your interest in ${lead.project}. Here are the details you requested. Let me know if you have any questions!`,
        )
        break
      case "template3":
        setWhatsappMessage(
          `Hello ${lead.name}, just following up on your inquiry about ${lead.project}. Would you like to schedule a viewing or have any questions I can answer?`,
        )
        break
      case "template4":
        setWhatsappMessage(
          `Hello ${lead.name}, as requested, here are the documents for ${lead.project}. Please let me know if you need anything else.`,
        )
        break
      default:
        setWhatsappMessage("")
    }
  }

  const handleSendWhatsApp = () => {
    if (whatsappMessage.trim()) {
      const newActivity: Activity = {
        id: `a${activities.length + 1}`,
        type: "whatsapp",
        content: `WhatsApp message sent: "${whatsappMessage}"`,
        timestamp: new Date().toLocaleString(),
        user: "John Doe",
      }

      setActivities([newActivity, ...activities])

      toast({
        title: "WhatsApp message sent",
        description: "Your message has been sent to the lead via WhatsApp.",
      })

      // Reset form
      setWhatsappMessage("")
      setSelectedTemplate("")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
      case "contacted":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Contacted</Badge>
      case "qualified":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Qualified</Badge>
      case "proposal":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Proposal</Badge>
      case "closed-won":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Closed Won</Badge>
      case "closed-lost":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Closed Lost</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "call":
        return <Phone className="h-4 w-4 text-green-500" />
      case "email":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "status-change":
        return <Tag className="h-4 w-4 text-amber-500" />
      case "follow-up":
        return <Calendar className="h-4 w-4 text-indigo-500" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-600" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Lead Details</DialogTitle>
            <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
              {editMode ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Lead
                </>
              )}
            </Button>
          </div>
          <DialogDescription>Manage and track all information for this lead.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 py-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={lead.name} />
            <AvatarFallback>{getInitials(lead.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">{lead.name}</h3>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>{lead.phoneNumber}</span>
              <span>•</span>
              <Badge variant="outline">{lead.project}</Badge>
              <span>•</span>
              {getStatusBadge(lead.status)}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="smart-notes">
              <Brain className="mr-2 h-4 w-4" />
              Smart Notes
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="transcription">Transcription</TabsTrigger>
            <TabsTrigger value="recording">Recording</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>

          <div className="mt-4 flex-1 overflow-auto">
            <TabsContent value="overview" className="h-full">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Lead Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editMode ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={lead.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" defaultValue={lead.phoneNumber} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select defaultValue={lead.status}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="proposal">Proposal</SelectItem>
                              <SelectItem value="closed-won">Closed Won</SelectItem>
                              <SelectItem value="closed-lost">Closed Lost</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project">Project</Label>
                          <Select defaultValue={lead.project}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Luxury Towers">Luxury Towers</SelectItem>
                              <SelectItem value="Garden Villas">Garden Villas</SelectItem>
                              <SelectItem value="Downtown Lofts">Downtown Lofts</SelectItem>
                              <SelectItem value="Seaside Residences">Seaside Residences</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="source">Source</Label>
                          <Select defaultValue={lead.source}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="referral">Referral</SelectItem>
                              <SelectItem value="social">Social Media</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget</Label>
                          <Input id="budget" defaultValue={lead.budget} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium">Status</div>
                            <div className="mt-1">{getStatusBadge(lead.status)}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Source</div>
                            <div className="mt-1">{lead.source}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Budget</div>
                          <div className="mt-1">{lead.budget || "Not specified"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">First Contact</div>
                          <div className="mt-1">{lead.timestamp}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Last Contact</div>
                          <div className="mt-1">{lead.lastContact || "Not contacted yet"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Next Follow-up</div>
                          <div className="mt-1">{lead.nextFollowUp || "No follow-up scheduled"}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Lead Score</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="flex items-center justify-center py-8">
                      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-muted">
                        <div className="text-3xl font-bold">{lead.score || 0}</div>
                        <div className="absolute bottom-0 text-sm">/ 100</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Interest Level</span>
                        <span className="font-medium">High</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Budget Match</span>
                        <span className="font-medium">Medium</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Engagement</span>
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button variant="outline" className="w-full">
                      <BarChart className="mr-2 h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Tags</CardTitle>
                      {editMode && (
                        <Button variant="ghost" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Tag
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags ? (
                        lead.tags.map((tag, index) => (
                          <div key={index} className="flex items-center">
                            <Badge variant="outline">{tag}</Badge>
                            {editMode && (
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                <Trash className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">No tags</div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Schedule Follow-up</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Label htmlFor="follow-up-type">Follow-up Type</Label>
                        <Select defaultValue="call">
                          <SelectTrigger className="mt-1.5">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="call">Phone Call</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="viewing">Property Viewing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "mt-1.5 w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex items-end">
                        <Button onClick={handleScheduleFollowUp} className="w-full sm:w-auto">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="smart-notes" className="h-full">
              <SmartNotes leadName={lead.name} transcript={lead.messages} />
            </TabsContent>

            <TabsContent value="activity" className="h-full">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Activity Timeline</CardTitle>
                  <CardDescription>Recent activity and interactions with this lead.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">{activity.content}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{activity.timestamp}</span>
                              {activity.user && (
                                <>
                                  <span>•</span>
                                  <span>{activity.user}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcription" className="h-full">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Conversation Transcription</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{lead.timestamp}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {lead.messages ? (
                      <div className="space-y-4">
                        {lead.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <div className="flex items-center gap-2 text-xs opacity-70 mb-1">
                                {message.sender === "user" ? (
                                  <>
                                    <span>{lead.name}</span>
                                    <User className="h-3 w-3" />
                                  </>
                                ) : (
                                  <>
                                    <MessageSquare className="h-3 w-3" />
                                    <span>AI Assistant</span>
                                  </>
                                )}
                              </div>
                              <p className="text-sm">{message.text}</p>
                              <div className="mt-1 text-right text-xs opacity-70">{message.timestamp}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        No transcription available for this conversation.
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recording" className="h-full">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Conversation Recording</CardTitle>
                  <CardDescription>Listen to the recorded conversation with this lead.</CardDescription>
                </CardHeader>
                <CardContent>
                  {lead.audioUrl ? (
                    <div className="space-y-4">
                      <div className="rounded-lg border bg-card p-4">
                        <audio
                          id="conversation-audio"
                          src={lead.audioUrl}
                          className="w-full"
                          controls
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button onClick={togglePlayPause} className="w-40">
                          {isPlaying ? "Pause" : "Play Recording"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                      No recording available for this conversation.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="h-full">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Notes</CardTitle>
                  <CardDescription>Add and view notes about this lead.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Textarea
                        placeholder="Add a note about this lead..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="mt-2 flex justify-end">
                        <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Note
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {activities
                        .filter((activity) => activity.type === "note")
                        .map((note) => (
                          <div key={note.id} className="rounded-lg border p-4">
                            <p className="text-sm">{note.content}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{note.timestamp}</span>
                              {note.user && (
                                <>
                                  <span>•</span>
                                  <span>{note.user}</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="whatsapp" className="h-full">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">WhatsApp Communication</CardTitle>
                  <CardDescription>Send WhatsApp messages and documents to this lead.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-template">Message Template</Label>
                      <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-message">Message</Label>
                      <Textarea
                        id="whatsapp-message"
                        value={whatsappMessage}
                        onChange={(e) => setWhatsappMessage(e.target.value)}
                        placeholder="Type your WhatsApp message here..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="project-documents">Project Documents</Label>
                        <Badge variant="outline">
                          {projects.find((p) => p.id === selectedProject)?.name || lead.project}
                        </Badge>
                      </div>

                      <Card className="border-dashed">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="doc1" className="rounded text-primary" defaultChecked />
                              <Label htmlFor="doc1" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-red-500" />
                                <span>Project Brochure.pdf</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="doc2" className="rounded text-primary" defaultChecked />
                              <Label htmlFor="doc2" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-red-500" />
                                <span>Floor Plans.pdf</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="doc3" className="rounded text-primary" />
                              <Label htmlFor="doc3" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <span>Price List.docx</span>
                              </Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSendWhatsApp} disabled={!whatsappMessage.trim()}>
                        <Send className="mr-2 h-4 w-4" />
                        Send WhatsApp Message
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Recent WhatsApp Messages</h3>
                      <ScrollArea className="h-[200px] rounded-md border">
                        <div className="p-4 space-y-4">
                          {activities
                            .filter((activity) => activity.type === "whatsapp")
                            .map((message) => (
                              <div key={message.id} className="rounded-lg border p-3">
                                <p className="text-sm">{message.content}</p>
                                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{message.timestamp}</span>
                                  {message.user && (
                                    <>
                                      <span>•</span>
                                      <span>{message.user}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}

                          {activities.filter((activity) => activity.type === "whatsapp").length === 0 && (
                            <div className="flex h-[100px] items-center justify-center text-muted-foreground">
                              No WhatsApp messages sent yet.
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
