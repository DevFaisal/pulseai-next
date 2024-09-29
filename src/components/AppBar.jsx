import React from "react";
import Link from "next/link";
import { Heart, HeartPulse } from "lucide-react";

export default function AppBar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-slate-200">
      <Link className="flex items-center justify-center" href="#">
        <HeartPulse className="h-6 w-6 text-primary animate-pulse" />
        <span className="ml-2 text-2xl font-bold">Pulse AI</span>
      </Link>
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
    </header>
  );
}
