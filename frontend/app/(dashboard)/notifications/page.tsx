"use client"

import { useState } from "react"
import { Bell, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "lead" | "system" | "agent"
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Lead",
      description: "Michael Johnson is interested in Luxury Towers",
      time: "2 hours ago",
      read: false,
      type: "lead",
    },
    {
      id: "2",
      title: "Agent Deployed",
      description: "Garden Villas Guide has been successfully deployed",
      time: "5 hours ago",
      read: false,
      type: "agent",
    },
    {
      id: "3",
      title: "System Update",
      description: "New features have been added to your dashboard",
      time: "1 day ago",
      read: true,
      type: "system",
    },
    {
      id: "4",
      title: "New Lead",
      description: "Sarah Williams is interested in Garden Villas",
      time: "2 days ago",
      read: true,
      type: "lead",
    },
    {
      id: "5",
      title: "Conversation Completed",
      description: "AI assistant completed a conversation with David Brown",
      time: "3 days ago",
      read: true,
      type: "agent",
    },
    {
      id: "6",
      title: "Maintenance Scheduled",
      description: "System maintenance scheduled for tomorrow at 2 AM",
      time: "3 days ago",
      read: true,
      type: "system",
    },
    {
      id: "7",
      title: "New Lead",
      description: "Jennifer Davis is interested in Seaside Residences",
      time: "4 days ago",
      read: true,
      type: "lead",
    },
    {
      id: "8",
      title: "Agent Updated",
      description: "Downtown Lofts Expert has been updated with new information",
      time: "5 days ago",
      read: true,
      type: "agent",
    },
  ])

  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "lead":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
        )
      case "agent":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
            <Bell className="h-5 w-5 text-green-600" />
          </div>
        )
      case "system":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
        )
      default:
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </div>
        )
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (filter !== "all" && notification.type !== filter) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">View and manage your notifications from the platform.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>
                You have {notifications.filter((n) => !n.read).length} unread notifications
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <Input
                type="search"
                placeholder="Search notifications..."
                className="w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="lead">Leads</SelectItem>
                <SelectItem value="agent">Agents</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y rounded-lg border">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-4 ${!notification.read ? "bg-muted/50" : ""}`}
                    >
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 text-center rounded-lg border">
                  <div className="space-y-2">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="text-sm font-medium">No notifications found</h3>
                    <p className="text-xs text-muted-foreground">No notifications match your current filters.</p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="unread" className="mt-6">
              {filteredNotifications.filter((n) => !n.read).length > 0 ? (
                <div className="divide-y rounded-lg border">
                  {filteredNotifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 bg-muted/50 p-4">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 text-center rounded-lg border">
                  <div className="space-y-2">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="text-sm font-medium">No unread notifications</h3>
                    <p className="text-xs text-muted-foreground">You've read all your notifications.</p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="read" className="mt-6">
              {filteredNotifications.filter((n) => n.read).length > 0 ? (
                <div className="divide-y rounded-lg border">
                  {filteredNotifications
                    .filter((n) => n.read)
                    .map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-4">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 text-center rounded-lg border">
                  <div className="space-y-2">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="text-sm font-medium">No read notifications</h3>
                    <p className="text-xs text-muted-foreground">You don't have any read notifications.</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
