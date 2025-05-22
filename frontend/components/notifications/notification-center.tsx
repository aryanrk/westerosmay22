"use client"

import { useState } from "react"
import { Bell, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "lead" | "system" | "agent"
}

export function NotificationCenter() {
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
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[300px]">
            <TabsContent value="all" className="m-0">
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 ${!notification.read ? "bg-muted/50" : ""}`}
                    >
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center">
                  <div className="space-y-2">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="text-sm font-medium">No notifications</h3>
                    <p className="text-xs text-muted-foreground">You don't have any notifications at the moment.</p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              {notifications.filter((n) => !n.read).length > 0 ? (
                <div className="divide-y">
                  {notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 bg-muted/50 p-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center">
                  <div className="space-y-2">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="text-sm font-medium">No unread notifications</h3>
                    <p className="text-xs text-muted-foreground">You've read all your notifications.</p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="read" className="m-0">
              {notifications.filter((n) => n.read).length > 0 ? (
                <div className="divide-y">
                  {notifications
                    .filter((n) => n.read)
                    .map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center">
                  <div className="space-y-2">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="text-sm font-medium">No read notifications</h3>
                    <p className="text-xs text-muted-foreground">You don't have any read notifications.</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
        <div className="border-t p-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
