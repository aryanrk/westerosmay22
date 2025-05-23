"use client"

import { useState } from "react"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectForm } from "@/components/projects/project-form"
import { ProjectDetails } from "@/components/projects/project-details"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const handleCreateProject = (data: any) => {
    const newProject = {
      id: String(projects.length + 1),
      name: data.name,
      description: data.description,
      location: data.location || "",
      type: data.type || "",
      status: data.status || "ongoing",
      agents: data.agentIds?.length || 0,
      documents: 0,
    }

    setProjects((prev) => [...prev, newProject])
    setFormOpen(false)
  }

  const handleSelectProject = (project: any) => {
    setSelectedProject(project)
    setDetailsOpen(true)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId))
  }

  const handleSaveProject = (updatedProject: any) => {
    setProjects((prev) => prev.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
    setDetailsOpen(false)
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
