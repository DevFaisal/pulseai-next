"use client";
import React from "react";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Pulse AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </a>
            <a href="#solutions" className="text-gray-600 hover:text-blue-600">
              Solutions
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600"
            >
              Testimonials
            </a>
            <Button variant="outline" className="mr-2">
              <Link href="/login">Log In</Link>
            </Button>
            <Button>Get Started</Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600"
            >
              Solutions
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600"
            >
              Testimonials
            </a>
            <div className="flex flex-col gap-2 p-3">
              <Button variant="outline" className="w-full">
                <Link href="/login">Log In</Link>
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
