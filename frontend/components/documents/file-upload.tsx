"use client"

import type React from "react"

import { useState } from "react"
import { File, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploadProps {
  onUpload: (files: File[], project: string, agent: string) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [project, setProject] = useState("")
  const [agent, setAgent] = useState("")

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
    onUpload(files, project, agent)
    setFiles([])
    setProject("")
    setAgent("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Select value={project} onValueChange={setProject} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="luxury-towers">Luxury Towers</SelectItem>
              <SelectItem value="garden-villas">Garden Villas</SelectItem>
              <SelectItem value="downtown-lofts">Downtown Lofts</SelectItem>
              <SelectItem value="seaside-residences">Seaside Residences</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="agent">Agent</Label>
          <Select value={agent} onValueChange={setAgent} required>
            <SelectTrigger>
              <SelectValue placeholder="Select an agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="luxury-assistant">Luxury Assistant</SelectItem>
              <SelectItem value="garden-guide">Garden Guide</SelectItem>
              <SelectItem value="downtown-expert">Downtown Expert</SelectItem>
              <SelectItem value="seaside-specialist">Seaside Specialist</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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

      {files.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {file.type.includes("image") ? (
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <File className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button type="submit" disabled={files.length === 0 || !project || !agent}>
        Upload Documents
      </Button>
    </form>
  )
}
