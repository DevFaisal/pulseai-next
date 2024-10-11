"use client";
import React from "react";
import Link from "next/link";
import { HeartPulse, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";

export default function AppBar() {
  const { data: session, status } = useSession();

  const links = [
    { title: "Features", href: "#features" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <main className=" top-0 left-0 right-0 z-50 bg-opacity-90 flex items-center justify-between h-16 w-full px-4 lg:px-6  backdrop-blur-sm">
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
      <nav className="px-5">
        <ModeToggle />
      </nav>

      {/* Conditional rendering for authenticated users */}
      {status === "authenticated" ? (
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {/* Logged-in user options */}
          <button
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </nav>
      ) : (
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      )}
    </main>
  );
}
