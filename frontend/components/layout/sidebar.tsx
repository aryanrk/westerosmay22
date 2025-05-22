"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Building, ChevronRight, LogOut, MessageSquare, Settings, Users, LayoutDashboard, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const onToggle = () => {
    setIsCollapsed((prev) => !prev)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className="md:flex">
      <Sidebar isCollapsed={isCollapsed} isOpen={isOpen} onToggle={onToggle} onClose={onClose} />
      <main className="flex-1">{children}</main>
    </div>
  )
}

interface SidebarProps {
  isCollapsed: boolean
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

function Sidebar({ isCollapsed, isOpen, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const navigation = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Agents",
      href: "/agents",
      icon: Bot,
      variant: "default",
    },
    {
      title: "CRM",
      href: "/crm",
      icon: Users,
      variant: "default",
    },
    {
      title: "Projects",
      href: "/projects",
      icon: Building,
      variant: "default",
    },

    {
      title: "WhatsApp",
      href: "/whatsapp",
      icon: MessageSquare,
      variant: "default",
    },

    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      variant: "default",
    },
  ]

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-background transition-all duration-300 md:relative",
          isCollapsed ? "md:w-[64px]" : "md:w-[256px]",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Sidebar Header */}
        <div className={cn("flex h-14 items-center border-b px-4", isCollapsed ? "justify-center" : "justify-between")}>
          <Link href="/dashboard" className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            {!isCollapsed && <span className="font-bold">RealVoice AI</span>}
          </Link>

          {!isCollapsed && (
            <Button variant="ghost" size="icon" onClick={onToggle} className="md:flex hidden">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          )}

          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="absolute right-[-12px] top-10 h-6 w-6 rounded-full border bg-background md:flex hidden"
            >
              <ChevronRight className="h-3 w-3 rotate-180" />
              <span className="sr-only">Expand Sidebar</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>

        {/* Sidebar Content */}
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navigation.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === route.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  isCollapsed && "justify-center py-3",
                )}
              >
                <route.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-1")} />
                {!isCollapsed && <span>{route.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className={cn("mt-auto border-t p-4", isCollapsed && "flex flex-col items-center")}>
          <div className={cn("flex items-center gap-3", isCollapsed && "flex-col")}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "default"}
            className={cn("mt-2 w-full justify-start text-muted-foreground", isCollapsed && "h-9 w-9")}
          >
            <LogOut className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
            {!isCollapsed && <span>Log out</span>}
          </Button>
        </div>
      </div>
    </>
  )
}
