"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface WelcomeBannerProps {
  name: string
  onCreateAgent: () => void
}

export function WelcomeBanner({ name, onCreateAgent }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-soft">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {name}!</h1>
          <p className="mt-1 text-primary-foreground/80">
            Here's what's happening with your AI voice assistants today.
          </p>
        </div>
        <Button onClick={onCreateAgent} className="mt-4 md:mt-0 bg-white text-primary hover:bg-white/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Agent
        </Button>
      </div>
      <div className="absolute right-0 top-0 -z-10 h-full w-1/3 bg-gradient-to-l from-primary-foreground/10 to-transparent" />
    </div>
  )
}
