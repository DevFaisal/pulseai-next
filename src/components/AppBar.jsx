"use client";
import React from "react";
import Link from "next/link";
import { Heart, HeartPulse, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function AppBar() {
  const session = useSession();

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <Link className="flex items-center justify-center" href="#">
        <HeartPulse className="h-6 w-6 text-primary animate-pulse" />
        <span className="ml-2 text-2xl font-bold">Pulse AI</span>
      </Link>
      {session?.status === "authenticated" ? (
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <LogOut
            className="h-5 w-5 cursor-pointer"
            onClick={() => signOut()}
          ></LogOut>
        </nav>
      ) : (
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
            href="#about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      )}
      <nav className="px-5">
        <ModeToggle />
      </nav>
    </header>
  );
}
