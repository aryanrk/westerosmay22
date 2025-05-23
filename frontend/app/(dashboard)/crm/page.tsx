"use client"

import { LeadsTable } from "@/components/crm/leads-table"

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CRM & Leads</h1>
        <p className="text-muted-foreground">
          Manage your leads and customer interactions from AI voice conversations.
        </p>
      </div>

      <LeadsTable leads={[]} />
    </div>
  )
}
