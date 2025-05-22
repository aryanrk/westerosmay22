"use client"

import { useState } from "react"
import { BarChart3, MessageSquare, Users, Building2, LineChart, PieChart } from "lucide-react"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { StatCard } from "@/components/dashboard/stat-card"
import { CreateAgentDialog } from "@/components/agents/create-agent-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function DashboardPage() {
  const [createAgentOpen, setCreateAgentOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("7d")

  const handleCreateAgent = (data: any) => {
    console.log("Creating agent with data:", data)
    setCreateAgentOpen(false)
  }

  return (
    <div className="space-y-6">
      <WelcomeBanner name="John" onCreateAgent={() => setCreateAgentOpen(true)} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leads" value="128" icon={BarChart3} description="+12% from last month" />
        <StatCard title="Active Agents" value="5" icon={Users} description="Across 3 projects" />
        <StatCard title="Total Projects" value="4" icon={Building2} description="2 active, 2 completed" />
        <StatCard title="WhatsApp Messages" value="1,204" icon={MessageSquare} description="92% response rate" />
      </div>

      {/* Analytics Section (Replacing the Knowledge Base, Projects, Widget cards) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold">Analytics Overview</h2>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+12.5%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">328</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+8.2%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">26.3%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500">-2.1%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2s</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">-0.3s</span> from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Conversations Over Time</CardTitle>
              <CardDescription>Daily conversation volume</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <LineChart className="h-16 w-16 mb-2" />
                <p className="text-sm">Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>Where your leads are coming from</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <PieChart className="h-16 w-16 mb-2" />
                <p className="text-sm">Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
            <CardDescription>Conversation and lead metrics by project</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mb-2" />
              <p className="text-sm">Chart visualization would appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Your most recent customer leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Michael Johnson", project: "Luxury Towers", time: "2 hours ago" },
                { name: "Sarah Williams", project: "Garden Villas", time: "5 hours ago" },
                { name: "David Brown", project: "Downtown Lofts", time: "1 day ago" },
                { name: "Jennifer Davis", project: "Seaside Residences", time: "2 days ago" },
              ].map((lead, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-medium text-primary">{lead.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.project}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{lead.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" asChild>
                <Link href="/crm">View All Leads</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
            <CardDescription>Your deployed AI voice assistants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Luxury Towers Assistant", status: "active", conversations: 42 },
                { name: "Garden Villas Guide", status: "active", conversations: 28 },
                { name: "Downtown Lofts Expert", status: "inactive", conversations: 0 },
                { name: "Seaside Residences Specialist", status: "active", conversations: 35 },
              ].map((agent, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        agent.status === "active" ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <MessageSquare
                        className={`h-4 w-4 ${agent.status === "active" ? "text-green-600" : "text-gray-400"}`}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {agent.status === "active"
                          ? `${agent.conversations} conversations this week`
                          : "Currently inactive"}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      agent.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {agent.status === "active" ? "Active" : "Inactive"}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" asChild>
                <Link href="/agents">Manage Agents</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateAgentDialog open={createAgentOpen} onOpenChange={setCreateAgentOpen} onSubmit={handleCreateAgent} />
    </div>
  )
}
