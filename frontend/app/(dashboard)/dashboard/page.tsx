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
      <WelcomeBanner name="User" onCreateAgent={() => setCreateAgentOpen(true)} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leads" value="0" icon={BarChart3} description="No data yet" />
        <StatCard title="Active Agents" value="0" icon={Users} description="Create your first agent" />
        <StatCard title="Total Projects" value="0" icon={Building2} description="No projects yet" />
        <StatCard title="WhatsApp Messages" value="0" icon={MessageSquare} description="No messages yet" />
      </div>

      {/* Analytics Section */}
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
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                No data available yet
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                No data available yet
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground mt-1">
                No data available yet
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground mt-1">
                No data available yet
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
                <p className="text-sm">No conversation data to display</p>
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
                <p className="text-sm">No lead source data to display</p>
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
              <p className="text-sm">No project performance data to display</p>
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
            <div className="py-8 text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No leads yet</p>
              <p className="text-xs mt-1">Leads will appear here once you start getting conversations</p>
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
            <div className="py-8 text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No agents created yet</p>
              <p className="text-xs mt-1">Create your first AI voice agent to get started</p>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" asChild>
                <Link href="/agents">Create Agent</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateAgentDialog 
        open={createAgentOpen} 
        onOpenChange={setCreateAgentOpen} 
        onSubmit={handleCreateAgent} 
        projects={[]} 
      />
    </div>
  )
}
