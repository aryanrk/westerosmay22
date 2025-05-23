"use client"

import { LeadsTable } from "@/components/leads/leads-table"

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">
          View and manage leads generated from your AI voice conversations.
        </p>
      </div>

      <LeadsTable leads={[]} />
    </div>
  )
}
