"use client";

import { Suspense } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthGuard>
        <div className="flex min-h-screen flex-col">
          {/* Dashboard layout here - can include sidebar, header etc. */}
          <main className="flex-1">{children}</main>
        </div>
      </AuthGuard>
    </Suspense>
  );
} 