"use client"

import { useState } from "react"
import { Download, Filter, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LeadDetailsDialog } from "@/components/crm/lead-details-dialog"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: string
  sender: "user" | "ai"
  text: string
  timestamp: string
}

export interface Lead {
  id: string
  name: string
  phoneNumber: string
  project: string
  timestamp: string
  audioUrl?: string
  messages?: Message[]
  status: "new" | "contacted" | "qualified" | "proposal" | "closed-won" | "closed-lost"
  source: string
  budget?: string
  score?: number
  lastContact?: string
  nextFollowUp?: string
  tags?: string[]
  notes?: string
  assignedTo?: string
}

interface LeadsTableProps {
  leads: Lead[]
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")

  const filteredLeads = leads.filter((lead) => {
    // Text search
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phoneNumber.includes(searchQuery) ||
      lead.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.tags && lead.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    // Status filter
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter

    // Source filter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  const exportToCSV = () => {
    // In a real app, this would generate and download a CSV file
    console.log("Exporting leads to CSV")
  }

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setDetailsOpen(true)
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

  const getScoreBadge = (score?: number) => {
    if (!score) return null

    if (score >= 80) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{score}</Badge>
    } else if (score >= 50) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{score}</Badge>
    } else {
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{score}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads..."
            className="w-full sm:w-[300px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Leads</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("new")}>New</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("contacted")}>Contacted</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("qualified")}>Qualified</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("proposal")}>Proposal</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("closed-won")}>Closed Won</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("closed-lost")}>Closed Lost</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Source</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSourceFilter("all")}>All Sources</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter("website")}>Website</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter("whatsapp")}>WhatsApp</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter("referral")}>Referral</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter("social")}>Social Media</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="score">Highest Score</SelectItem>
                <SelectItem value="follow-up">Next Follow-up</SelectItem>
                <SelectItem value="budget">Budget (High to Low)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center rounded-md border">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode("table")}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("cards")}
            >
              <div className="grid grid-cols-2 gap-0.5">
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
              </div>
            </Button>
          </div>

          <Button onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> leads
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
          <TabsTrigger value="proposal">Proposal</TabsTrigger>
          <TabsTrigger value="won">Won</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {viewMode === "table" ? (
            <div className="rounded-2xl border shadow-soft">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Next Follow-up</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleLeadClick(lead)}
                      >
                        <TableCell>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-xs text-muted-foreground">{lead.phoneNumber}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>{lead.project}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>{lead.budget || "—"}</TableCell>
                        <TableCell>{getScoreBadge(lead.score)}</TableCell>
                        <TableCell>
                          {lead.nextFollowUp ? (
                            <div className="text-sm">{lead.nextFollowUp}</div>
                          ) : (
                            <div className="text-sm text-muted-foreground">—</div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No leads found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
                    onClick={() => handleLeadClick(lead)}
                  >
                    <CardContent className="p-0">
                      <div className="border-b p-4">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{lead.name}</div>
                          {getStatusBadge(lead.status)}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">{lead.phoneNumber}</div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Project:</span>
                          <span>{lead.project}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Source:</span>
                          <span>{lead.source}</span>
                        </div>
                        {lead.budget && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Budget:</span>
                            <span>{lead.budget}</span>
                          </div>
                        )}
                        {lead.score && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Score:</span>
                            <span>{getScoreBadge(lead.score)}</span>
                          </div>
                        )}
                        {lead.nextFollowUp && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Next Follow-up:</span>
                            <span>{lead.nextFollowUp}</span>
                          </div>
                        )}
                      </div>
                      {lead.tags && lead.tags.length > 0 && (
                        <div className="border-t p-4">
                          <div className="flex flex-wrap gap-1">
                            {lead.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-6 text-muted-foreground">No leads found</div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Other tabs would filter by status automatically */}
        <TabsContent value="new" className="mt-4">
          {/* Similar content as "all" but filtered for new leads */}
        </TabsContent>
      </Tabs>

      <LeadDetailsDialog lead={selectedLead} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  )
}
