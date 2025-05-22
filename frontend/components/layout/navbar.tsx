"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { NotificationCenter } from "@/components/notifications/notification-center"

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-64 rounded-full bg-background pl-8 md:w-80" />
          </div>
          <NotificationCenter />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
