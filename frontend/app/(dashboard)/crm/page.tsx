"use client"

import { LeadsTable } from "@/components/crm/leads-table"

// Sample data with conversation messages, audio URLs, and CRM data
const sampleLeads = [
  {
    id: "1",
    name: "Michael Johnson",
    phoneNumber: "+1 (555) 123-4567",
    project: "Luxury Towers",
    timestamp: "May 12, 2023 • 10:23 AM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    status: "qualified",
    source: "website",
    budget: "$1.5M - $2M",
    score: 85,
    lastContact: "May 15, 2023",
    nextFollowUp: "May 25, 2023",
    tags: ["High Budget", "3BR Interest", "Ready to Buy"],
    assignedTo: "John Doe",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Hi, I'm interested in the Luxury Towers project. Can you tell me more about the available units?",
        timestamp: "10:23 AM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Hello Michael! I'd be happy to tell you about our Luxury Towers units. We currently have 2 and 3 bedroom units available starting from $1.2M. Would you like to know about specific floor plans?",
        timestamp: "10:24 AM",
      },
      {
        id: "m3",
        sender: "user",
        text: "Yes, I'm particularly interested in the 3 bedroom units. What's the square footage and are there any corner units available?",
        timestamp: "10:26 AM",
      },
      {
        id: "m4",
        sender: "ai",
        text: "Our 3 bedroom units range from 1,800 to 2,200 square feet. We do have two corner units available on the 15th and 22nd floors, which offer panoramic city views and larger balconies. Would you like to schedule a virtual tour of these units?",
        timestamp: "10:27 AM",
      },
      {
        id: "m5",
        sender: "user",
        text: "That sounds great. I'd like to schedule a virtual tour for the unit on the 22nd floor.",
        timestamp: "10:29 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Williams",
    phoneNumber: "+1 (555) 987-6543",
    project: "Garden Villas",
    timestamp: "May 14, 2023 • 3:45 PM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    status: "contacted",
    source: "whatsapp",
    budget: "$800K - $1.2M",
    score: 65,
    lastContact: "May 14, 2023",
    nextFollowUp: "May 22, 2023",
    tags: ["First-time Buyer", "Financing Needed"],
    assignedTo: "Sarah Johnson",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Hello, I saw your ad for Garden Villas and I'm interested in learning more about the community amenities.",
        timestamp: "3:45 PM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Hi Sarah! Garden Villas offers extensive amenities including a resort-style pool, fitness center, community garden, and walking trails. Is there a specific amenity you're most interested in?",
        timestamp: "3:46 PM",
      },
      {
        id: "m3",
        sender: "user",
        text: "I'm particularly interested in the community garden. How does that work?",
        timestamp: "3:48 PM",
      },
    ],
  },
  {
    id: "3",
    name: "David Brown",
    phoneNumber: "+1 (555) 456-7890",
    project: "Downtown Lofts",
    timestamp: "May 15, 2023 • 9:12 AM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    status: "proposal",
    source: "referral",
    budget: "$600K - $900K",
    score: 78,
    lastContact: "May 18, 2023",
    nextFollowUp: "May 24, 2023",
    tags: ["Investor", "Multiple Units"],
    assignedTo: "John Doe",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "I'm looking for information about the Downtown Lofts project. Are there any units with industrial features?",
        timestamp: "9:12 AM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Good morning David! Yes, our Downtown Lofts project features several units with industrial elements like exposed brick walls, concrete floors, and high ceilings. We have both one and two-bedroom options available. Would you like more details on specific units?",
        timestamp: "9:13 AM",
      },
    ],
  },
  {
    id: "4",
    name: "Jennifer Davis",
    phoneNumber: "+1 (555) 789-0123",
    project: "Seaside Residences",
    timestamp: "May 16, 2023 • 2:30 PM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    status: "closed-won",
    source: "website",
    budget: "$2M+",
    score: 95,
    lastContact: "May 20, 2023",
    tags: ["Premium Buyer", "Penthouse", "Cash Buyer"],
    assignedTo: "Sarah Johnson",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Hi there, I'm interested in the Seaside Residences. Do all units have ocean views?",
        timestamp: "2:30 PM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Hello Jennifer! Not all units at Seaside Residences have direct ocean views, but approximately 70% do. The remaining units have partial ocean views or garden views. Units on floors 4 and above in the east and south wings have the best ocean views. Would you like information about availability and pricing?",
        timestamp: "2:31 PM",
      },
    ],
  },
  {
    id: "5",
    name: "Robert Wilson",
    phoneNumber: "+1 (555) 234-5678",
    project: "Luxury Towers",
    timestamp: "May 17, 2023 • 11:05 AM",
    status: "new",
    source: "social",
    score: 45,
    tags: ["Needs Follow-up"],
    assignedTo: "John Doe",
  },
  {
    id: "6",
    name: "Emily Taylor",
    phoneNumber: "+1 (555) 345-6789",
    project: "Garden Villas",
    timestamp: "May 18, 2023 • 4:20 PM",
    status: "contacted",
    source: "whatsapp",
    budget: "$700K - $900K",
    score: 55,
    lastContact: "May 18, 2023",
    nextFollowUp: "May 26, 2023",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "7",
    name: "James Anderson",
    phoneNumber: "+1 (555) 567-8901",
    project: "Downtown Lofts",
    timestamp: "May 19, 2023 • 10:45 AM",
    status: "closed-lost",
    source: "website",
    budget: "$500K - $700K",
    score: 30,
    lastContact: "May 21, 2023",
    tags: ["Budget Mismatch", "Chose Competitor"],
    assignedTo: "John Doe",
  },
  {
    id: "8",
    name: "Lisa Martinez",
    phoneNumber: "+1 (555) 678-9012",
    project: "Seaside Residences",
    timestamp: "May 20, 2023 • 1:15 PM",
    status: "qualified",
    source: "referral",
    budget: "$1.2M - $1.8M",
    score: 75,
    lastContact: "May 21, 2023",
    nextFollowUp: "May 27, 2023",
    tags: ["Ocean View", "Relocating"],
    assignedTo: "Sarah Johnson",
  },
]

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer CRM</h1>
        <p className="text-muted-foreground">Track, manage, and nurture leads generated by your AI voice assistants.</p>
      </div>

      <LeadsTable leads={sampleLeads} />
    </div>
  )
}
