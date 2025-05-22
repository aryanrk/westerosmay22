"use client"

import { useState } from "react"
import { Download, Filter, MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface MessageLog {
  id: string
  leadName: string
  leadPhone: string
  project: string
  templateName: string
  status: "delivered" | "read" | "failed" | "pending"
  sentAt: string
  documents: string[]
  automationRule: string
}

export function WhatsAppLogs() {
  const [logs, setLogs] = useState<MessageLog[]>([
    {
      id: "msg1",
      leadName: "Michael Johnson",
      leadPhone: "+1 (555) 123-4567",
      project: "Luxury Towers",
      templateName: "New Lead Welcome",
      status: "delivered",
      sentAt: "2023-05-15T10:30:00Z",
      documents: ["Luxury Towers Brochure.pdf", "Floor Plans.pdf"],
      automationRule: "New Luxury Towers Lead",
    },
    {
      id: "msg2",
      leadName: "Sarah Williams",
      leadPhone: "+1 (555) 987-6543",
      project: "Garden Villas",
      templateName: "Project Information",
      status: "read",
      sentAt: "2023-05-14T15:45:00Z",
      documents: ["Garden Villas Overview.pdf", "Villa Specifications.pdf"],
      automationRule: "Garden Villas Follow-up",
    },
    {
      id: "msg3",
      leadName: "David Brown",
      leadPhone: "+1 (555) 456-7890",
      project: "Downtown Lofts",
      templateName: "Follow-up Message",
      status: "delivered",
      sentAt: "2023-05-16T09:15:00Z",
      documents: [],
      automationRule: "Downtown Lofts Inquiry",
    },
    {
      id: "msg4",
      leadName: "Jennifer Davis",
      leadPhone: "+1 (555) 789-0123",
      project: "Seaside Residences",
      templateName: "Document Sharing",
      status: "pending",
      sentAt: "2023-05-16T14:00:00Z",
      documents: ["Seaside Residences Catalog.pdf"],
      automationRule: "New Luxury Towers Lead",
    },
    {
      id: "msg5",
      leadName: "Robert Wilson",
      leadPhone: "+1 (555) 234-5678",
      project: "Luxury Towers",
      templateName: "New Lead Welcome",
      status: "failed",
      sentAt: "2023-05-17T11:10:00Z",
      documents: ["Luxury Towers Brochure.pdf", "Floor Plans.pdf"],
      automationRule: "New Luxury Towers Lead",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<MessageLog | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.leadPhone.includes(searchQuery) ||
      log.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.templateName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || log.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (log: MessageLog) => {
    setSelectedLog(log)
    setDetailsOpen(true)
  }

  const exportLogs = () => {
    toast({
      title: "Logs exported",
      description: "Message logs have been exported to CSV.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Delivered</Badge>
      case "read":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Read</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-medium">Message Logs</h2>
          <p className="text-sm text-muted-foreground">Track and monitor WhatsApp messages sent to leads</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[200px] pl-8"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>Delivered</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("read")}>Read</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("failed")}>Failed</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={exportLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-1">
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logs.length} messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{log.leadName}</div>
                    <div className="text-xs text-muted-foreground">{log.leadPhone}</div>
                  </TableCell>
                  <TableCell>{log.project}</TableCell>
                  <TableCell>{log.templateName}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>{formatDate(log.sentAt)}</TableCell>
                  <TableCell>{log.documents.length}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(log)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No message logs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>Detailed information about the WhatsApp message</DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Lead Information</h3>
                  <div className="text-sm">
                    <p className="font-medium">{selectedLog.leadName}</p>
                    <p className="text-muted-foreground">{selectedLog.leadPhone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Message Status</h3>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedLog.status)}
                    <span className="text-sm text-muted-foreground">
                      {selectedLog.status === "failed" && "Failed to deliver"}
                      {selectedLog.status === "delivered" && "Delivered to recipient"}
                      {selectedLog.status === "read" && "Read by recipient"}
                      {selectedLog.status === "pending" && "Waiting to be sent"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Project</h3>
                <p className="text-sm">{selectedLog.project}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Template Used</h3>
                <p className="text-sm">{selectedLog.templateName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Automation Rule</h3>
                <p className="text-sm">{selectedLog.automationRule}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Sent At</h3>
                <p className="text-sm">{formatDate(selectedLog.sentAt)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Documents Sent</h3>
                {selectedLog.documents.length > 0 ? (
                  <ul className="text-sm space-y-1">
                    {selectedLog.documents.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No documents sent</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
