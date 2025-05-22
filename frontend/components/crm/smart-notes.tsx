"use client"

import { useState } from "react"
import { Brain, Lightbulb, ThumbsDown, ThumbsUp, RefreshCw, Copy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

interface SmartNotesProps {
  leadName: string
  transcript?: Array<{ sender: string; text: string; timestamp: string }>
  className?: string
}

export function SmartNotes({ leadName, transcript, className }: SmartNotesProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  // In a real app, these would be generated from the transcript using AI
  const customerInterests = [
    { id: 1, text: "3-bedroom units with ocean view", confidence: "high" },
    { id: 2, text: "Budget around $1.5M", confidence: "high" },
    { id: 3, text: "Prefers higher floors (15th floor or above)", confidence: "medium" },
    { id: 4, text: "Interested in corner units with larger balconies", confidence: "medium" },
    { id: 5, text: "Looking for good amenities, especially gym and pool", confidence: "low" },
  ]

  const customerConcerns = [
    { id: 1, text: "Concerned about noise from nearby construction", confidence: "high" },
    { id: 2, text: "Worried about potential HOA fee increases", confidence: "medium" },
    { id: 3, text: "Expressed hesitation about the parking situation", confidence: "medium" },
    { id: 4, text: "Mentioned timeline might be an issue", confidence: "low" },
  ]

  const suggestedActions = [
    "Send floor plans for corner units on 15th floor and above",
    "Provide detailed HOA fee history and projections",
    "Share information about construction timeline and noise mitigation",
    "Arrange a virtual tour focusing on ocean views and balconies",
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate AI processing time
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Smart Notes Refreshed",
        description: "AI has analyzed the latest conversation data.",
      })
    }, 1500)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard.",
    })
  }

  const copyAllInterests = () => {
    const text = customerInterests.map((item) => `- ${item.text}`).join("\n")
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "All interests have been copied to your clipboard.",
    })
  }

  const copyAllConcerns = () => {
    const text = customerConcerns.map((item) => `- ${item.text}`).join("\n")
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "All concerns have been copied to your clipboard.",
    })
  }

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "high":
        return <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">High confidence</Badge>
      case "medium":
        return <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Medium confidence</Badge>
      case "low":
        return <Badge className="ml-2 bg-gray-100 text-gray-800 hover:bg-gray-100">Low confidence</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            <CardTitle className="text-base">Smart Notes</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Analyzing..." : "Refresh"}
          </Button>
        </div>
        <CardDescription>
          AI-generated insights from {leadName}'s conversations to help you close the deal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="interests">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interests">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Interests
            </TabsTrigger>
            <TabsTrigger value="concerns">
              <ThumbsDown className="mr-2 h-4 w-4" />
              Concerns
            </TabsTrigger>
            <TabsTrigger value="actions">
              <Lightbulb className="mr-2 h-4 w-4" />
              Suggested Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interests" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">What the customer is looking for:</h3>
              <Button variant="ghost" size="sm" onClick={copyAllInterests}>
                <Copy className="mr-2 h-3 w-3" />
                Copy All
              </Button>
            </div>
            <ul className="space-y-3">
              {customerInterests.map((item) => (
                <li key={item.id} className="flex items-start justify-between group">
                  <div className="flex items-start">
                    <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                    {getConfidenceBadge(item.confidence)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(item.text)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="concerns" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">What the customer is concerned about:</h3>
              <Button variant="ghost" size="sm" onClick={copyAllConcerns}>
                <Copy className="mr-2 h-3 w-3" />
                Copy All
              </Button>
            </div>
            <ul className="space-y-3">
              {customerConcerns.map((item) => (
                <li key={item.id} className="flex items-start justify-between group">
                  <div className="flex items-start">
                    <ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                    {getConfidenceBadge(item.confidence)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(item.text)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4 pt-4">
            <h3 className="text-sm font-medium">Recommended next steps:</h3>
            <ul className="space-y-3">
              {suggestedActions.map((action, index) => (
                <li key={index} className="flex items-start justify-between group">
                  <div className="flex items-start">
                    <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{action}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(action)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
