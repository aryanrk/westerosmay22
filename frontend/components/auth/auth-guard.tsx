"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedPaths?: string[];
}

export function AuthGuard({ children, allowedPaths = ["/login", "/signup", "/"] }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Skip if still loading
    if (isLoading) return;
    
    // If user is not authenticated and not on allowed path, redirect to login
    if (!user && !allowedPaths.includes(pathname)) {
      router.push("/login");
      return;
    }
    
    // If user is authenticated and on login/signup page, redirect to dashboard
    if (user && (pathname === "/login" || pathname === "/signup")) {
      router.push("/dashboard");
      return;
    }
  }, [user, isLoading, pathname, router, allowedPaths]);
  
  // Show nothing while loading
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If not authenticated and not on allowed path, show nothing (will redirect)
  if (!user && !allowedPaths.includes(pathname)) {
    return null;
  }
  
  // Otherwise show children
  return <>{children}</>;
} 