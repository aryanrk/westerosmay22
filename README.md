# Real Estate SaaS Platform with AI Conversational Agent

## Overview
A SaaS platform for real estate developers/builders to deploy a customizable AI conversational agent (powered by ElevenLabs) on their websites. The agent answers user queries, qualifies leads, collects lead information, and supports advanced analytics, CRM, and integrations.

This platform combines:

1. Next.js frontend with a modern UI using Tailwind CSS and Shadcn UI
2. Supabase for authentication, database, storage, and edge functions
3. ElevenLabs API integration for voice generation and conversational AI
4. Embeddable widget for easy deployment on customer websites

## Features

### For Real Estate Developers (Platform Users)

- **AI Agent Management**: Create and customize AI agents with specific knowledge and personality
- **Widget Customization**: Configure the appearance and behavior of the chat widget
- **Project Management**: Organize properties and agents by project
- **Document Management**: Upload property documents for agent knowledge base
- **Lead Management**: View and manage leads generated through conversations
- **CRM Integration**: Basic CRM functionality with lead status tracking
- **Analytics**: Track conversation metrics and lead quality

### For End Users (Website Visitors)

- **Conversational Interface**: Chat with AI agent about properties
- **Voice Interaction**: Optional voice-based conversation
- **Property Information**: Get detailed information about available properties
- **Appointment Scheduling**: Book viewings directly through the chat
- **Contact Information**: Leave contact details to be contacted by human agents

## Architecture

The project is structured as follows:

```
/
├── frontend/                # Next.js frontend application
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and API client
│   └── ...                  # Other frontend resources
├── backend/                 # Backend resources
│   ├── supabase/            # Supabase configuration
│   │   ├── functions/       # Edge Functions
│   │   └── db-migrations/   # Database migration scripts
│   └── lib/                 # Shared backend libraries
└── public/                  # Static assets
```

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **AI/Voice**: ElevenLabs API
- **Deployment**: Vercel (frontend), Supabase (backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- ElevenLabs API key

### Frontend Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/real-estate-ai-saas.git
cd real-estate-ai-saas
```

2. Install dependencies:

```bash
cd frontend
npm install
```

3. Create a `.env.local` file in the frontend directory with your configuration:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

### Backend Setup

1. Set up your Supabase project:
   - Create a new project in Supabase
   - Set up the database tables using the migration scripts in `backend/supabase/db-migrations/`
   - Enable the authentication services
   - Create storage buckets for documents and recordings

2. Deploy Edge Functions:
   - Deploy the Edge Functions using the Supabase CLI or use the already configured functions in the Supabase project
   - Set environment variables for Edge Functions in Supabase dashboard

3. Configure environment variables for Edge Functions:
   
```
ELEVENLABS_API_KEY=your-elevenlabs-api-key
WIDGET_JS_URL=your-widget-js-url
```

## Widget Integration

To integrate the AI chat widget on a website:

1. From the dashboard, create a new widget and customize it
2. Copy the generated embed code
3. Paste the code into the HTML of your website before the closing `</body>` tag

Example embed code:

```html
<div id="realvoice-widget" 
  data-widget-id="widget-id"
  data-agent-id="agent-id"
  data-agent-name="AI Assistant"
  data-theme-primary="#4f46e5"
  data-theme-text="#ffffff"
  data-theme-bg="#ffffff"
  data-position="bottom-right"
  data-initial-message="Hello! How can I help you today?"
></div>
<script src="https://your-domain.com/widget.js"></script>
```

## Development

### Database Schema

The database includes the following key tables:

- `profiles`: User profiles linked to Supabase Auth
- `organizations`: Multi-tenant organizations for team management
- `projects`: Real estate projects/properties
- `agents`: AI agent configurations
- `documents`: Property documents and resources
- `document_chunks`: Vectorized chunks of documents for AI context
- `conversations`: Conversation history with visitors
- `leads`: Lead information collected from conversations
- `widgets`: Widget configurations for embedding

### Edge Functions

- `converse`: Handles conversation API between frontend and ElevenLabs
- `document`: Manages document uploading and processing
- `widget`: Generates widget embed code and handles widget data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Shadcn UI for the component library
- ElevenLabs for the AI voice technology
- Supabase for the backend infrastructure

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