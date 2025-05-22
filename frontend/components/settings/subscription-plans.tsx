"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SubscriptionPlansProps {
  currentPlan?: string
  onSelectPlan: (plan: string) => void
}

export function SubscriptionPlans({ currentPlan, onSelectPlan }: SubscriptionPlansProps) {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "₹19,000",
      description: "Perfect for small real estate businesses",
      features: [
        "1 AI Voice Agent",
        "500 conversations/month",
        "Basic analytics",
        "Email support",
        "Standard widget customization",
      ],
      limitations: ["Limited document uploads (50MB)", "No CRM integrations"],
    },
    {
      id: "professional",
      name: "Professional",
      price: "₹49,000",
      description: "Ideal for growing real estate agencies",
      features: [
        "3 AI Voice Agents",
        "2,000 conversations/month",
        "Advanced analytics",
        "Priority email support",
        "Full widget customization",
        "CRM integrations",
        "Unlimited document uploads",
      ],
      limitations: ["No white-labeling"],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "For large real estate developers and agencies",
      features: [
        "Unlimited AI Voice Agents",
        "Unlimited conversations",
        "Custom analytics dashboard",
        "Dedicated account manager",
        "White-labeling",
        "Custom integrations",
        "API access",
        "SLA guarantees",
      ],
      limitations: [],
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative overflow-hidden ${
            plan.popular ? "border-primary shadow-md" : "border-border shadow-soft"
          }`}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0">
              <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none px-3 py-1">Popular</Badge>
            </div>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-2">
              <span className="text-2xl font-bold">{plan.price}</span>
              {plan.id !== "enterprise" && <span className="text-muted-foreground"> / year</span>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
              {plan.limitations.map((limitation, index) => (
                <div key={index} className="flex items-center text-muted-foreground">
                  <X className="mr-2 h-4 w-4" />
                  <span className="text-sm">{limitation}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={currentPlan === plan.id ? "outline" : "default"}
              onClick={() => onSelectPlan(plan.id)}
            >
              {currentPlan === plan.id ? "Current Plan" : plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
