"use client";

import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoutButton } from "@/components/auth/logout-button";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const userEmail = user?.email || '';
  const userName = (user?.user_metadata?.full_name as string) || userEmail.split('@')[0];
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Dashboard header */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <h1 className="text-xl font-semibold">Westeros Real Estate Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden md:inline-block">
            Welcome, {userName}
          </span>
          <LogoutButton variant="outline" size="sm" />
        </div>
      </header>
      
      {/* Dashboard main content */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
        {/* Overview section */}
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Stats cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Create your first AI agent
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  No active conversations yet
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Deploy your widget to start generating leads
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Upload documents to train your AI
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tab interface for dashboard sections */}
        <Tabs defaultValue="agents" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Agents tab */}
          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your AI Agents</CardTitle>
                <CardDescription>
                  Create and manage your AI agents that will represent your properties.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-medium">No agents created yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      AI agents can help you engage with visitors 24/7 and answer questions about your properties.
                    </p>
                    <Button 
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Coming soon!",
                          description: "Agent creation will be available soon.",
                        });
                      }}
                    >
                      Create Your First Agent
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documents tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>
                  Upload documents to train your AI agents with specific property information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-medium">No documents uploaded yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Upload property information, brochures, and details to help your AI agents provide accurate information.
                    </p>
                    <Button 
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Coming soon!",
                          description: "Document upload will be available soon.",
                        });
                      }}
                    >
                      Upload Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs would be implemented similarly */}
          <TabsContent value="conversations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>
                  View and manage conversations between your AI agents and potential clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-medium">No conversations yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Deploy your AI agents to start engaging with potential clients.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
                <CardDescription>
                  Manage and follow up with leads captured by your AI agents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-medium">No leads captured yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Once your AI agents start engaging with visitors, leads will appear here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <span className="w-32 text-sm font-medium text-muted-foreground">Name:</span>
                        <span>{userName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-32 text-sm font-medium text-muted-foreground">Email:</span>
                        <span>{userEmail}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium">Actions</h3>
                    <div className="mt-2 space-x-2">
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "Coming soon!",
                          description: "Profile editing will be available soon.",
                        });
                      }}>
                        Edit Profile
                      </Button>
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 