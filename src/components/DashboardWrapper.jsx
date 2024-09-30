"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  CircleUser,
  Heart,
  Hospital,
  Menu,
  Search,
  Home,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import icon from "@/app/icon/pulse-ai.svg";

const createNavItem = (label, href, icon, roles) => ({
  label,
  href,
  icon,
  visible: roles,
});

const dashboardLinks = [
  createNavItem("Patients", "/doctor/patients", Calendar, ["patient"]),
  createNavItem("Patients", "/admin/patients", Users, ["admin", "doctor"]),
  createNavItem("Users", "/admin/user", Home, ["admin"]),
  createNavItem("Doctors", "/admin/doctors", Users, ["admin"]),
];

const getVisibleLinks = (userRole) => {
  return dashboardLinks.filter((link) => link.visible.includes(userRole));
};

export default function DashboardWrapper({ children }) {
  const [userRole, setUserRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUserRole(session.user.role.toLowerCase());
      setUsername(session.user.name);
      setHospitalName(session.user.hospitalName);
    }
  }, [session]);

  const navItems = getVisibleLinks(userRole);

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
    <div className="flex h-screen bg-background">
      <nav className="hidden w-64 flex-shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={icon} width={100} height={40} alt="Pulse AI Logo" />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex h-full flex-col">
                  <div className="flex h-16 items-center border-b border-border px-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-semibold"
                    >
                      <Image
                        src={icon}
                        width={100}
                        height={40}
                        alt="Pulse AI Logo"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-1 px-3">
                      {navItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <item.icon
                            className="mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold">
              Welcome, <span className="text-primary">{username}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <Hospital size={20} aria-hidden="true" />
              <span className="text-lg font-semibold">
                <span className="text-primary">
                  {hospitalName.split(" ")[0]}
                </span>{" "}
                <span className="text-destructive">
                  {hospitalName.split(" ")[1]}
                </span>
              </span>
            </div>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <CircleUser className="h-6 w-6" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout} disabled={loading}>
                  {loading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}