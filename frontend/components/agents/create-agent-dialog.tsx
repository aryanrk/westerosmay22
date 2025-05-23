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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Project } from "@/lib/api"

interface CreateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  projects: Project[]
  loading?: boolean
}

export function CreateAgentDialog({ open, onOpenChange, onSubmit, projects, loading = false }: CreateAgentDialogProps) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedProject, setSelectedProject] = useState<string>("")

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
      project: selectedProject,
      files,
    }
    onSubmit(data)
    
    // Reset form
    setFiles([])
    setSelectedProject("")
    ;(e.target as HTMLFormElement).reset()
  }

  const resetForm = () => {
    setFiles([])
    setSelectedProject("")
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && !loading) {
        resetForm()
      }
      onOpenChange(isOpen)
    }}>
      <DialogContent className="sm:max-w-[500px]">
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
              <Label>Knowledge Base Files</Label>
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
            <Button type="submit" disabled={loading || projects.length === 0}>
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
