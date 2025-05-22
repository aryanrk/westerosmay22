"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function LogoutButton({ 
  variant = "default", 
  size = "default", 
  className = "" 
}: LogoutButtonProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
} 