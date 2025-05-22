"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export function WhatsAppSettings() {
  const [whatsappTemplate, setWhatsappTemplate] = useState(
    "Hello {{1}}, thank you for your interest in {{2}}. I'm your AI assistant and I'll help you with information about our properties.",
  )
  const [fallbackResponse, setFallbackResponse] = useState(
    "I'm sorry, I couldn't understand your query. Please try rephrasing or contact our sales team at sales@realvoice.ai",
  )
  const [widgetCode, setWidgetCode] = useState(
    '<script src="https://realvoice.ai/widget.js" data-project-id="YOUR_PROJECT_ID"></script>',
  )

  const handleSaveTemplate = () => {
    toast({
      title: "Settings saved",
      description: "Your WhatsApp template has been updated successfully.",
    })
  }

  const handleSaveFallback = () => {
    toast({
      title: "Settings saved",
      description: "Your fallback response has been updated successfully.",
    })
  }

  const copyWidgetCode = () => {
    navigator.clipboard.writeText(widgetCode)
    toast({
      title: "Copied to clipboard",
      description: "Widget code has been copied to your clipboard.",
    })
  }

  return (
    <Tabs defaultValue="whatsapp" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="whatsapp">WhatsApp Templates</TabsTrigger>
        <TabsTrigger value="fallback">Fallback Responses</TabsTrigger>
        <TabsTrigger value="widget">Widget Integration</TabsTrigger>
      </TabsList>

      <TabsContent value="whatsapp">
        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Template Configuration</CardTitle>
            <CardDescription>Customize the template used for WhatsApp messages sent by your AI agents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-template">Message Template</Label>
              <Textarea
                id="whatsapp-template"
                value={whatsappTemplate}
                onChange={(e) => setWhatsappTemplate(e.target.value)}
                rows={5}
                placeholder="Enter your WhatsApp template message..."
              />
              <p className="text-xs text-muted-foreground">
                Use &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc. as placeholders for dynamic content.
              </p>
            </div>
            <Button onClick={handleSaveTemplate}>Save Template</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="fallback">
        <Card>
          <CardHeader>
            <CardTitle>Fallback Response Customization</CardTitle>
            <CardDescription>Set the response your AI will use when it cannot answer a query.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fallback-response">Fallback Message</Label>
              <Textarea
                id="fallback-response"
                value={fallbackResponse}
                onChange={(e) => setFallbackResponse(e.target.value)}
                rows={5}
                placeholder="Enter your fallback response message..."
              />
            </div>
            <Button onClick={handleSaveFallback}>Save Response</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="widget">
        <Card>
          <CardHeader>
            <CardTitle>Website Widget Integration</CardTitle>
            <CardDescription>
              Add the RealVoice AI widget to your website to enable voice assistant functionality.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-id">Project ID</Label>
              <Input id="project-id" placeholder="YOUR_PROJECT_ID" className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="widget-code">Widget Code</Label>
              <div className="relative">
                <Textarea id="widget-code" value={widgetCode} readOnly rows={3} className="font-mono pr-20" />
                <Button size="sm" onClick={copyWidgetCode} className="absolute right-2 top-2">
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste this code snippet just before the closing &lt;/body&gt; tag on your website.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
