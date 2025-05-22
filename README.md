# Real Estate SaaS Platform with AI Conversational Agent

## Overview
A SaaS platform for real estate developers/builders to deploy a customizable AI conversational agent (powered by ElevenLabs) on their websites. The agent answers user queries, qualifies leads, collects lead information, and supports advanced analytics, CRM, and integrations.

---

## Product Vision
- **Target Users:** Real estate developers/builders
- **Core Offering:** Deployable AI agent widget for websites
- **Key Features:**
  - Conversational AI (voice/text)
  - Lead qualification and capture
  - Project and agent management
  - Analytics and reporting
  - CRM and WhatsApp integration (Pro+)
  - Multi-organization, multi-user roles
  - Per-agent billing plans

---

## Architecture
- **Frontend:** Next.js (React, TypeScript)
- **Backend:** Supabase (Postgres, Auth, Storage, Edge Functions)
- **AI Integration:** ElevenLabs Conversational API
- **Widget:** Embeddable JS widget (iframe or floating component)

---

## Core Features & Data Model
### Authentication & User Management
- Supabase Auth for email/password login
- Organizations (multi-tenancy)
- User roles: Admin, Manager, Agent/User

### Agent & Project Management
- Projects: Real estate developments/properties
- Agents: AI conversational agents linked to projects
- **Agent Customization:**
  - Modular, block-based flow editor ("Conversational Modules")
  - Each module: type, script, response type, branching, data capture
  - Users drag, drop, reorder, and customize modules to define agent flow

#### Example Modules
- Greeting
- Intent Detection
- Ask Budget
- Ask Location Preference
- Answer FAQ
- Collect Contact Info
- End Conversation

#### Example Module JSON
```json
[
  { "id": "greeting", "type": "message", "script": "Hi! I'm the virtual assistant for [Project Name]. How can I help you today?" },
  { "id": "intent", "type": "action", "script": "Are you looking for property details, want to schedule a visit, or have another question?", "responseType": "choice", "choices": ["Property Details", "Schedule Visit", "Other"], "branches": { "Property Details": "ask_budget", "Schedule Visit": "collect_contact", "Other": "answer_faq" } },
  { "id": "ask_budget", "type": "question", "script": "What is your budget range for a new home?", "responseType": "number" },
  { "id": "collect_contact", "type": "question", "script": "May I have your name and phone number so our team can follow up?", "responseType": "contact" },
  { "id": "end", "type": "message", "script": "Thank you for your time! We'll be in touch soon." }
]
```

### Lead & Conversation Management
- Store all captured lead info (name, contact, requirements, qualification status)
- Store conversation transcripts, metadata, and analytics

### Analytics
- Track all analytics visible in the frontend (conversations, leads, agent performance, etc.)

### Billing
- Per-agent billing plans:
  - **Basic:** ₹35,000/month (1 agent, 1 project, no CRM)
  - **Pro:** ₹60,000/month (multi-project, CRM, WhatsApp follow-up)
  - **Premium:** ₹1L+/month (custom voice model, analytics, integrations)
- Store plan/subscription per organization
- Enforce plan limits in backend logic

---

## ElevenLabs API Integration
- Backend orchestrates conversation flow using ElevenLabs API
- Dynamically assembles prompts/scripts per module
- Handles branching, data capture, and context
- Never exposes ElevenLabs API keys to the client/widget

---

## Widget Embedding
- Provide a JS snippet for clients to embed on their site
- Widget loads a React app (or vanilla JS) in an iframe or as a floating component
- Widget authenticates with backend (public API key or JWT)
- Widget communicates with backend for conversation orchestration and lead capture

---

## Permissions & Roles
- **Admin:** Full access (manage org, users, agents, billing)
- **Manager:** Manage projects, agents, leads
- **Agent/User:** View leads, limited actions
- Enforced via Supabase RLS and API endpoints

---

## Deployment & Testing Workflow
- **Recommended:**
  - Push code to GitHub
  - Connect repo to Vercel for instant preview and production deployments
  - Each push/PR gets a unique preview URL
  - Use Supabase Studio for backend management
- **Local Development:**
  - Run `pnpm dev` or `npm run dev` for local testing
  - Use ngrok or Cloudflare Tunnel for public preview if needed

---

## Development Guidelines
- **Frontend:**
  - Do not make major changes without approval
  - Only update agent scripting/flow editor UI as needed
- **Backend:**
  - Use Supabase for all data/auth/storage
  - Use Edge Functions for custom logic and ElevenLabs API proxying
  - Ensure scalability and security (RLS, API key management)

---

## References
- ElevenLabs Conversational API docs
- Supabase docs
- Vercel/Netlify deployment guides

---

## Contact & Onboarding
- For questions or onboarding, refer to this README and reach out to the project maintainer. 