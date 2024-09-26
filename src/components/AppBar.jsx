import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";


export default function AppBar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-slate-200">
      <Link className="flex items-center justify-center" href="#">
        <Heart className="h-6 w-6 text-violet-600" />
        <span className="ml-2 text-xl font-semibold text-slate-900">
          Pulse AI
        </span>
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
