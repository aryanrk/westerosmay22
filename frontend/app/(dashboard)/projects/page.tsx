"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectForm } from "@/components/projects/project-form"
import { ProjectDetails } from "@/components/projects/project-details"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { api, Project } from "@/lib/api"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { toast } = useToast()

  // For now, we'll use the same organization ID as agents page
  // In a real app, this would come from user context/auth
  const organizationId = "83d4f887-471d-4873-b419-dd3242d3c3bc"

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const projectsData = await api.getProjects(organizationId)
      setProjects(projectsData)
    } catch (error) {
      console.error('Error loading projects:', error)
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (data: any) => {
    try {
      const newProject = await api.createProject({
        name: data.name,
        description: data.description,
        organization_id: organizationId,
        status: data.status || "active"
      })

      setProjects((prev) => [newProject, ...prev])
      setFormOpen(false)
      toast({
        title: "Success",
        description: "Project created successfully!",
      })
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
    setDetailsOpen(true)
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await api.deleteProject(projectId)
      setProjects((prev) => prev.filter((project) => project.id !== projectId))
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      })
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveProject = async (updatedProject: Project) => {
    try {
      const updated = await api.updateProject(updatedProject.id, updatedProject)
      setProjects((prev) => prev.map((project) => (project.id === updated.id ? updated : project)))
      setDetailsOpen(false)
      toast({
        title: "Success",
        description: "Project updated successfully!",
      })
    } catch (error) {
      console.error('Error updating project:', error)
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Manage your real estate projects and their associated AI voice agents.</p>
      </div>

      <ProjectList
        projects={projects}
        onSelect={handleSelectProject}
        onDelete={handleDeleteProject}
        onCreateNew={() => {
          setFormOpen(true)
        }}
      />

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <ProjectForm onSubmit={handleCreateProject} onCancel={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[900px]">
          {selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onSave={handleSaveProject}
              onClose={() => setDetailsOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
