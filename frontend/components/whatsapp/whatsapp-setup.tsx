"use client"

import { useState } from "react"
import { AlertCircle, Copy, ExternalLink, RefreshCw, Save, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

export function WhatsAppSetup() {
  const [apiKey, setApiKey] = useState("wh_123456789abcdefghijklmnopqrstuvwxyz")
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567")
  const [businessName, setBusinessName] = useState("RealVoice AI")
  const [webhookUrl, setWebhookUrl] = useState("https://realvoice.ai/api/whatsapp/webhook")
  const [isConnected, setIsConnected] = useState(true)
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true)
  const [documentSharingEnabled, setDocumentSharingEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your WhatsApp integration settings have been updated.",
    })
  }

  const handleReconnect = () => {
    toast({
      title: "Reconnected",
      description: "Your WhatsApp Business API connection has been refreshed.",
    })
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: message,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Business API Connection</CardTitle>
          <CardDescription>Configure your WhatsApp Business API connection settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">Connection Status</h3>
              <p className="text-sm text-muted-foreground">Your WhatsApp Business API connection status</p>
            </div>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Connected</span>
                </>
              ) : (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium">Disconnected</span>
                </>
              )}
              <Button variant="outline" size="sm" onClick={handleReconnect}>
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Reconnect
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-20"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => copyToClipboard(apiKey, "API key copied to clipboard")}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Your WhatsApp Business API key for authentication</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-number">WhatsApp Business Phone Number</Label>
            <Input id="phone-number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              The phone number associated with your WhatsApp Business account
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-name">Business Display Name</Label>
            <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              The name that will be displayed to leads in WhatsApp messages
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="relative">
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="pr-20"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => copyToClipboard(webhookUrl, "Webhook URL copied to clipboard")}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">The URL that will receive WhatsApp webhook events</p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              You need to verify your WhatsApp Business account and phone number with Meta before sending messages.{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Learn more
                <ExternalLink className="ml-1 h-3 w-3 inline" />
              </a>
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Connection Settings
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Features</CardTitle>
          <CardDescription>
            Configure which WhatsApp features to enable for your real estate AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-reply">Automated Replies</Label>
              <p className="text-sm text-muted-foreground">Automatically respond to lead inquiries via WhatsApp</p>
            </div>
            <Switch id="auto-reply" checked={autoReplyEnabled} onCheckedChange={setAutoReplyEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="document-sharing">Document Sharing</Label>
              <p className="text-sm text-muted-foreground">Allow sending project documents to leads via WhatsApp</p>
            </div>
            <Switch
              id="document-sharing"
              checked={documentSharingEnabled}
              onCheckedChange={setDocumentSharingEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Admin Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when leads respond to WhatsApp messages
              </p>
            </div>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Feature Settings
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Business Manager</CardTitle>
          <CardDescription>Access your WhatsApp Business Manager account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Settings className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Manage Your WhatsApp Business Account</h3>
            <p className="text-muted-foreground mb-4">
              Access your WhatsApp Business Manager to manage your business profile, catalog, and other settings.
            </p>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Open WhatsApp Business Manager
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
