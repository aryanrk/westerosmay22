"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Project } from "@/lib/api"

interface CreateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  projects: Project[]
  loading?: boolean
}

// Default professional prompts for real estate AI agents
const DEFAULT_SYSTEM_PROMPT = `You are an expert real estate assistant and lead qualification specialist. Your primary goals are to:

1. LEAD QUALIFICATION: Naturally gather key information throughout the conversation:
   - Budget range and financing status
   - Preferred locations/neighborhoods
   - Property type preferences (house, condo, townhouse, etc.)
   - Timeline for buying/selling
   - Current housing situation
   - Contact information (name, phone, email)
   - Specific needs/must-haves

2. CONVERSATION STYLE:
   - Be warm, professional, and consultative
   - Ask one question at a time to avoid overwhelming users
   - Use natural conversation flow - don't make it feel like an interrogation
   - Listen actively and reference previous answers
   - Show genuine interest in helping them find their perfect property

3. REAL ESTATE EXPERTISE:
   - Demonstrate knowledge of local market conditions
   - Discuss property features, neighborhoods, and market trends
   - Explain the buying/selling process when relevant
   - Provide valuable insights and advice
   - Address common concerns and objections

4. LEAD NURTURING:
   - Keep conversations engaging and helpful
   - Offer to schedule property viewings or consultations
   - Suggest next steps based on their needs
   - Create urgency when appropriate (market conditions, inventory, etc.)
   - Always aim to get contact information before ending the conversation

5. PROFESSIONALISM:
   - Maintain confidentiality and professionalism
   - Be honest about property limitations
   - Set realistic expectations
   - Follow up on commitments made during conversations

Remember: Every conversation is an opportunity to help someone find their dream home while gathering the information needed to serve them better. Be helpful first, sales-focused second.`

const DEFAULT_FIRST_MESSAGE = `Hi there! 👋 I'm your personal real estate assistant, and I'm excited to help you with your property journey! 

Whether you're looking to buy your dream home, sell your current property, or just exploring the market, I'm here to provide expert guidance and answer any questions you might have.

To get started, could you tell me a bit about what brings you here today? Are you currently looking to buy, sell, or maybe both? 🏡`

export function CreateAgentDialog({ open, onOpenChange, onSubmit, projects, loading = false }: CreateAgentDialogProps) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedVoice, setSelectedVoice] = useState<string>("")

  // Available ElevenLabs voices
  const voices = [
    { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel - Calm and Professional" },
    { id: "pNInz6obpgDQGcFmaJgB", name: "Adam - Deep and Authoritative" },
    { id: "ErXwobaYiN019PkySvjV", name: "Antoni - Well-rounded" },
    { id: "VR6AewLTigWG4xSOukaG", name: "Arnold - Crisp and Clear" },
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella - Soft and Gentle" },
    { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi - Strong and Confident" },
    { id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli - Emotional and Expressive" },
    { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh - Deep and Resonant" },
    { id: "yoZ06aMxZJJ28mfd3POQ", name: "Sam - Raspy and Distinctive" },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get("name"),
      system_prompt: formData.get("system_prompt"),
      first_message: formData.get("first_message"),
      voice_id: selectedVoice,
      project: selectedProject,
      files,
    }
    onSubmit(data)
    
    // Reset form
    setFiles([])
    setSelectedProject("")
    setSelectedVoice("")
    ;(e.target as HTMLFormElement).reset()
  }

  const resetForm = () => {
    setFiles([])
    setSelectedProject("")
    setSelectedVoice("")
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && !loading) {
        resetForm()
      }
      onOpenChange(isOpen)
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>Configure your AI voice assistant agent for real estate projects.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="e.g., Luxury Homes Assistant" 
                required 
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="system_prompt">System Prompt *</Label>
              <Textarea
                id="system_prompt"
                name="system_prompt"
                defaultValue={DEFAULT_SYSTEM_PROMPT}
                rows={8}
                required
                disabled={loading}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                This defines how your agent behaves and responds to users. The default prompt is optimized for lead qualification and conversion.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="first_message">First Message *</Label>
              <Textarea
                id="first_message"
                name="first_message"
                defaultValue={DEFAULT_FIRST_MESSAGE}
                rows={4}
                required
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                The initial greeting message users will hear when they start a conversation. The default is optimized for engagement.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="voice">Voice *</Label>
              <Select 
                value={selectedVoice} 
                onValueChange={setSelectedVoice}
                required
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose the voice that best fits your brand and customer base.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <Select 
                value={selectedProject} 
                onValueChange={setSelectedProject}
                required
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-projects" disabled>
                      No projects available - Create a project first
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Knowledge Base Files (Optional)</Label>
              <div className="border-2 border-dashed rounded-2xl p-6 text-center">
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={loading}
                />
                <Label htmlFor="file-upload" className={`flex flex-col items-center gap-2 ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">Drag & drop files or click to browse</span>
                  <span className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX, TXT (Max 10MB each)</span>
                </Label>
              </div>
              {files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">Uploaded Files:</p>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-secondary rounded-lg p-2 text-sm">
                        <span className="truncate">{file.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFile(index)}
                          disabled={loading}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove file</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || projects.length === 0 || !selectedVoice}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Save & Deploy
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
