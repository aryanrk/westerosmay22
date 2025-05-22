"use client"

import { useState } from "react"
import { Copy, Smartphone, Monitor, Code, Check, Palette, MessageSquare, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"

interface WidgetCustomizerProps {
  agentId: string
  agentName: string
}

export function WidgetCustomizer({ agentId, agentName }: WidgetCustomizerProps) {
  const [primaryColor, setPrimaryColor] = useState("#3B82F6")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [position, setPosition] = useState("bottom-right")
  const [welcomeMessage, setWelcomeMessage] = useState(
    `Hi there! I'm ${agentName}, your AI assistant. How can I help you today?`,
  )
  const [buttonText, setButtonText] = useState("Chat with AI Assistant")
  const [showBranding, setShowBranding] = useState(true)
  const [autoOpen, setAutoOpen] = useState(false)
  const [autoOpenDelay, setAutoOpenDelay] = useState(10)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")
  const [copied, setCopied] = useState(false)

  const widgetCode = `<script src="https://realvoice.ai/widget.js" 
  data-agent-id="${agentId}"
  data-primary-color="${primaryColor}"
  data-text-color="${textColor}"
  data-position="${position}"
  data-welcome-message="${welcomeMessage}"
  data-button-text="${buttonText}"
  data-show-branding="${showBranding}"
  data-auto-open="${autoOpen}"
  data-auto-open-delay="${autoOpenDelay}"
></script>`

  const copyCode = () => {
    navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Widget code has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Widget Customization</CardTitle>
          <CardDescription>Customize how your widget looks and behaves on your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appearance">
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="content">
                <MessageSquare className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="behavior">
                <Settings className="mr-2 h-4 w-4" />
                Behavior
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: primaryColor }} />
                  <Input
                    id="primary-color"
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text-color">Text Color</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: textColor }} />
                  <Input id="text-color" type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Widget Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-branding">Show RealVoice Branding</Label>
                  <p className="text-sm text-muted-foreground">Display "Powered by RealVoice AI" in the widget</p>
                </div>
                <Switch id="show-branding" checked={showBranding} onCheckedChange={setShowBranding} />
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Chat with AI Assistant"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea
                  id="welcome-message"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  placeholder="Hi there! How can I help you today?"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-open">Auto Open Chat</Label>
                  <p className="text-sm text-muted-foreground">Automatically open the chat after a delay</p>
                </div>
                <Switch id="auto-open" checked={autoOpen} onCheckedChange={setAutoOpen} />
              </div>

              {autoOpen && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-open-delay">Auto Open Delay (seconds)</Label>
                    <span className="text-sm">{autoOpenDelay} seconds</span>
                  </div>
                  <Slider
                    id="auto-open-delay"
                    min={5}
                    max={60}
                    step={5}
                    value={[autoOpenDelay]}
                    onValueChange={(value) => setAutoOpenDelay(value[0])}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Widget Preview</CardTitle>
            <div className="flex items-center rounded-md border">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>Preview how your widget will appear on your website.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div
            className={`relative border rounded-lg bg-gray-50 ${
              viewMode === "desktop" ? "w-full aspect-video" : "w-[320px] h-[568px]"
            }`}
          >
            {/* Simulated website content */}
            <div className="absolute inset-0 p-4 flex flex-col">
              <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 w-full bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-3/6 bg-gray-200 rounded mb-4"></div>
            </div>

            {/* Widget button */}
            <div
              className={`absolute ${
                position === "bottom-right"
                  ? "bottom-4 right-4"
                  : position === "bottom-left"
                    ? "bottom-4 left-4"
                    : position === "top-right"
                      ? "top-4 right-4"
                      : "top-4 left-4"
              }`}
            >
              <button
                className="rounded-full px-4 py-2 flex items-center gap-2 shadow-md"
                style={{ backgroundColor: primaryColor, color: textColor }}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">{buttonText}</span>
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full space-y-2">
            <Label htmlFor="embed-code">Embed Code</Label>
            <div className="relative">
              <Textarea id="embed-code" value={widgetCode} readOnly rows={6} className="font-mono text-xs pr-12" />
              <Button size="icon" variant="ghost" className="absolute right-2 top-2" onClick={copyCode}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button className="w-full" onClick={copyCode}>
            <Code className="mr-2 h-4 w-4" />
            Copy Embed Code
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
