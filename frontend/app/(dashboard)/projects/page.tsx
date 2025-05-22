"use client"

import { useState } from "react"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectForm } from "@/components/projects/project-form"
import { ProjectDetails } from "@/components/projects/project-details"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Sample data
const sampleProjects = [
  {
    id: "1",
    name: "Luxury Towers",
    description:
      "Premium residential towers with 2, 3, and 4 BHK apartments featuring panoramic city views and world-class amenities.",
    location: "Bandra, Mumbai",
    type: "residential",
    status: "ongoing",
    agents: 2,
    documents: 15,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Garden Villas",
    description: "Exclusive villa community with private gardens, swimming pools, and smart home technology.",
    location: "Whitefield, Bangalore",
    type: "villa",
    status: "upcoming",
    agents: 1,
    documents: 8,
  },
  {
    id: "3",
    name: "Downtown Lofts",
    description:
      "Modern loft apartments in the heart of the city with industrial design elements and open floor plans.",
    location: "Connaught Place, Delhi",
    type: "apartment",
    status: "ongoing",
    agents: 1,
    documents: 12,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Seaside Residences",
    description:
      "Luxury beachfront apartments with unobstructed sea views, private beach access, and resort amenities.",
    location: "Juhu, Mumbai",
    type: "residential",
    status: "completed",
    agents: 0,
    documents: 20,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(sampleProjects)
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
