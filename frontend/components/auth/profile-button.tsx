"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout-button";
import { useAuth } from "@/lib/auth";

export function ProfileButton() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    );
  }
  
  return <ProfileDropdown user={user} />;
}

function ProfileDropdown({ user }: { user: User }) {
  // Get user initials or use fallback
  const getUserInitials = () => {
    const fullName = user.user_metadata?.full_name as string || '';
    if (fullName) {
      return fullName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase();
    }
    return user.email?.[0].toUpperCase() || 'U';
  };

  const userEmail = user.email || '';
  const userName = (user.user_metadata?.full_name as string) || userEmail.split('@')[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={userName} />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton variant="ghost" className="w-full p-0 h-auto font-normal" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 