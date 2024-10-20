"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeartPulse, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "@/components/other/ModeToggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HelpCircle, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  const links = [
    { title: "Features", href: "#features" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Brand logo and name */}
        <Link className="flex items-center space-x-2" href="/">
          <HeartPulse
            className="h-6 w-6 text-primary animate-pulse"
            aria-hidden="true"
          />
          <span className="text-lg md:text-2xl font-bold text-primary">
            Pulse AI
          </span>
        </Link>

        {/* Dark/Light mode toggle */}
        <div className="flex-1 flex justify-end p-7">
          <ModeToggle />
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-4 sm:gap-6">
          {isLoading ? (
            // Skeleton loader for nav items
            <>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </>
          ) : status === "authenticated" ? (
            // Logged-in user options
            // <Button
            //   variant="ghost"
            //   className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
            //   onClick={() => signOut()}
            // >
            //   <LogOut className="h-5 w-5" aria-hidden="true" />
            //   <span>Logout</span>
            // </Button>
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback>
                        {session?.user?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => router.push("/user/setting")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Unauthenticated user links
            links.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))
          )}
        </nav>
      </div>
    </header>
  );
}
