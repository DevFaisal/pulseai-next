"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AirVent, Bell, CircleUser, Heart, Menu, Search } from "lucide-react";
import { Home, Calendar, Users } from "lucide-react"; // Import your icons

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";

// Create link function
const createLink = (label, href, icon, roles) => ({
  label,
  href,
  icon,
  visible: roles,
});

// Define dashboard links with appropriate roles
export const dashboardLinks = [
  createLink("Dashboard", "/", Home, ["admin", "doctor", "user"]),
  createLink("Appointments", "/appointments", Calendar, ["doctor"]),
  createLink("Patients", "/admin/patients", Users, ["admin", "doctor"]),
  createLink("Doctors", "/admin/doctors", Users, ["admin"]),
];

// Function to get visible links based on user role
export const getVisibleLinks = (userRole) => {
  return dashboardLinks.filter((link) => link.visible.includes(userRole));
};

// Dashboard Wrapper Component
export default function DashboardWrapper({ children }) {
  const [userRole, setUserRole] = useState("admin");

  const session = useSession();

  useEffect(() => {
    if (session) {
      setUserRole(session.data?.user.role.toLowerCase());
    }
  }, [session]);

  const navItems = getVisibleLinks(userRole);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Heart className="h-6 w-6 text-violet-600" />
              <span>Pulse AI</span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8"
              aria-label="Toggle notifications"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                aria-label={`Navigate to ${item.label}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex justify-between w-full">
            <div>
              <ModeToggle />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  aria-label="User menu"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  {loading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className=" flex flex-1 flex-col gap-4 p-0 lg:p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
