"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Copy,
  Check,
  Palette,
  MessageSquare,
  Settings,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Bot,
  Code,
  FileText,
  Upload,
  X,
  File,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Agent, Project } from "@/lib/api"

interface AgentDetailsProps {
  agent: Agent
  projects: Project[]
  onClose: () => void
  onSave: (agent: Agent) => void
}

export function AgentDetails({ agent, projects, onClose, onSave }: AgentDetailsProps) {
  const [name, setName] = useState(agent.name)
  const [status, setStatus] = useState(agent.status)
  const [primaryColor, setPrimaryColor] = useState("#3B82F6")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [position, setPosition] = useState("bottom-right")
  const [welcomeMessage, setWelcomeMessage] = useState(
    `Hi there! I'm ${agent.name}, your AI assistant. How can I help you today?`,
  )
  const [buttonText, setButtonText] = useState("Chat with AI Assistant")
  const [showBranding, setShowBranding] = useState(true)
  const [autoOpen, setAutoOpen] = useState(false)
  const [autoOpenDelay, setAutoOpenDelay] = useState(10)
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(120) // 2 minutes sample duration
  const [documents, setDocuments] = useState<any[]>([])

  // Get project name
  const getProjectName = (projectId?: string) => {
    if (!projectId) return "No Project"
    const project = projects.find(p => p.id === projectId)
    return project ? project.name : "Unknown Project"
  }

  // Sample conversations for the transcript tab
  const conversations = [
    {
      id: "conv1",
      date: "2023-05-15T14:30:00",
      caller: "Michael Johnson",
      duration: "4:32",
      transcript: [
        {
          speaker: "Customer",
          text: "Hi, I'm interested in the Luxury Towers project. Can you tell me more about it?",
        },
        {
          speaker: "Agent",
          text: "Hello Michael! I'd be happy to tell you about our Luxury Towers project. It features premium residential towers with 2, 3, and 4 BHK apartments with panoramic city views.",
        },
        { speaker: "Customer", text: "What's the price range for the 3 BHK apartments?" },
        {
          speaker: "Agent",
          text: "The 3 BHK apartments in Luxury Towers range from $750,000 to $1.2 million, depending on the floor and view.",
        },
        { speaker: "Customer", text: "And what amenities are included?" },
        {
          speaker: "Agent",
          text: "Luxury Towers includes a range of world-class amenities such as a swimming pool, fitness center, spa, children's play area, landscaped gardens, 24/7 security, and concierge services.",
        },
      ],
    },
    {
      id: "conv2",
      date: "2023-05-16T11:15:00",
      caller: "Sarah Williams",
      duration: "3:45",
      transcript: [
        {
          speaker: "Customer",
          text: "Hello, I saw your ad for Luxury Towers and I'm curious about the payment plans.",
        },
        {
          speaker: "Agent",
          text: "Hi Sarah! We offer flexible payment plans for Luxury Towers. You can choose from a 20:80 payment plan, a construction-linked plan, or a customized payment schedule.",
        },
        { speaker: "Customer", text: "Could you explain the 20:80 plan?" },
        {
          speaker: "Agent",
          text: "With the 20:80 plan, you pay 20% upfront and the remaining 80% at possession. This is popular with many of our buyers.",
        },
      ],
    },
  ]

  const widgetCode = `<script src="https://realvoice.ai/widget.js" 
  data-agent-id="${agent.id}"
  data-primary-color="${primaryColor}"
  data-text-color="${textColor}"
  data-position="${position}"
  data-welcome-message="${welcomeMessage}"
  data-button-text="${buttonText}"
  data-show-branding="${showBranding}"
  data-auto-open="${autoOpen}"
  data-auto-open-delay="${autoOpenDelay}"
></script>`

  const copyCode = () => {
    navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Widget code has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    onSave({
      ...agent,
      name,
      status,
      widgetSettings: {
        primaryColor,
        textColor,
        position,
        welcomeMessage,
        buttonText,
        showBranding,
        autoOpen,
        autoOpenDelay,
      },
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        project: getProjectName(agent.project_id),
        agent: agent.name,
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(file),
      }))
      setDocuments((prev) => [...prev, ...newFiles])
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) have been uploaded successfully.`,
      })
    }
  }

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    toast({
      title: "File removed",
      description: "The document has been removed successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{agent.name}</h2>
          <p className="text-muted-foreground">Project: {getProjectName(agent.project_id)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="details">
            <Bot className="mr-2 h-4 w-4" />
            Agent Details
          </TabsTrigger>
          <TabsTrigger value="widget">
            <Code className="mr-2 h-4 w-4" />
            Widget
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="recordings">
            <Volume2 className="mr-2 h-4 w-4" />
            Recordings
          </TabsTrigger>
          <TabsTrigger value="transcripts">
            <MessageSquare className="mr-2 h-4 w-4" />
            Transcripts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Information</CardTitle>
              <CardDescription>Update your agent's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input id="agent-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent-status">Status</Label>
                <Select value={status} onValueChange={(value: "active" | "inactive") => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Created On</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(agent.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="widget" className="space-y-4 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Widget Customization</CardTitle>
                <CardDescription>Customize how your widget looks and behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="appearance" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="appearance">
                      <Palette className="mr-2 h-4 w-4" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger value="content">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="behavior">
                      <Settings className="mr-2 h-4 w-4" />
                      Behavior
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="appearance" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: primaryColor }} />
                        <Input
                          id="primary-color"
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="text-color">Text Color</Label>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: textColor }} />
                        <Input
                          id="text-color"
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Widget Position</Label>
                      <Select value={position} onValueChange={setPosition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-branding">Show RealVoice Branding</Label>
                        <p className="text-sm text-muted-foreground">Display "Powered by RealVoice AI" in the widget</p>
                      </div>
                      <Switch id="show-branding" checked={showBranding} onCheckedChange={setShowBranding} />
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="button-text">Button Text</Label>
                      <Input
                        id="button-text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        placeholder="Chat with AI Assistant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="welcome-message">Welcome Message</Label>
                      <Textarea
                        id="welcome-message"
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        placeholder="Hi there! How can I help you today?"
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="behavior" className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-open">Auto Open Chat</Label>
                        <p className="text-sm text-muted-foreground">Automatically open the chat after a delay</p>
                      </div>
                      <Switch id="auto-open" checked={autoOpen} onCheckedChange={setAutoOpen} />
                    </div>

                    {autoOpen && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-open-delay">Auto Open Delay (seconds)</Label>
                          <span className="text-sm">{autoOpenDelay} seconds</span>
                        </div>
                        <Slider
                          id="auto-open-delay"
                          min={5}
                          max={60}
                          step={5}
                          value={[autoOpenDelay]}
                          onValueChange={(value) => setAutoOpenDelay(value[0])}
                        />
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Widget Preview & Code</CardTitle>
                <CardDescription>Preview and get the embed code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative border rounded-lg bg-gray-50 w-full aspect-video">
                  {/* Simulated website content */}
                  <div className="absolute inset-0 p-4 flex flex-col">
                    <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-32 w-full bg-gray-200 rounded mb-4"></div>
                  </div>

                  {/* Widget button */}
                  <div
                    className={`absolute ${
                      position === "bottom-right"
                        ? "bottom-4 right-4"
                        : position === "bottom-left"
                          ? "bottom-4 left-4"
                          : position === "top-right"
                            ? "top-4 right-4"
                            : "top-4 left-4"
                    }`}
                  >
                    <button
                      className="rounded-full px-4 py-2 flex items-center gap-2 shadow-md"
                      style={{ backgroundColor: primaryColor, color: textColor }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm font-medium">{buttonText}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="embed-code">Embed Code</Label>
                  <div className="relative">
                    <Textarea
                      id="embed-code"
                      value={widgetCode}
                      readOnly
                      rows={6}
                      className="font-mono text-xs pr-12"
                    />
                    <Button size="icon" variant="ghost" className="absolute right-2 top-2" onClick={copyCode}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button className="w-full" onClick={copyCode}>
                  <Code className="mr-2 h-4 w-4" />
                  Copy Embed Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Documents</CardTitle>
              <CardDescription>Upload and manage documents for this agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-2xl p-6 text-center">
                <Input
                  type="file"
                  className="hidden"
                  id="document-upload"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Label htmlFor="document-upload" className="flex flex-col items-center gap-2 cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">Drag & drop files or click to browse</span>
                  <span className="text-xs text-muted-foreground">
                    Upload brochures, floor plans, and other project documents
                  </span>
                </Label>
              </div>

              {documents.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        {doc.type.includes("image") ? (
                          <img
                            src={doc.url || "/placeholder.svg"}
                            alt={doc.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-secondary">
                            <File className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <p className="text-sm font-medium truncate">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(doc.size / 1024).toFixed(0)} KB • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeDocument(doc.id)}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No documents yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload documents to enhance your agent's knowledge base
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Recordings</CardTitle>
              <CardDescription>Listen to recorded conversations with this agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <Card key={conversation.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{conversation.caller}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {conversation.duration}
                        </div>
                      </div>
                      <CardDescription>{new Date(conversation.date).toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="bg-muted rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setIsPlaying(!isPlaying)}
                            >
                              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setIsMuted(!isMuted)}
                            >
                              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                          </div>
                          <div className="text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                        </div>
                        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcripts" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Transcripts</CardTitle>
              <CardDescription>View detailed transcripts of conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={conversations[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  {conversations.map((conversation) => (
                    <TabsTrigger key={conversation.id} value={conversation.id}>
                      {conversation.caller} - {new Date(conversation.date).toLocaleDateString()}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {conversations.map((conversation) => (
                  <TabsContent key={conversation.id} value={conversation.id} className="space-y-4 pt-4">
                    <div className="space-y-4">
                      {conversation.transcript.map((entry, index) => (
                        <div key={index} className={`flex gap-3 ${entry.speaker === "Agent" ? "justify-end" : ""}`}>
                          <div
                            className={`rounded-lg p-3 max-w-[80%] ${
                              entry.speaker === "Agent" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                            }`}
                          >
                            <div className="font-semibold text-xs mb-1">{entry.speaker}</div>
                            <div>{entry.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
