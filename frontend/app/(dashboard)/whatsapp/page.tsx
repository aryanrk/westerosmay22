"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WhatsAppTemplates } from "@/components/whatsapp/whatsapp-templates"
import { WhatsAppAutomation } from "@/components/whatsapp/whatsapp-automation"
import { WhatsAppLogs } from "@/components/whatsapp/whatsapp-logs"
import { WhatsAppSetup } from "@/components/whatsapp/whatsapp-setup"

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState("automation")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">WhatsApp Integration</h1>
        <p className="text-muted-foreground">Automate lead engagement with WhatsApp messages and document sharing.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="setup">Setup & Configuration</TabsTrigger>
          <TabsTrigger value="logs">Message Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="automation" className="space-y-6">
          <WhatsAppAutomation />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <WhatsAppTemplates />
        </TabsContent>

        <TabsContent value="setup" className="space-y-6">
          <WhatsAppSetup />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <WhatsAppLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
