"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { WhatsAppSettings } from "@/components/settings/whatsapp-settings"

// Import these components if they exist, otherwise create placeholder components
const SubscriptionPlans = ({
  currentPlan,
  onSelectPlan,
}: { currentPlan: string; onSelectPlan: (plan: string) => void }) => (
  <div className="grid gap-6 md:grid-cols-3">
    {["starter", "professional", "enterprise"].map((plan) => (
      <Card key={plan} className={currentPlan === plan ? "border-primary" : ""}>
        <CardHeader>
          <CardTitle className="capitalize">{plan}</CardTitle>
          <CardDescription>
            {plan === "starter" && "For individuals and small teams"}
            {plan === "professional" && "For growing businesses"}
            {plan === "enterprise" && "For large organizations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-3xl font-bold">
              {plan === "starter" && "₹9,900"}
              {plan === "professional" && "₹49,000"}
              {plan === "enterprise" && "Custom"}
            </span>
            {plan !== "enterprise" && <span className="text-muted-foreground"> /month</span>}
          </div>
          <Button
            variant={currentPlan === plan ? "default" : "outline"}
            className="w-full"
            onClick={() => onSelectPlan(plan)}
          >
            {currentPlan === plan ? "Current Plan" : "Select Plan"}
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
)

const BillingHistory = ({ invoices }: { invoices: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Billing History</CardTitle>
      <CardDescription>View and download your past invoices.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">{invoice.id}</p>
              <p className="text-sm text-muted-foreground">{invoice.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">{invoice.amount}</p>
              <span className={`text-xs ${invoice.status === "paid" ? "text-green-500" : "text-amber-500"}`}>
                {invoice.status.toUpperCase()}
              </span>
              <Button variant="outline" size="sm" asChild>
                <a href={invoice.downloadUrl} download>
                  Download
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const PaymentMethods = ({
  paymentMethods,
  onAddPaymentMethod,
  onRemovePaymentMethod,
  onSetDefaultPaymentMethod,
}: {
  paymentMethods: any[]
  onAddPaymentMethod: (data: any) => void
  onRemovePaymentMethod: (id: string) => void
  onSetDefaultPaymentMethod: (id: string) => void
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Payment Methods</CardTitle>
      <CardDescription>Manage your payment methods.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="rounded-md border p-2">
                {method.brand === "Visa" && "VISA"}
                {method.brand === "Mastercard" && "MC"}
                {method.brand === "Amex" && "AMEX"}
              </div>
              <div>
                <p className="font-medium">
                  {method.brand} •••• {method.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {method.expMonth}/{method.expYear}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {method.isDefault ? (
                <span className="text-xs text-green-500">DEFAULT</span>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => onSetDefaultPaymentMethod(method.id)}>
                  Set as default
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => onRemovePaymentMethod(method.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => onAddPaymentMethod({})}>
          Add Payment Method
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default function SettingsPage() {
  const [currentPlan, setCurrentPlan] = useState("professional")

  // Sample data for billing history
  const invoices = [
    {
      id: "INV-001",
      date: "May 1, 2023",
      amount: "₹49,000",
      status: "paid" as const,
      downloadUrl: "#",
    },
    {
      id: "INV-002",
      date: "Jun 1, 2023",
      amount: "₹49,000",
      status: "paid" as const,
      downloadUrl: "#",
    },
    {
      id: "INV-003",
      date: "Jul 1, 2023",
      amount: "₹49,000",
      status: "paid" as const,
      downloadUrl: "#",
    },
  ]

  // Sample data for payment methods
  const paymentMethods = [
    {
      id: "pm_1",
      type: "card" as const,
      last4: "4242",
      expMonth: 12,
      expYear: 2024,
      brand: "Visa",
      isDefault: true,
    },
  ]

  const handleSelectPlan = (plan: string) => {
    setCurrentPlan(plan)
    toast({
      title: "Plan updated",
      description: `Your subscription has been updated to the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
    })
  }

  const handleAddPaymentMethod = (data: any) => {
    console.log("Adding payment method:", data)
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    })
  }

  const handleRemovePaymentMethod = (id: string) => {
    console.log("Removing payment method:", id)
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully.",
    })
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    console.log("Setting default payment method:", id)
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    })
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account information and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Real Estate" />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription plan and billing cycle.</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionPlans currentPlan={currentPlan} onSelectPlan={handleSelectPlan} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <PaymentMethods
              paymentMethods={paymentMethods}
              onAddPaymentMethod={handleAddPaymentMethod}
              onRemovePaymentMethod={handleRemovePaymentMethod}
              onSetDefaultPaymentMethod={handleSetDefaultPaymentMethod}
            />

            <BillingHistory invoices={invoices} />
          </div>
        </TabsContent>

        <TabsContent value="whatsapp">
          <WhatsAppSettings />
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for programmatic access to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-center">
                <div className="max-w-md">
                  <h3 className="text-lg font-medium">API Access Coming Soon</h3>
                  <p className="mt-2 text-muted-foreground">
                    We're working on providing API access to your RealVoice AI platform. This feature will be available
                    soon.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
